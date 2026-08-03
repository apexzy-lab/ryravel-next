import { adminIdentity, clean, jsonError } from "../../../lib/enquiries";
import { verifyTurnstile } from "../../../lib/turnstile";

export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch { return jsonError("The sign-in request could not be read."); }

  const challenge = await verifyTurnstile(request, payload.turnstileToken, "curator_login");
  if (!challenge.success) return jsonError(challenge.error, 422);

  const accessKey = clean(payload.accessKey, 500);
  if (!accessKey) return jsonError("Enter the curator access key.", 422);
  const headers = new Headers(request.headers);
  headers.set("authorization", `Bearer ${accessKey}`);
  const actor = adminIdentity({ headers });
  if (actor.error) return jsonError("The curator access key is incorrect.", 401);

  return Response.json({ authenticated: true, actor: actor.email }, { headers: { "Cache-Control": "no-store" } });
}
