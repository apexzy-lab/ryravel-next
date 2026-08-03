import { getD1 } from "../../../../../db/index";
import { adminIdentity, clean, getEnquiryDetail, jsonError, parseTags, PRIORITIES, STATUSES } from "../../../../lib/enquiries";

export async function GET(request, { params }) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const { id } = await params;
  const detail = await getEnquiryDetail(id);
  if (!detail.enquiry) return jsonError("Enquiry not found.", 404);
  return Response.json(detail, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request, { params }) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const { id } = await params;
  let payload;
  try { payload = await request.json(); } catch { return jsonError("The update could not be read."); }
  const db = getD1();
  const existing = await db.prepare("SELECT * FROM journey_enquiries WHERE id = ? LIMIT 1").bind(id).first();
  if (!existing) return jsonError("Enquiry not found.", 404);

  const status = Object.hasOwn(payload, "status") ? clean(payload.status, 30).toLowerCase() : existing.status;
  const priority = Object.hasOwn(payload, "priority") ? clean(payload.priority, 20).toLowerCase() : existing.priority;
  if (!STATUSES.includes(status)) return jsonError("Choose a valid status.", 422);
  if (!PRIORITIES.includes(priority)) return jsonError("Choose a valid priority.", 422);
  const note = Object.hasOwn(payload, "note") ? clean(payload.note, 5000) : existing.admin_note;
  const assignedTo = Object.hasOwn(payload, "assignedTo") ? clean(payload.assignedTo, 254).toLowerCase() : existing.assigned_to;
  const nextAction = Object.hasOwn(payload, "nextAction") ? clean(payload.nextAction, 500) : existing.next_action;
  const nextActionDueAt = Object.hasOwn(payload, "nextActionDueAt") ? clean(payload.nextActionDueAt, 40) : existing.next_action_due_at;
  const tags = Object.hasOwn(payload, "tags") && Array.isArray(payload.tags) ? payload.tags.map((tag) => clean(tag, 60)).filter(Boolean).slice(0, 20) : parseTags(existing.tags);
  const rawScore = Object.hasOwn(payload, "fitScore") ? payload.fitScore : existing.fit_score;
  const score = rawScore === "" || rawScore == null ? null : Math.max(0, Math.min(100, Number(rawScore)));
  const disposition = Object.hasOwn(payload, "dispositionReason") ? clean(payload.dispositionReason, 500) : existing.disposition_reason;
  const archivedAt = payload.archived === true ? new Date().toISOString() : existing.archived_at;
  const isSpam = payload.spam === true ? 1 : existing.is_spam;
  const deletedAt = payload.deleted === true ? new Date().toISOString() : payload.restored === true ? null : existing.deleted_at;
  const now = new Date().toISOString();
  const statements = [db.prepare(`UPDATE journey_enquiries SET status = ?, priority = ?, assigned_to = ?, next_action = ?, next_action_due_at = ?, tags = ?, fit_score = ?, disposition_reason = ?, admin_note = ?, reviewed_by = ?, updated_at = ?, archived_at = ?, deleted_at = ?, is_spam = ? WHERE id = ?`).bind(status, priority, assignedTo || null, nextAction || null, nextActionDueAt || null, JSON.stringify(tags), Number.isFinite(score) ? score : null, disposition || null, note || null, actor.email, now, archivedAt, deletedAt, isSpam, id)];
  if (status !== existing.status) statements.push(db.prepare("INSERT INTO journey_enquiry_events (id, enquiry_id, created_at, actor_email, event_type, previous_value, next_value) VALUES (?, ?, ?, ?, 'status_changed', ?, ?)").bind(crypto.randomUUID(), id, now, actor.email, existing.status, status));
  if (note !== existing.admin_note) statements.push(db.prepare("INSERT INTO journey_enquiry_events (id, enquiry_id, created_at, actor_email, event_type, previous_value, next_value) VALUES (?, ?, ?, ?, 'note_updated', NULL, NULL)").bind(crypto.randomUUID(), id, now, actor.email));
  if (deletedAt !== existing.deleted_at) statements.push(db.prepare("INSERT INTO journey_enquiry_events (id, enquiry_id, created_at, actor_email, event_type, previous_value, next_value) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(), id, now, actor.email, deletedAt ? "moved_to_trash" : "restored_from_trash", existing.deleted_at, deletedAt));
  await db.batch(statements);
  return Response.json(await getEnquiryDetail(id), { headers: { "Cache-Control": "no-store" } });
}
