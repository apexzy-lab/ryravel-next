import { getD1 } from "../../../../../db/index";
import { adminIdentity, jsonError } from "../../../../lib/enquiries";
import { partnerSlug, partnerToken, tokenHash } from "../../../../lib/partners";

export async function PATCH(request, { params }) {
  const actor = adminIdentity(request);
  if (actor.error) return actor.error;
  const slug = partnerSlug((await params).slug);
  if (!slug) return jsonError("Invalid partner link.", 404);
  let body;
  try { body = await request.json(); } catch { return jsonError("The update could not be read."); }
  const db = getD1();
  if (!(await db.prepare("SELECT 1 FROM referral_partners WHERE slug = ?").bind(slug).first())) return jsonError("Partner not found.", 404);
  if (body?.action === "activate" || body?.action === "pause") {
    await db.prepare("UPDATE referral_partners SET active = ?, updated_at = ? WHERE slug = ?").bind(body.action === "activate" ? 1 : 0, new Date().toISOString(), slug).run();
    return Response.json({ updated: true }, { headers: { "Cache-Control": "no-store" } });
  }
  if (body?.action === "rotate") {
    const token = partnerToken();
    await db.prepare("UPDATE referral_partners SET access_token_hash = ?, updated_at = ? WHERE slug = ?").bind(await tokenHash(token), new Date().toISOString(), slug).run();
    return Response.json({ updated: true, privateReportLink: `${new URL(request.url).origin}/partners/access?code=${token}` }, { headers: { "Cache-Control": "no-store" } });
  }
  return jsonError("Choose a valid partner action.", 422);
}
