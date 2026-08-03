import { turnstileConfig } from "../../lib/turnstile";

export async function GET() {
  const config = turnstileConfig();
  return Response.json(
    { enabled: config.enabled, siteKey: config.enabled ? config.siteKey : "" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
