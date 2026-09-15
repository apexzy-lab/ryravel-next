import { waitUntil } from "cloudflare:workers";
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
  name,
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
  journey,
  contactPreference,
  preferredCallTime,
}) {
  const token = String(runtimeEnv().GTMCR_SIGNAL_TOKEN || "").trim();
  if (!token) return;
  const endpoint = String(runtimeEnv().GTMCR_SIGNALS_API_URL || "https://gtmcr.pro/api/v1/events").trim();

  const response = await fetch(endpoint, {
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
        name,
        reference: enquiryReference,
        feeling,
        travelMonth,
        travelYear,
        duration,
        people,
        budget,
        source_page: sourceUrl,
        journey_slug: journey?.slug || null,
        journey_name: journey?.name || null,
        journey_destination: journey?.destination || null,
        journey_nights: journey?.nights || null,
        journey_price: journey?.price || null,
        contact_preference: contactPreference,
        preferred_call_time: preferredCallTime || null,
      },
    }),
  });

  if (!response.ok) throw new Error(`GTMCR returned ${response.status}`);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

async function sendGuestConfirmation({ name, email, reference: enquiryReference, feeling, travelMonth, travelYear, journey, contactPreference }) {
  const apiKey = String(runtimeEnv().RESEND_API_KEY || "").trim();
  if (!apiKey) return;
  // Send from the Resend-verified subdomain. Replies still go to the public curator inbox.
  const from = String(runtimeEnv().RESEND_FROM_EMAIL || "Ryravel Curator <curator@updates.ryravel.com>").trim();
  const endpoint = String(runtimeEnv().RESEND_API_URL || "https://api.resend.com/emails").trim();
  const journeyLine = journey?.name
    ? `<tr><td style="padding:8px 0;color:#887d70">Journey</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(journey.name)}</td></tr>`
    : "";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(4000),
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: "curator@ryravel.com",
      subject: `Your Ryravel journey request · ${enquiryReference}`,
      html: `<!doctype html><html><body style="margin:0;background:#f2eee7;font-family:Arial,sans-serif;color:#17140f"><div style="display:none">Your private journey conversation has begun.</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2eee7"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff"><tr><td style="background:#0b0a08;padding:30px 38px;color:#fff"><div style="color:#f0443e;font-size:12px;letter-spacing:4px;font-weight:700">RYRAVEL</div><div style="margin-top:38px;font-family:Georgia,serif;font-size:38px;line-height:1.08">The conversation<br>has begun.</div></td></tr><tr><td style="padding:38px"><p style="font-family:Georgia,serif;font-size:24px;margin:0 0 18px">Dear ${escapeHtml(name)},</p><p style="color:#665e54;line-height:1.75;margin:0 0 28px">Your journey request is safely with a Ryravel curator. We will read it personally and respond within one business day${contactPreference === "private-call" ? " to arrange your private conversation" : " with the next best question"}.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e7e0d6;border-bottom:1px solid #e7e0d6;padding:14px 0">${journeyLine}<tr><td style="padding:8px 0;color:#887d70">Feeling</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(feeling)}</td></tr><tr><td style="padding:8px 0;color:#887d70">Travel window</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(`${travelMonth} ${travelYear}`)}</td></tr><tr><td style="padding:8px 0;color:#887d70">Reference</td><td style="padding:8px 0;text-align:right;color:#f0443e;font-weight:700">${escapeHtml(enquiryReference)}</td></tr></table><p style="color:#665e54;line-height:1.75;margin:28px 0">What happens next: personal review, one private conversation, then a considered journey direction. Nothing is booked until you are ready.</p><a href="https://ryravel.com/case-studies" style="display:inline-block;background:#f0443e;color:#fff;text-decoration:none;padding:15px 22px;font-size:12px;font-weight:700;letter-spacing:1px">READ TRAVELLER STORIES →</a><p style="color:#9b9287;font-size:12px;line-height:1.6;margin:34px 0 0">Ryravel · Bespoke travel designed around how you feel<br><a href="mailto:curator@ryravel.com" style="color:#f0443e">curator@ryravel.com</a> · +1 760 514 0361</p></td></tr></table></td></tr></table></body></html>`,
    }),
  });
  if (!response.ok) throw new Error(`Confirmation email returned ${response.status}`);
}

function queueGtmcrSignal(signal) {
  // GTMCR powers CRM and marketing automation; it is separate from site analytics.
  waitUntil(sendGtmcrSignal(signal).catch((error) => {
    console.error("GTMCR enquiry signal failed", error instanceof Error ? error.message : "Unknown error");
  }));
}

function queueGuestConfirmation(message) {
  // A receipt for the traveller; delivery failure must never block their enquiry.
  waitUntil(sendGuestConfirmation(message).catch((error) => {
    console.error("Ryravel confirmation email failed", error instanceof Error ? error.message : "Unknown error");
  }));
}

export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch { return jsonError("The enquiry could not be read."); }
  if (clean(payload.website, 100)) return Response.json({ received: true }, { status: 201 });

  const challenge = await verifyTurnstile(request, payload.turnstileToken);
  if (!challenge.success) return jsonError(challenge.error, 422);

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const feeling = clean(payload.feeling, 40);
  const travelMonth = clean(payload.month, 20);
  const travelYear = clean(payload.year, 4);
  const duration = clean(payload.duration, 40);
  const people = clean(payload.people, 40);
  const budget = clean(payload.budget, 40);
  const countryCode = clean(payload.countryCode, 8);
  const phone = clean(payload.phone, 40);
  const sourceUrl = clean(payload.sourceUrl, 500);
  const rawJourney = payload.journey && typeof payload.journey === "object" ? payload.journey : {};
  const journey = {
    slug: clean(rawJourney.slug, 80),
    name: clean(rawJourney.name, 160),
    destination: clean(rawJourney.destination, 200),
    nights: clean(rawJourney.nights, 20),
    price: clean(rawJourney.price, 40),
  };
  const contactPreference = payload.contactPreference === "private-call" ? "private-call" : "written-enquiry";
  const preferredCallTime = contactPreference === "private-call" ? clean(payload.preferredCallTime, 100) : "";

  if (!name || !email || !phone || !duration || !people || !budget || !travelYear) return jsonError("Complete every required field.", 422);
  if (!/^\S+@\S+\.\S+$/.test(email)) return jsonError("Enter a valid email address.", 422);
  if (!feelings.has(feeling)) return jsonError("Choose how you want to feel.", 422);
  if (!months.has(travelMonth)) return jsonError("Choose a travel month.", 422);
  if (!/^20\d{2}$/.test(travelYear)) return jsonError("Choose a valid travel year.", 422);
  if (contactPreference === "private-call" && !preferredCallTime) return jsonError("Choose the best time for your curator to contact you.", 422);

  const db = getD1();
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ipHash = await hash(`${runtimeEnv().RATE_LIMIT_SALT || "ryravel"}:${ip}`);
  const recent = await db.prepare("SELECT COUNT(*) AS total FROM journey_enquiries WHERE ip_hash = ? AND created_at >= datetime('now', '-1 hour')").bind(ipHash).first();
  if (Number(recent?.total || 0) >= 5) return jsonError("Too many enquiries were sent from this connection. Please try again in one hour.", 429);

  const id = crypto.randomUUID();
  const enquiryReference = reference();
  const now = new Date().toISOString();
  const visitorMessage = clean(payload.message, 3600);
  const planningContext = [
    journey.name ? `Selected journey: ${journey.name}${journey.nights ? ` · ${journey.nights} nights` : ""}${journey.destination ? ` · ${journey.destination}` : ""}${journey.price ? ` · from ${journey.price}` : ""}.` : "",
    contactPreference === "private-call" ? `Private curator call requested${preferredCallTime ? `: ${preferredCallTime}` : ""}.` : "",
  ].filter(Boolean).join(" ");
  const savedMessage = [planningContext, visitorMessage].filter(Boolean).join(" ");
  const tags = [journey.slug ? `journey:${journey.slug}` : "", contactPreference === "private-call" ? "private-call" : ""].filter(Boolean);
  await db.prepare(`INSERT INTO journey_enquiries (
    id, reference, created_at, name, email, phone, country_code, feeling,
    travel_month, travel_year, duration, people, budget, message, referral,
    newsletter, source_url, user_agent, ip_hash, tags
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, enquiryReference, now, name, email, phone, countryCode, feeling, travelMonth, travelYear, duration, people, budget, savedMessage || null, clean(payload.referral, 80) || null, payload.newsletter === true ? 1 : 0, sourceUrl || null, clean(request.headers.get("user-agent"), 500) || null, ipHash, JSON.stringify(tags))
    .run();

  queueGtmcrSignal({
    id,
    name,
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
    journey,
    contactPreference,
    preferredCallTime,
  });

  queueGuestConfirmation({ name, email, reference: enquiryReference, feeling, travelMonth, travelYear, journey, contactPreference });

  return Response.json({ received: true, reference: enquiryReference }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
