import { getD1, runtimeEnv } from "../../../db/index";
import { clean, jsonError } from "../../lib/enquiries";
import { verifyTurnstile } from "../../lib/turnstile";

const feelings = new Set(["Exhausted", "Restless", "Disconnected", "Romantic", "Curious", "Celebratory", "Purposeful", "Open"]);
const months = new Set(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);

async function hash(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function reference() {
  const year = new Date().getUTCFullYear().toString().slice(-2);
  const token = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `RY-${year}${token}`;
}

async function sendGtmcrSignal({
  id,
  email,
  occurredAt,
  reference: enquiryReference,
  feeling,
  travelMonth,
  travelYear,
  duration,
  people,
  budget,
  sourceUrl,
}) {
  const token = String(runtimeEnv().GTMCR_SIGNAL_TOKEN || "").trim();
  if (!token) return;

  const response = await fetch("https://gtmcr.pro/api/v1/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(4000),
    body: JSON.stringify({
      eventId: `ryravel-enquiry-${id}`,
      event: "form_submitted",
      email,
      occurredAt,
      properties: {
        form: "trip-inquiry",
        reference: enquiryReference,
        feeling,
        travelMonth,
        travelYear,
        duration,
        people,
        budget,
        sourceUrl,
      },
    }),
  });

  if (!response.ok) throw new Error(`GTMCR returned ${response.status}`);
}

export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch { return jsonError("The enquiry could not be read."); }
  if (clean(payload.website, 100)) return Response.json({ received: true }, { status: 201 });

  const challenge = await verifyTurnstile(request, payload.turnstileToken);
  if (!challenge.success) return jsonError(challenge.error, 422);

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const emailConfirmation = clean(payload.emailConfirmation, 254).toLowerCase();
  const feeling = clean(payload.feeling, 40);
  const travelMonth = clean(payload.month, 20);
  const travelYear = clean(payload.year, 4);
  const duration = clean(payload.duration, 40);
  const people = clean(payload.people, 40);
  const budget = clean(payload.budget, 40);
  const countryCode = clean(payload.countryCode, 8);
  const phone = clean(payload.phone, 40);
  const sourceUrl = clean(payload.sourceUrl, 500);

  if (!name || !email || !phone || !duration || !people || !budget || !travelYear) return jsonError("Complete every required field.", 422);
  if (!/^\S+@\S+\.\S+$/.test(email) || email !== emailConfirmation) return jsonError("Enter matching email addresses.", 422);
  if (!feelings.has(feeling)) return jsonError("Choose how you want to feel.", 422);
  if (!months.has(travelMonth)) return jsonError("Choose a travel month.", 422);
  if (!/^20\d{2}$/.test(travelYear)) return jsonError("Choose a valid travel year.", 422);

  const db = getD1();
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ipHash = await hash(`${runtimeEnv().RATE_LIMIT_SALT || "ryravel"}:${ip}`);
  const recent = await db.prepare("SELECT COUNT(*) AS total FROM journey_enquiries WHERE ip_hash = ? AND created_at >= datetime('now', '-1 hour')").bind(ipHash).first();
  if (Number(recent?.total || 0) >= 5) return jsonError("Too many enquiries were sent from this connection. Please try again in one hour.", 429);

  const id = crypto.randomUUID();
  const enquiryReference = reference();
  const now = new Date().toISOString();
  await db.prepare(`INSERT INTO journey_enquiries (
    id, reference, created_at, name, email, phone, country_code, feeling,
    travel_month, travel_year, duration, people, budget, message, referral,
    newsletter, source_url, user_agent, ip_hash
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, enquiryReference, now, name, email, phone, countryCode, feeling, travelMonth, travelYear, duration, people, budget, clean(payload.message, 4000) || null, clean(payload.referral, 80) || null, payload.newsletter === true ? 1 : 0, sourceUrl || null, clean(request.headers.get("user-agent"), 500) || null, ipHash)
    .run();

  try {
    await sendGtmcrSignal({
      id,
      email,
      occurredAt: now,
      reference: enquiryReference,
      feeling,
      travelMonth,
      travelYear,
      duration,
      people,
      budget,
      sourceUrl: sourceUrl || null,
    });
  } catch (error) {
    console.error("GTMCR enquiry signal failed", error instanceof Error ? error.message : "Unknown error");
  }

  return Response.json({ received: true, reference: enquiryReference }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
