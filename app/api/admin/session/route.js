import { adminIdentity, clean, jsonError } from "../../../lib/enquiries";
import { verifyTurnstile } from "../../../lib/turnstile";
import { issueSession, sessionCookie } from "../../../lib/security";
import { runtimeEnv } from "../../../../db/index";
import { rateLimit } from "../../../lib/rate-limit";

export async function POST(request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return jsonError("This request origin is not allowed.", 403);
  if (!(await rateLimit(request, "curator-login", 10))) return jsonError("Too many sign-in attempts. Please try again in ten minutes.", 429);
  let payload;
  try { const body = await request.text(); if (body.length > 5000) return jsonError("Sign-in request is too large.", 413); payload = JSON.parse(body); } catch { return jsonError("The sign-in request could not be read."); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return jsonError("Invalid sign-in request.");

  const challenge = await verifyTurnstile(request, payload.turnstileToken, "curator_login");
  if (!challenge.success) return jsonError(challenge.error, 422);

  const accessKey = clean(payload.accessKey, 500);
  if (!accessKey) return jsonError("Enter the curator access key.", 422);
  const headers = new Headers(request.headers);
  headers.delete("cookie");
  headers.set("authorization", `Bearer ${accessKey}`);
  const actor = adminIdentity({ headers });
  if (actor.error) return jsonError("The curator access key is incorrect.", 401);

  return Response.json({ authenticated: true, actor: actor.email }, { headers: { "Cache-Control": "no-store", "Set-Cookie": sessionCookie(issueSession(runtimeEnv().ADMIN_API_TOKEN), new URL(request.url).protocol === "https:") } });
}

export async function DELETE(request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return jsonError("This request origin is not allowed.", 403);
  return Response.json({ authenticated: false }, { headers: { "Cache-Control": "no-store", "Set-Cookie": sessionCookie("", new URL(request.url).protocol === "https:", true) } });
}
