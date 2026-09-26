import { getD1 } from "../../../db/index";
import { FUNNEL_EVENTS } from "../../lib/funnel";
import { rateLimit } from "../../lib/rate-limit";

const allowedEvents = new Set(FUNNEL_EVENTS);
const feelings = new Set(["Exhausted", "Restless", "Disconnected", "Romantic", "Curious", "Celebratory", "Purposeful", "Open"]);
const errorFields = new Set(["feeling", "month", "year", "duration", "people", "budget", "name", "email", "countryCode", "phone", "preferredCallTime", "turnstile", "submission"]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slug = /^[a-z0-9-]{1,80}$/;

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (!(await rateLimit(request, "analytics", 240))) return new Response(null, { status: 429 });
  if (Number(request.headers.get("content-length") || 0) > 2048) return new Response(null, { status: 413 });
  let value;
  try {
    const body = await request.text();
    if (body.length > 2048) return new Response(null, { status: 413 });
    value = JSON.parse(body);
  } catch { return new Response(null, { status: 400 }); }
  if (!value || !uuid.test(value.id) || !uuid.test(value.session) || !allowedEvents.has(value.event)) return new Response(null, { status: 400 });
  const journeySlug = value.journey_slug === undefined ? null : value.journey_slug;
  const caseStudySlug = value.case_study_slug === undefined ? null : value.case_study_slug;
  if ((journeySlug !== null && !slug.test(journeySlug)) || (caseStudySlug !== null && !slug.test(caseStudySlug))) return new Response(null, { status: 400 });
  if (value.feeling !== undefined && !feelings.has(value.feeling)) return new Response(null, { status: 400 });
  if (value.step !== undefined && ![1, 2, 3].includes(value.step)) return new Response(null, { status: 400 });
  if (value.error_fields !== undefined && (!Array.isArray(value.error_fields) || value.error_fields.length > 12 || !value.error_fields.every((field) => errorFields.has(field)))) return new Response(null, { status: 400 });
  try {
    const db = getD1();
    const recent = await db.prepare("SELECT COUNT(*) AS total FROM funnel_events WHERE session_id = ? AND occurred_at >= datetime('now', '-10 minutes')").bind(value.session).first();
    if (Number(recent?.total || 0) >= 60) return new Response(null, { status: 429 });
    await db.prepare("INSERT OR IGNORE INTO funnel_events (id, session_id, event_type, occurred_at, journey_slug, case_study_slug, feeling, form_step, error_fields) VALUES (?, ?, ?, datetime('now'), ?, ?, ?, ?, ?)")
      .bind(value.id, value.session, value.event, journeySlug, caseStudySlug, value.feeling || null, value.step || null, value.error_fields ? JSON.stringify(value.error_fields) : null).run();
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Funnel event could not be stored", error instanceof Error ? error.message : "Unknown error");
    return new Response(null, { status: 503 });
  }
}
