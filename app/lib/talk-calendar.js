import { runtimeEnv } from "../../db/index";
import { candidateSlots, slotOverlapsBusy, BUFFER_MINUTES } from "./talk-slots";
export { candidateSlots, slotOverlapsBusy, validTimeZone } from "./talk-slots";

export function talkConfiguration() {
  const env = runtimeEnv();
  const calendarId = String(env.TALK_GOOGLE_CALENDAR_ID || "").trim();
  const clientId = String(env.TALK_GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = String(env.TALK_GOOGLE_CLIENT_SECRET || "").trim();
  const refreshToken = String(env.TALK_GOOGLE_REFRESH_TOKEN || "").trim();
  const hostTimeZone = String(env.TALK_HOST_TIMEZONE || "Africa/Lagos").trim();
  const senderReady = env.TALK_EMAIL_SENDER_READY === "true" && Boolean(env.RESEND_API_KEY);
  return { calendarId, clientId, clientSecret, refreshToken, hostTimeZone, ready: Boolean(calendarId && clientId && clientSecret && refreshToken && senderReady) };
}


async function accessToken(config) {
  const body = new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, refresh_token: config.refreshToken, grant_type: "refresh_token" });
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(8000) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.access_token) throw new Error("Google Calendar authorization is unavailable");
  return result.access_token;
}

async function googleRequest(config, path, { method = "GET", body } = {}) {
  const token = await accessToken(config);
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(9000),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Google Calendar returned ${response.status}`);
  return result;
}

export async function googleBusy(config, start, end) {
  const result = await googleRequest(config, "/freeBusy", { method: "POST", body: { timeMin: start, timeMax: end, items: [{ id: config.calendarId }] } });
  const calendar = result.calendars?.[config.calendarId];
  if (!calendar || calendar.errors?.length) throw new Error("Google Calendar availability could not be read");
  return calendar.busy || [];
}

export async function availableTalkSlots(db, date, guestTimeZone, now = Date.now()) {
  const config = talkConfiguration();
  if (!config.ready) throw new Error("TALK_NOT_CONFIGURED");
  const candidates = candidateSlots(date, guestTimeZone, config.hostTimeZone, now);
  if (!candidates.length) return [];
  const earliest = new Date(Date.parse(candidates[0].start) - BUFFER_MINUTES * 60000).toISOString();
  const latest = new Date(Date.parse(candidates.at(-1).end) + BUFFER_MINUTES * 60000).toISOString();
  const [busy, reserved] = await Promise.all([
    googleBusy(config, earliest, latest),
    db.prepare("SELECT start_utc, end_utc FROM talk_bookings WHERE status IN ('pending','confirmed') AND start_utc < ? AND end_utc > ?").bind(latest, earliest).all(),
  ]);
  const localBusy = (reserved.results || []).map((row) => ({ start: row.start_utc, end: row.end_utc }));
  return candidates.filter((slot) => !slotOverlapsBusy(slot, busy) && !slotOverlapsBusy(slot, localBusy));
}

export async function createGoogleTalkEvent(config, booking) {
  const eventId = booking.id.replaceAll("-", "");
  const body = {
    id: eventId,
    summary: "Ryravel private curator conversation",
    description: [
      "A 25-minute conversation about your Ryravel journey.",
      `Reference: ${booking.reference}`,
      booking.feeling ? `How you want to feel: ${booking.feeling}` : "",
      booking.journey ? `Journey interest: ${booking.journey}` : "",
      booking.note ? `What you shared: ${booking.note}` : "",
      "For changes, contact support@ryravel.com.",
    ].filter(Boolean).join("\n"),
    start: { dateTime: booking.start, timeZone: config.hostTimeZone },
    end: { dateTime: booking.end, timeZone: config.hostTimeZone },
    // The guest is deliberately not a Google attendee: Google invitations
    // reveal the personal Gmail organizer. Ryravel sends the .ics invite.
    visibility: "private",
    conferenceData: { createRequest: { requestId: booking.id, conferenceSolutionKey: { type: "hangoutsMeet" } } },
    extendedProperties: { private: { ryravelBookingId: booking.id } },
  };
  const path = `/calendars/${encodeURIComponent(config.calendarId)}/events?conferenceDataVersion=1&sendUpdates=none`;
  const event = await googleRequest(config, path, { method: "POST", body });
  if (!event.id) throw new Error("Google Calendar did not confirm the event");
  const meetLink = (value) => value.hangoutLink || value.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri || null;
  let meetUrl = meetLink(event);
  for (let attempt = 0; !meetUrl && attempt < 4; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const refreshed = await googleRequest(config, `/calendars/${encodeURIComponent(config.calendarId)}/events/${encodeURIComponent(event.id)}`);
    meetUrl = meetLink(refreshed);
    if (refreshed.conferenceData?.createRequest?.status?.statusCode === "failure") break;
  }
  if (!meetUrl) throw new Error("Google Meet link was not ready for the guest email");
  return { eventId: event.id, meetUrl };
}
