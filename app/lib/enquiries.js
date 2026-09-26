import { getD1, runtimeEnv } from "../../db/index";
import { SESSION_COOKIE, verifySession } from "./security";

export const STATUSES = ["new", "qualified", "discovery", "shaping", "proposal", "won", "declined", "closed"];
export const PRIORITIES = ["normal", "high", "urgent"];

export function clean(value, maximum = 500) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maximum) : "";
}

export function jsonError(message, status = 400) {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export function parseTags(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.filter((tag) => typeof tag === "string") : [];
  } catch {
    return [];
  }
}

function secureEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export function adminIdentity(request) {
  const headers = request.headers;
  const configuredToken = clean(runtimeEnv().ADMIN_API_TOKEN, 500);
  const authorization = headers.get("authorization") || "";
  const suppliedToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (configuredToken && secureEqual(suppliedToken, configuredToken)) {
    return { email: "curator@ryravel.com" };
  }
  const cookie = (headers.get("cookie") || "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  if (verifySession(cookie, configuredToken)) {
    if (request.method && !["GET", "HEAD"].includes(request.method) && headers.get("origin") !== new URL(request.url).origin) return { error: jsonError("This request origin is not allowed.", 403) };
    return { email: "curator@ryravel.com" };
  }

  // Internet-supplied identity headers are not authentication. Keep the existing
  // access-key login; SSO may be added only with signature, issuer and audience verification.
  return { error: jsonError("Sign in with the curator access key.", 401) };
}

export async function getEnquiryDetail(id) {
  const db = getD1();
  const [enquiry, events] = await db.batch([
    db.prepare("SELECT * FROM journey_enquiries WHERE id = ? LIMIT 1").bind(id),
    db.prepare("SELECT * FROM journey_enquiry_events WHERE enquiry_id = ? ORDER BY created_at DESC LIMIT 100").bind(id),
  ]);
  return { enquiry: enquiry.results?.[0] || null, events: events.results || [] };
}
