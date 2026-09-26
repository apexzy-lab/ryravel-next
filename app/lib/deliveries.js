import { getD1, runtimeEnv } from "../../db/index";
import { sendGtmcrSignal, sendGuestConfirmation } from "./delivery-providers";

export function deliveryStatement(db, id, kind, payload) {
  return db.prepare("INSERT INTO delivery_jobs (id,enquiry_id,kind,payload) VALUES (?,?,?,?)")
    .bind(`${id}:${kind}`, id, kind, JSON.stringify(payload));
}
export async function processDeliveries(limit = 12) {
  const db = getD1();
  const jobs = await db.prepare("SELECT * FROM delivery_jobs WHERE (status IN ('pending','retry') OR (status='held' AND ?=1)) AND next_attempt_at <= datetime('now') AND (lease_until IS NULL OR lease_until < datetime('now')) ORDER BY created_at LIMIT ?").bind(runtimeEnv().GTMCR_TRANSACTIONAL_CONTACTS_READY === "true" ? 1 : 0, limit).all();
  for (const job of jobs.results || []) {
    const lease = await db.prepare("UPDATE delivery_jobs SET lease_until=datetime('now','+2 minutes') WHERE id=? AND status IN ('pending','retry','held') AND (lease_until IS NULL OR lease_until < datetime('now'))").bind(job.id).run();
    if (!lease.meta?.changes) continue;
    try {
      const data = JSON.parse(job.payload);
      if (job.kind === "gtmcr" && !data.newsletter && runtimeEnv().GTMCR_TRANSACTIONAL_CONTACTS_READY !== "true") {
        await db.prepare("UPDATE delivery_jobs SET status='held',lease_until=NULL,last_error='Awaiting consent-safe CRM receiver' WHERE id=?").bind(job.id).run();
        continue;
      }
      if (job.kind === 'gtmcr') await sendGtmcrSignal(data);
      else if (job.kind === 'confirmation') await sendGuestConfirmation(data);
      else throw new Error('Unknown delivery kind');
      await db.prepare("UPDATE delivery_jobs SET status='delivered', delivered_at=datetime('now'), attempts=attempts+1, lease_until=NULL, last_error=NULL, payload='{}' WHERE id=?").bind(job.id).run();
    } catch (error) {
      const attempts = Number(job.attempts) + 1;
      const delay = Math.min(360, 2 ** attempts);
      await db.prepare("UPDATE delivery_jobs SET status=?, attempts=?, next_attempt_at=datetime('now',?), lease_until=NULL,last_error=? WHERE id=?")
        .bind(attempts >= 8 ? 'failed' : 'retry', attempts, `+${delay} minutes`, String(error.message || 'Delivery failed').slice(0,180), job.id).run();
      console.error('Ryravel delivery failed', job.kind, job.id); // No customer payload or secrets in logs.
    }
  }
}
export async function operationsSummary() {
  const db = getD1();
  const [delivery, overdue, retention, scheduler] = await db.batch([
    db.prepare("SELECT status,COUNT(*) AS total FROM delivery_jobs GROUP BY status"),
    db.prepare("SELECT COUNT(*) AS total FROM journey_enquiries WHERE deleted_at IS NULL AND archived_at IS NULL AND is_spam=0 AND status NOT IN ('won','declined','closed') AND ((status='new' AND julianday(created_at)<julianday('now','-1 day')) OR julianday(next_action_due_at)<julianday('now'))"),
    db.prepare("SELECT COUNT(*) AS total FROM journey_enquiries e WHERE e.status IN ('declined','closed') AND julianday(COALESCE(e.updated_at,e.created_at))<julianday('now','-12 months') AND e.archived_at IS NULL AND COALESCE(e.admin_note,'') NOT LIKE '%LEGAL HOLD%' AND NOT EXISTS (SELECT 1 FROM journey_enquiry_events h WHERE h.enquiry_id=e.id AND (h.previous_value='won' OR h.next_value='won'))"),
    db.prepare("SELECT updated_at FROM operations_state WHERE key='scheduler'"),
  ]);
  return { deliveries: delivery.results || [], overdue: Number(overdue.results?.[0]?.total || 0), retentionReviews: Number(retention.results?.[0]?.total || 0), schedulerLastRun: scheduler.results?.[0]?.updated_at || null };
}
export async function alertOperations() {
  const env = runtimeEnv(), db = getD1();
  const summary = await operationsSummary();
  const failed = summary.deliveries.filter(x => x.status === 'failed').reduce((n,x) => n+Number(x.total),0);
  const retrying = summary.deliveries.filter(x => x.status === 'retry').reduce((n,x) => n+Number(x.total),0);
  if (!failed && !retrying && !summary.overdue) return;
  const state = await db.prepare("SELECT updated_at FROM operations_state WHERE key='last-alert'").first();
  if (state && Date.now()-Date.parse(state.updated_at+'Z') < 6*3600000) return;
  if (!env.RESEND_API_KEY) { console.error('Operations alerts are not configured'); return; }
  const response = await fetch(env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method:'POST', headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'}, signal:AbortSignal.timeout(4000),
    body:JSON.stringify({ from:env.RESEND_FROM_EMAIL || 'Ryravel Operations <curator@updates.ryravel.com>', to:[env.OPS_ALERT_EMAIL || 'support@ryravel.com'], subject:'Ryravel operations: attention required', text:`Failed deliveries: ${failed}\nRetrying deliveries: ${retrying}\nOverdue enquiries/actions: ${summary.overdue}\nOpen https://ryravel.com/curator-desk to review. Customer details are not included in this alert.` }),
  });
  if (!response.ok) throw new Error(`Operations alert failed (${response.status})`);
  await db.prepare("INSERT INTO operations_state(key,value,updated_at) VALUES('last-alert','sent',datetime('now')) ON CONFLICT(key) DO UPDATE SET value='sent',updated_at=datetime('now')").run();
}
