import { clean } from "./enquiries";
import { runtimeEnv } from "../../db/index";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileConfig() {
  const siteKey = clean(runtimeEnv().TURNSTILE_SITE_KEY, 200);
  const secretKey = clean(runtimeEnv().TURNSTILE_SECRET_KEY, 500);
  return { enabled: Boolean(siteKey && secretKey), siteKey, secretKey };
}

export async function verifyTurnstile(request, token) {
  const config = turnstileConfig();
  if (!config.enabled) return { success: true, configured: false };
  if (!clean(token, 2048)) return { success: false, configured: true, error: "Please complete the security check." };

  const body = new FormData();
  body.set("secret", config.secretKey);
  body.set("response", token);
  body.set("idempotency_key", crypto.randomUUID());
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, { method: "POST", body });
    const result = await response.json();
    const expectedHostname = new URL(request.url).hostname;
    if (!response.ok || result.success !== true || result.action !== "journey_request" || result.hostname !== expectedHostname) {
      return { success: false, configured: true, error: "The security check expired or could not be verified. Please try again." };
    }
    return { success: true, configured: true };
  } catch {
    return { success: false, configured: true, error: "The security check is temporarily unavailable. Please try again." };
  }
}
