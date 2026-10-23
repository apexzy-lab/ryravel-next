import { partnerAccessCookie } from "../../../lib/partners";

export async function POST(request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "This request origin is not allowed." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  return Response.json({ signedOut: true }, { headers: { "Cache-Control": "no-store", "Set-Cookie": partnerAccessCookie("", new URL(request.url).protocol === "https:", true) } });
}
