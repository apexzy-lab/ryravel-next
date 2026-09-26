import { getD1 } from "../../../../db/index";
import { adminIdentity, jsonError } from "../../../lib/enquiries";
import { operationsSummary, processDeliveries } from "../../../lib/deliveries";
export async function GET(request) {
  const actor = adminIdentity(request); if(actor.error) return actor.error;
  return Response.json(await operationsSummary(),{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request) {
  const actor = adminIdentity(request); if(actor.error) return actor.error;
  let payload; try {payload=await request.json();} catch {return jsonError('Invalid request');}
  if (payload.action!=='retry-failed') return jsonError('Unknown action');
  await getD1().prepare("UPDATE delivery_jobs SET status='retry',attempts=0,next_attempt_at=datetime('now'),lease_until=NULL WHERE status='failed'").run();
  await processDeliveries();
  return GET(request);
}
