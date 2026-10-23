import { getD1 } from "../../../db/index";
import { partnerAccessCookie, tokenHash } from "../../lib/partners";

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("code") || "";
  const headers = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" };
  if (!/^[a-f0-9]{64}$/.test(token)) return new Response("This private report link is invalid.", { status: 401, headers });
  const partner = await getD1().prepare("SELECT slug FROM referral_partners WHERE access_token_hash = ? AND active = 1 LIMIT 1").bind(await tokenHash(token)).first();
  if (!partner) return new Response("This private report link is no longer active. Please ask Ryravel for a new link.", { status: 401, headers });
  // vinext's Worker cache layer follows route-handler redirects internally.
  // A 303 here loops at /partners/portal and eventually throws error 1101.
  // Return a no-store handoff page so the browser, not the Worker, navigates.
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0;url=/partners/portal"><meta name="robots" content="noindex,nofollow"><title>Opening private report | Ryravel</title></head><body><p>Opening your private Ryravel report. <a href="/partners/portal">Continue to your report</a>.</p></body></html>';
  return new Response(html, { status: 200, headers: { ...headers, "Content-Type": "text/html; charset=utf-8", "Set-Cookie": partnerAccessCookie(token, url.protocol === "https:") } });
}
