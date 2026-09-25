import { getD1 } from "../../../../db/index";
import { adminIdentity, jsonError } from "../../../lib/enquiries";

export async function GET(request) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const days = Number(new URL(request.url).searchParams.get("days"));
  if (![7, 30, 90].includes(days)) return jsonError("Choose a 7, 30 or 90 day window.");
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 19).replace("T", " ");
  const sinceIso = since.replace(" ", "T");
  try {
    const db = getD1();
    const [events, totals, qualified] = await db.batch([
      db.prepare("SELECT event_type, journey_slug, COUNT(*) AS events, COUNT(DISTINCT session_id) AS sessions FROM funnel_events WHERE occurred_at >= ? GROUP BY event_type, journey_slug").bind(since),
      db.prepare("SELECT event_type, COUNT(DISTINCT session_id) AS sessions FROM funnel_events WHERE occurred_at >= ? GROUP BY event_type").bind(since),
      db.prepare(`SELECT substr(j.value, 9) AS journey_slug, COUNT(*) AS submitted, SUM(CASE WHEN e.status IN ('qualified', 'discovery', 'shaping', 'proposal', 'won') THEN 1 ELSE 0 END) AS qualified
        FROM journey_enquiries e, json_each(e.tags) j
        WHERE e.created_at >= ? AND e.is_spam = 0 AND e.deleted_at IS NULL AND j.value LIKE 'journey:%'
        GROUP BY j.value`).bind(sinceIso),
    ]);
    return Response.json({ days, events: events.results || [], totals: totals.results || [], identified: qualified.results || [], note: "Session-level events include only visitors who allowed analytics. Identified enquiry counts are separate and may include visitors who declined analytics." }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Funnel report failed", error instanceof Error ? error.message : "Unknown error");
    return jsonError("The funnel report is temporarily unavailable.", 503);
  }
}
