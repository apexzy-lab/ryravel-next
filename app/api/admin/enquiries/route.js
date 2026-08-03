import { getD1 } from "../../../../db/index";
import { adminIdentity, jsonError } from "../../../lib/enquiries";

export async function GET(request) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  try {
    const db = getD1();
    const [counts, enquiries] = await db.batch([
      db.prepare(`SELECT COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
        SUM(CASE WHEN status NOT IN ('won','declined','closed') THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN next_action_due_at IS NOT NULL AND next_action_due_at < datetime('now') THEN 1 ELSE 0 END) AS overdue_count
        FROM journey_enquiries WHERE archived_at IS NULL AND is_spam = 0`),
      db.prepare(`SELECT id, reference, created_at, name, email, feeling, travel_month, travel_year,
        duration, people, budget, status, priority, assigned_to, next_action,
        next_action_due_at, tags, fit_score
        FROM journey_enquiries WHERE archived_at IS NULL AND is_spam = 0
        ORDER BY created_at DESC LIMIT 200`),
    ]);
    return Response.json({ actor: actor.email, counts: counts.results?.[0] || {}, enquiries: enquiries.results || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "The enquiry desk could not be loaded.", 500);
  }
}
