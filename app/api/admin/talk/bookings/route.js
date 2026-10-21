import { getD1 } from "../../../../../db/index";
import { adminIdentity, jsonError } from "../../../../lib/enquiries";

export async function GET(request) {
  const identity = adminIdentity(request);
  if (identity.error) return identity.error;
  try {
    const rows = await getD1().prepare("SELECT reference,name,email,feeling,journey,note,start_utc,end_utc,guest_time_zone,status,google_event_id,created_at FROM talk_bookings ORDER BY created_at DESC LIMIT 100").all();
    return Response.json({ bookings: rows.results || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch { return jsonError("Talk bookings could not be loaded.", 503); }
}
