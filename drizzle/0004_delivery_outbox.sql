CREATE TABLE IF NOT EXISTS delivery_jobs (
 id TEXT PRIMARY KEY, enquiry_id TEXT NOT NULL, kind TEXT NOT NULL,
 payload TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt_at TEXT NOT NULL DEFAULT (datetime('now')), lease_until TEXT,
 last_error TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')), delivered_at TEXT,
 UNIQUE(enquiry_id, kind)
);
CREATE INDEX IF NOT EXISTS delivery_jobs_due ON delivery_jobs(status,next_attempt_at);
CREATE TABLE IF NOT EXISTS operations_state (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS security_rate_limits (key TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires_at INTEGER NOT NULL);
