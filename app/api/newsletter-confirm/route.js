import { waitUntil } from "cloudflare:workers";
import { getD1 } from "../../../db/index";
import { processDeliveries } from "../../lib/deliveries";

function redirect(request, path) {
  return new Response(null, { status: 303, headers: { Location: new URL(path, request.url).toString(), "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}

async function hashToken(token) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request) {
  let form;
  try { form = await request.formData(); } catch { return redirect(request, "/newsletter/expired"); }
  const token = form.get("token");
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) return redirect(request, "/newsletter/expired");
  const db = getD1();
  const tokenHash = await hashToken(token);
  const record = await db.prepare("SELECT enquiry_id,reference,email,notice,policy_version,expires_at,confirmed_at FROM newsletter_opt_ins WHERE token_hash=? LIMIT 1").bind(tokenHash).first();
  if (!record || Date.parse(record.expires_at) <= Date.now()) return redirect(request, "/newsletter/expired");
  if (record.confirmed_at) return redirect(request, "/newsletter/confirmed");

  const confirmedAt = new Date().toISOString();
  const consentPayload = JSON.stringify({ id: record.enquiry_id, email: record.email, reference: record.reference, capturedAt: confirmedAt, notice: record.notice, policyVersion: record.policy_version });
  await db.batch([
    db.prepare("UPDATE newsletter_opt_ins SET confirmed_at=? WHERE token_hash=? AND confirmed_at IS NULL AND expires_at>?").bind(confirmedAt, tokenHash, confirmedAt),
    db.prepare("INSERT OR IGNORE INTO delivery_jobs (id,enquiry_id,kind,payload) SELECT ?,?,?,? FROM newsletter_opt_ins WHERE token_hash=? AND confirmed_at=? AND expires_at>?")
      .bind(`${record.enquiry_id}:gtmcr_consent`, record.enquiry_id, "gtmcr_consent", consentPayload, tokenHash, confirmedAt, confirmedAt),
  ]);
  waitUntil(processDeliveries().catch(() => console.error("Newsletter consent delivery failed")));
  return redirect(request, "/newsletter/confirmed");
}
