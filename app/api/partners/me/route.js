import { getD1 } from "../../../../db/index";
import { jsonError } from "../../../lib/enquiries";
import { readPartnerCookie, tokenHash } from "../../../lib/partners";

export async function GET(request) {
  const token = readPartnerCookie(request);
  if (!token) return jsonError("Open your private report link to sign in.", 401);
  const db = getD1();
  const partner = await db.prepare("SELECT slug,name FROM referral_partners WHERE access_token_hash = ? AND active = 1 LIMIT 1").bind(await tokenHash(token)).first();
  if (!partner) return jsonError("Your private report link is no longer active.", 401);
  const [summary, enquiries] = await Promise.all([db.prepare(`SELECT COUNT(*) AS referred,
    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) AS booked,
    SUM(CASE WHEN payment_verified_at IS NOT NULL THEN 1 ELSE 0 END) AS paid FROM journey_enquiries
    WHERE partner_slug = ? AND deleted_at IS NULL AND is_spam = 0`).bind(partner.slug).first(), db.prepare(`SELECT reference, created_at, status, payment_verified_at, payment_kind FROM journey_enquiries
    WHERE partner_slug = ? AND deleted_at IS NULL AND is_spam = 0
    ORDER BY created_at DESC LIMIT 200`).bind(partner.slug).all()]);
  const rows = (enquiries.results || []).map((row) => ({
    reference: row.reference,
    submitted: row.created_at,
    stage: row.status === "won" ? "Booked" : ["declined", "closed"].includes(row.status) ? "Closed" : row.status === "new" ? "Received" : "In review",
    payment: row.payment_verified_at ? (row.payment_kind === "full" ? "Full payment verified" : "Deposit verified") : "Not yet verified",
  }));
  return Response.json({ partner: { name: partner.name, slug: partner.slug }, totals: { referred: Number(summary?.referred || 0), booked: Number(summary?.booked || 0), paid: Number(summary?.paid || 0) }, referrals: rows }, { headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" } });
}
