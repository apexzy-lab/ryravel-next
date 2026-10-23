import { getD1 } from "../../../db/index";
import { partnerAccessCookie, tokenHash } from "../../lib/partners";

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("code") || "";
  const headers = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" };
  if (!/^[a-f0-9]{64}$/.test(token)) return new Response("This private report link is invalid.", { status: 401, headers });
  const partner = await getD1().prepare("SELECT slug FROM referral_partners WHERE access_token_hash = ? AND active = 1 LIMIT 1").bind(await tokenHash(token)).first();
  if (!partner) return new Response("This private report link is no longer active. Please ask Ryravel for a new link.", { status: 401, headers });
  return new Response(null, { status: 303, headers: { ...headers, Location: `${url.origin}/partners/portal`, "Set-Cookie": partnerAccessCookie(token, url.protocol === "https:") } });
}
