import { talkConfiguration } from "../../../lib/talk-calendar";

export function GET() {
  return Response.json({ open: talkConfiguration().ready, durationMinutes: 25, format: "Google Meet" }, { headers: { "Cache-Control": "no-store" } });
}
