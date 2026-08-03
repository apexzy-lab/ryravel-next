import { getD1 } from "../../../../db/index";
import { adminIdentity, jsonError } from "../../../lib/enquiries";

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  try {
    const rows = await getD1().prepare(`SELECT reference, created_at, name, email, country_code, phone,
      feeling, travel_month, travel_year, duration, people, budget, message, referral,
      newsletter, status, priority, assigned_to, next_action, next_action_due_at, fit_score,
      disposition_reason, reviewed_by, updated_at
      FROM journey_enquiries WHERE archived_at IS NULL AND is_spam = 0 ORDER BY created_at DESC`).all();
    const columns = ["reference", "created_at", "name", "email", "country_code", "phone", "feeling", "travel_month", "travel_year", "duration", "people", "budget", "message", "referral", "newsletter", "status", "priority", "assigned_to", "next_action", "next_action_due_at", "fit_score", "disposition_reason", "reviewed_by", "updated_at"];
    const csv = [columns.map(csvCell).join(","), ...(rows.results || []).map((row) => columns.map((column) => csvCell(row[column])).join(","))].join("\r\n");
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="ryravel-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" } });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "The export could not be created.", 500);
  }
}
