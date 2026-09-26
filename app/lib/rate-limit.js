import { createHmac } from "node:crypto";
import { getD1, runtimeEnv } from "../../db/index";
export async function rateLimit(request, scope, maximum, seconds = 600) {
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip && ["localhost","127.0.0.1"].includes(new URL(request.url).hostname)) return true;
  const env = runtimeEnv(), db = getD1(), now = Math.floor(Date.now()/1000);
  const key = createHmac("sha256", env.RATE_LIMIT_SALT || env.ADMIN_API_TOKEN || "rate-limit").update(scope + ":" + (ip || "unknown")).digest("hex");
  const result = await db.prepare("INSERT INTO security_rate_limits(key,hits,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN expires_at<=? THEN 1 ELSE hits+1 END, expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING hits").bind(key, now+seconds, now, now).first();
  return Number(result.hits) <= maximum;
}
