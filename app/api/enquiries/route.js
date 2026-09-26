import { waitUntil } from "cloudflare:workers";
import { getD1, runtimeEnv } from "../../../db/index";
import { clean, jsonError } from "../../lib/enquiries";
import { verifyTurnstile } from "../../lib/turnstile";
import { processDeliveries, deliveryStatement } from "../../lib/deliveries";

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

// Delivery jobs are committed with the enquiry before any network attempt.
function queueGtmcrSignal() { waitUntil(processDeliveries().catch(() => console.error("Delivery processing failed"))); }
function queueGuestConfirmation() { /* Already included in the durable outbox. */ }

export async function POST(request) {
  let payload;
  try { const body = await request.text(); if (body.length > 16000) return jsonError("The enquiry is too large.", 413); payload = JSON.parse(body); } catch { return jsonError("The enquiry could not be read."); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return jsonError("Invalid enquiry.", 400);
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
  const recent = await db.prepare("SELECT COUNT(*) AS total FROM journey_enquiries WHERE ip_hash = ? AND julianday(created_at) >= julianday('now', '-1 hour')").bind(ipHash).first();
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
  const insertEnquiry = db.prepare(`INSERT INTO journey_enquiries (
    id, reference, created_at, name, email, phone, country_code, feeling,
    travel_month, travel_year, duration, people, budget, message, referral,
    newsletter, source_url, user_agent, ip_hash, tags
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, enquiryReference, now, name, email, phone, countryCode, feeling, travelMonth, travelYear, duration, people, budget, savedMessage || null, clean(payload.referral, 80) || null, payload.newsletter === true ? 1 : 0, sourceUrl || null, clean(request.headers.get("user-agent"), 500) || null, ipHash, JSON.stringify(tags))
;

  const signal = { id, name, email, occurredAt: now, reference: enquiryReference, feeling, travelMonth, travelYear, duration, people, budget, sourceUrl: sourceUrl || null, journey, contactPreference, preferredCallTime, newsletter: payload.newsletter === true };
  const receipt = { name, email, reference: enquiryReference, feeling, travelMonth, travelYear, journey, contactPreference };
  await db.batch([insertEnquiry, deliveryStatement(db, id, "gtmcr", signal), deliveryStatement(db, id, "confirmation", receipt)]);
  queueGtmcrSignal();
  queueGuestConfirmation();

  return Response.json({ received: true, reference: enquiryReference }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
