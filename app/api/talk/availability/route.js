import { getD1 } from "../../../../db/index";
import { jsonError } from "../../../lib/enquiries";
import { rateLimit } from "../../../lib/rate-limit";
import { availableTalkSlots, talkConfiguration, validTimeZone } from "../../../lib/talk-calendar";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const date = params.get("date") || "";
  const timeZone = params.get("timeZone") || "";
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(date) || !validTimeZone(timeZone)) return jsonError("Choose a valid date and time zone.", 422);
  if (!talkConfiguration().ready) return jsonError("Online scheduling is not open yet. Please request a private call instead.", 503);
  try {
    if (!await rateLimit(request, "talk-availability", 45, 600)) return jsonError("Please try again shortly.", 429);
    const slots = await availableTalkSlots(getD1(), date, timeZone);
    return Response.json({ slots, durationMinutes: 25 }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Talk availability failed", error.message);
    return jsonError("Available times could not be checked. Please try again shortly.", 503);
  }
}
