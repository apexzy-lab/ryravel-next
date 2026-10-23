import { getD1 } from "../../../../db/index";
import { adminIdentity, clean, jsonError } from "../../../lib/enquiries";
import { partnerSlug, partnerToken, tokenHash } from "../../../lib/partners";

export async function GET(request) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const rows = await getD1().prepare(`SELECT p.slug, p.name, p.email, p.active, p.created_at,
    COUNT(e.id) AS enquiries,
    SUM(CASE WHEN e.status = 'won' THEN 1 ELSE 0 END) AS booked
    FROM referral_partners p LEFT JOIN journey_enquiries e ON e.partner_slug = p.slug AND e.deleted_at IS NULL AND e.is_spam = 0
    GROUP BY p.slug ORDER BY p.created_at DESC LIMIT 200`).all();
  return Response.json({ partners: rows.results || [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  let body;
  try { const text = await request.text(); if (text.length > 4000) return jsonError("Partner details are too large.", 413); body = JSON.parse(text); } catch { return jsonError("Partner details could not be read."); }
  const name = clean(body?.name, 100);
  const slug = partnerSlug(body?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  const email = clean(body?.email, 254).toLowerCase();
  if (!name || !slug) return jsonError("Enter a name and a valid link name.", 422);
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return jsonError("Enter a valid coach email.", 422);
  const db = getD1();
  if (await db.prepare("SELECT 1 FROM referral_partners WHERE slug = ?").bind(slug).first()) return jsonError("That partner link name is already taken.", 409);
  const token = partnerToken();
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO referral_partners (slug,name,email,access_token_hash,active,created_at,updated_at) VALUES (?,?,?,?,1,?,?)")
    .bind(slug, name, email || null, await tokenHash(token), now, now).run();
  const origin = new URL(request.url).origin;
  return Response.json({ partner: { slug, name, email, active: 1 }, referralLink: `${origin}/request?partner=${slug}`, privateReportLink: `${origin}/partners/access?code=${token}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
