export const PARTNER_COOKIE = "ryravel_partner_access";

export function partnerSlug(value) {
  const slug = typeof value === "string" ? value.trim().toLowerCase() : "";
  return /^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/.test(slug) ? slug : "";
}

export function partnerToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function tokenHash(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function partnerAccessCookie(token, secure, clear = false) {
  return `${PARTNER_COOKIE}=${clear ? "" : token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${clear ? 0 : 60 * 60 * 24 * 30}${secure ? "; Secure" : ""}`;
}

export function readPartnerCookie(request) {
  const found = (request.headers.get("cookie") || "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${PARTNER_COOKIE}=`));
  const token = found?.slice(PARTNER_COOKIE.length + 1) || "";
  return /^[a-f0-9]{64}$/.test(token) ? token : "";
}
