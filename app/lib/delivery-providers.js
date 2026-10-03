import { runtimeEnv } from "../../db/index";

function contactIdentity(name, email, phone, countryCode) {
  const parts = String(name || "").trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
  const localPhone = String(phone || "").trim();
  const completePhone = localPhone.startsWith("+") ? localPhone : [String(countryCode || "").trim(), localPhone].filter(Boolean).join(" ");
  return {
    email,
    ...(parts.length ? { firstName: parts[0], lastName: parts.slice(1).join(" ") || undefined } : {}),
    ...(completePhone ? { phone: completePhone } : {}),
  };
}

async function postGtmcrEvent(body) {
  const token = String(runtimeEnv().GTMCR_SIGNAL_TOKEN || "").trim();
  if (!token) throw new Error("GTMCR is not configured");
  if (runtimeEnv().GTMCR_TRANSACTIONAL_CONTACTS_READY !== "true") throw new Error("CRM consent-safe receiver update required");
  const endpoint = String(runtimeEnv().GTMCR_SIGNALS_API_URL || "https://gtmcr.pro/api/v1/events").trim();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(4000),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`GTMCR returned ${response.status}`);
}

export async function sendGtmcrSignal({
  id,
  name,
  email,
  phone,
  countryCode,
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
  // An enquiry signal never grants marketing consent, regardless of the form checkbox.
  await postGtmcrEvent({
    eventId: `ryravel-enquiry-${id}`,
    event: "form_submitted",
    contact: contactIdentity(name, email, phone, countryCode),
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
  });
}

export async function sendGtmcrIdentity({ id, name, email }) {
  // A one-time profile repair, not a second enquiry or a marketing decision.
  await postGtmcrEvent({
    eventId: `ryravel-contact-identity-${id}`,
    event: "contact_identified",
    contact: contactIdentity(name, email),
    properties: { source: "ryravel-enquiry-name-backfill" },
  });
}

export async function sendGtmcrConsent({ id, email, reference, capturedAt, notice, policyVersion }) {
  const token = String(runtimeEnv().GTMCR_CONSENT_TOKEN || "").trim();
  if (!token) throw new Error("GTMCR explicit-consent key is not configured");
  const endpoint = String(runtimeEnv().GTMCR_CONSENT_API_URL || "https://gtmcr.pro/api/v1/consents").trim();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(4000),
    body: JSON.stringify({
      eventId: `ryravel-newsletter-${id}`,
      email,
      purpose: "marketing",
      decision: "granted",
      policyVersion,
      evidence: { method: "double_opt_in", notice, reference, capturedAt },
    }),
  });
  if (!response.ok) throw new Error(`GTMCR explicit consent returned ${response.status}`);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

export async function sendGuestConfirmation({ name, email, reference: enquiryReference, feeling, travelMonth, travelYear, journey, contactPreference, newsletterConfirmationUrl }) {
  const apiKey = String(runtimeEnv().RESEND_API_KEY || "").trim();
  if (!apiKey) throw new Error("Confirmation email is not configured");
  // Send from the Resend-verified subdomain. Replies still go to the public curator inbox.
  const from = String(runtimeEnv().RESEND_FROM_EMAIL || "Ryravel Curator <curator@updates.ryravel.com>").trim();
  const endpoint = String(runtimeEnv().RESEND_API_URL || "https://api.resend.com/emails").trim();
  const journeyLine = journey?.name
    ? `<tr><td style="padding:8px 0;color:#887d70">Journey</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(journey.name)}</td></tr>`
    : "";
  const newsletterLine = newsletterConfirmationUrl
    ? `<p style="color:#665e54;line-height:1.75;margin:28px 0 16px">You asked to receive occasional Ryravel journey notes. Confirm that choice using the link below. If you did not request them, ignore it; your journey enquiry is unaffected.</p><a href="${escapeHtml(newsletterConfirmationUrl)}" style="display:inline-block;background:#17140f;color:#fff;text-decoration:none;padding:15px 22px;font-size:12px;font-weight:700;letter-spacing:1px">CONFIRM JOURNEY NOTES →</a><p style="color:#9b9287;font-size:12px;line-height:1.6;margin:12px 0 0">This link expires in seven days. You can unsubscribe at any time.</p>`
    : "";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `ryravel-confirmation-${enquiryReference}` },
    signal: AbortSignal.timeout(4000),
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: "curator@ryravel.com",
      subject: `Your Ryravel journey request · ${enquiryReference}`,
      html: `<!doctype html><html><body style="margin:0;background:#f2eee7;font-family:Arial,sans-serif;color:#17140f"><div style="display:none">Your private journey conversation has begun.</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2eee7"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff"><tr><td style="background:#0b0a08;padding:30px 38px;color:#fff"><div style="color:#f0443e;font-size:12px;letter-spacing:4px;font-weight:700">RYRAVEL</div><div style="margin-top:38px;font-family:Georgia,serif;font-size:38px;line-height:1.08">The conversation<br>has begun.</div></td></tr><tr><td style="padding:38px"><p style="font-family:Georgia,serif;font-size:24px;margin:0 0 18px">Dear ${escapeHtml(name)},</p><p style="color:#665e54;line-height:1.75;margin:0 0 28px">This is an automatic receipt to let you know your request has arrived. Maryangel Ajuzieogu, Ryravel’s founder and journey curator, reads every request and replies personally within one business day${contactPreference === "private-call" ? " to arrange your private conversation" : " with the next best question"}.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e7e0d6;border-bottom:1px solid #e7e0d6;padding:14px 0">${journeyLine}<tr><td style="padding:8px 0;color:#887d70">Feeling</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(feeling)}</td></tr><tr><td style="padding:8px 0;color:#887d70">Travel window</td><td style="padding:8px 0;text-align:right;color:#17140f;font-weight:600">${escapeHtml(`${travelMonth} ${travelYear}`)}</td></tr><tr><td style="padding:8px 0;color:#887d70">Reference</td><td style="padding:8px 0;text-align:right;color:#f0443e;font-weight:700">${escapeHtml(enquiryReference)}</td></tr></table><p style="color:#665e54;line-height:1.75;margin:28px 0">What happens next: Maryangel reviews your brief and replies personally, then we shape a considered journey direction together. Nothing is booked until you are ready.</p>${newsletterLine}<p><a href="https://ryravel.com/case-studies" style="display:inline-block;background:#f0443e;color:#fff;text-decoration:none;padding:15px 22px;font-size:12px;font-weight:700;letter-spacing:1px">READ TRAVELLER STORIES →</a></p><p style="color:#9b9287;font-size:12px;line-height:1.6;margin:34px 0 0">Ryravel · Bespoke travel designed around how you feel<br><a href="mailto:curator@ryravel.com" style="color:#f0443e">curator@ryravel.com</a> · +1 760 514 0361</p></td></tr></table></td></tr></table></body></html>`,
    }),
  });
  if (!response.ok) throw new Error(`Confirmation email returned ${response.status}`);
}
