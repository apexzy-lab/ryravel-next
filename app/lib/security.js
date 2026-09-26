import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "ryravel-curator-session";
export const SESSION_SECONDS = 8 * 60 * 60;
export function issueSession(secret, now = Date.now()) {
  const value = `${now + SESSION_SECONDS * 1000}.${randomUUID()}`;
  return `${value}.${createHmac("sha256", secret).update(value).digest("hex")}`;
}
export function verifySession(value, secret, now = Date.now()) {
  if (!secret || typeof value !== "string" || value.length > 200) return false;
  const parts = value.split(".");
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
  const expiry = Number(parts[0]);
  if (expiry <= now || expiry > now + SESSION_SECONDS * 1000) return false;
  const expected = createHmac("sha256", secret).update(`${parts[0]}.${parts[1]}`).digest();
  return timingSafeEqual(expected, Buffer.from(parts[2], "hex"));
}
export function sessionCookie(value, secure = true, clear = false) {
  return `${SESSION_COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${clear ? 0 : SESSION_SECONDS}${secure ? "; Secure" : ""}`;
}
export function spreadsheetCell(value) {
  let text = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = `\t${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
