import { getD1 } from "../../../../../../db/index";
import { adminIdentity, clean, getEnquiryDetail, jsonError } from "../../../../../lib/enquiries";

export async function POST(request, { params }) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return jsonError("The payment verification could not be read."); }
  const invoice = clean(body?.invoiceReference, 100);
  const kind = clean(body?.kind, 20);
  if (!invoice || !["deposit", "full"].includes(kind) || body?.clearedFundsConfirmed !== true) {
    return jsonError("Enter the invoice reference, payment type, and confirm that funds have cleared.", 422);
  }
  const db = getD1();
  const enquiry = await db.prepare("SELECT id, partner_slug, deleted_at, is_spam, payment_verified_at FROM journey_enquiries WHERE id = ? LIMIT 1").bind(id).first();
  if (!enquiry) return jsonError("Enquiry not found.", 404);
  if (!enquiry.partner_slug || enquiry.deleted_at || enquiry.is_spam) return jsonError("Only an active partner referral can have partner-visible payment verification.", 409);
  if (enquiry.payment_verified_at) return jsonError("Payment is already verified. Revoke it before recording a correction.", 409);
  const now = new Date().toISOString();
  const eventId = crypto.randomUUID();
  const results = await db.batch([
    db.prepare(`UPDATE journey_enquiries SET payment_verified_at = ?, payment_verified_by = ?, payment_invoice_reference = ?, payment_kind = ?, updated_at = ?
      WHERE id = ? AND payment_verified_at IS NULL AND deleted_at IS NULL AND is_spam = 0`).bind(now, actor.email, invoice, kind, now, id),
    db.prepare(`INSERT INTO journey_enquiry_events (id, enquiry_id, created_at, actor_email, event_type, previous_value, next_value)
      SELECT ?, ?, ?, ?, 'payment_verified', NULL, ? WHERE EXISTS (SELECT 1 FROM journey_enquiries WHERE id = ? AND payment_verified_at = ?)`)
      .bind(eventId, id, now, actor.email, kind, id, now),
  ]);
  if (Number(results[0]?.meta?.changes || 0) !== 1) return jsonError("The enquiry changed. Refresh before verifying payment.", 409);
  return Response.json(await getEnquiryDetail(id), { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request, { params }) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return jsonError("The correction could not be read."); }
  const reason = clean(body?.reason, 300);
  if (!reason) return jsonError("Give a reason for removing partner-visible payment status.", 422);
  const db = getD1();
  const existing = await db.prepare("SELECT payment_verified_at FROM journey_enquiries WHERE id = ? LIMIT 1").bind(id).first();
  if (!existing?.payment_verified_at) return jsonError("No verified payment is recorded for this enquiry.", 409);
  const now = new Date().toISOString();
  await db.batch([
    db.prepare(`UPDATE journey_enquiries SET payment_verified_at = NULL, payment_verified_by = NULL,
      payment_invoice_reference = NULL, payment_kind = NULL, updated_at = ? WHERE id = ? AND payment_verified_at = ?`).bind(now, id, existing.payment_verified_at),
    db.prepare(`INSERT INTO journey_enquiry_events (id, enquiry_id, created_at, actor_email, event_type, previous_value, next_value)
      VALUES (?, ?, ?, ?, 'payment_verification_revoked', ?, ?)`)
      .bind(crypto.randomUUID(), id, now, actor.email, existing.payment_verified_at, reason),
  ]);
  return Response.json(await getEnquiryDetail(id), { headers: { "Cache-Control": "no-store" } });
}
