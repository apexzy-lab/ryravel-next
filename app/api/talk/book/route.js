import { getD1 } from "../../../../db/index";
import { clean, jsonError } from "../../../lib/enquiries";
import { rateLimit } from "../../../lib/rate-limit";
import { verifyTurnstile } from "../../../lib/turnstile";
import { availableTalkSlots, createGoogleTalkEvent, googleBusy, slotOverlapsBusy, talkConfiguration, validTimeZone } from "../../../lib/talk-calendar";
import { deliveryStatement, processDeliveries } from "../../../lib/deliveries";
import { waitUntil } from "cloudflare:workers";

const FEELINGS = new Set(["Exhausted", "Restless", "Disconnected", "Romantic", "Curious", "Celebratory", "Purposeful", "Open"]);

export async function POST(request) {
  const config = talkConfiguration();
  if (!config.ready) return jsonError("Online scheduling is not open yet. Please request a private call instead.", 503);
  let payload;
  try {
    const body = await request.text();
    if (body.length > 6000) return jsonError("The request is too large.", 413);
    payload = JSON.parse(body);
  } catch { return jsonError("The booking could not be read.", 400); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return jsonError("Invalid booking.", 400);
  const challenge = await verifyTurnstile(request, payload.turnstileToken, "talk_booking");
  if (!challenge.success) return jsonError(challenge.error, 422);
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const feeling = clean(payload.feeling, 40);
  const journey = clean(payload.journey, 160);
  const note = clean(payload.note, 600);
  const date = clean(payload.date, 10);
  const timeZone = clean(payload.timeZone, 80);
  const start = clean(payload.start, 32);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !validTimeZone(timeZone) || (feeling && !FEELINGS.has(feeling))) return jsonError("Check your name, email and time zone.", 422);
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(date) || !/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(start)) return jsonError("Choose an available time.", 422);
  const db = getD1();
  try {
    if (!await rateLimit(request, "talk-book", 5, 3600)) return jsonError("Too many booking attempts. Please try again later.", 429);
    const available = await availableTalkSlots(db, date, timeZone);
    const slot = available.find((candidate) => candidate.start === start);
    if (!slot) return jsonError("That time is no longer available. Please choose another.", 409);

    const id = crypto.randomUUID();
    const reference = `RT-${new Date().getUTCFullYear().toString().slice(-2)}${id.replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const now = new Date().toISOString();
    const reserved = await db.prepare("INSERT INTO talk_bookings (id,reference,name,email,feeling,journey,note,start_utc,end_utc,guest_time_zone,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,'pending',?,?) ON CONFLICT DO NOTHING RETURNING id")
      .bind(id, reference, name, email, feeling || null, journey || null, note || null, slot.start, slot.end, timeZone, now, now).first();
    if (!reserved) return jsonError("That time has just been taken. Please choose another.", 409);

    try {
      const busy = await googleBusy(config, new Date(Date.parse(slot.start) - 600000).toISOString(), new Date(Date.parse(slot.end) + 600000).toISOString());
      if (slotOverlapsBusy(slot, busy)) {
        await db.prepare("DELETE FROM talk_bookings WHERE id=? AND status='pending'").bind(id).run();
        return jsonError("That time has just been taken. Please choose another.", 409);
      }
      const event = await createGoogleTalkEvent(config, { id, reference, name, email, feeling, journey, note, start: slot.start, end: slot.end });
      const confirmedAt = new Date().toISOString();
      await db.batch([
        db.prepare("UPDATE talk_bookings SET status='confirmed',google_event_id=?,meet_url=?,updated_at=? WHERE id=? AND status='pending'")
          .bind(event.eventId, event.meetUrl, confirmedAt, id),
        deliveryStatement(db, id, "talk_gtmcr", { id, name, email, reference, feeling, journey, start: slot.start, timeZone, occurredAt: confirmedAt }),
      ]);
      waitUntil(processDeliveries().catch(() => console.error("Talk CRM delivery processing failed")));
      return Response.json({ confirmed: true, reference, start: slot.start, end: slot.end, timeZone, meetUrl: event.meetUrl }, { status: 201, headers: { "Cache-Control": "no-store" } });
    } catch (error) {
      // A network error after sending the create request can be ambiguous. Keep
      // the reservation until an operator reconciles it; never double-book it.
      console.error("Talk booking requires reconciliation", id, error.message);
      return jsonError("We couldn't confirm that appointment. Please contact support@ryravel.com before trying the same time again.", 503);
    }
  } catch (error) {
    console.error("Talk booking failed", error.message);
    return jsonError("The appointment could not be confirmed. Please try again later.", 503);
  }
}
