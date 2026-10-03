CREATE TABLE IF NOT EXISTS newsletter_opt_ins (
  enquiry_id TEXT PRIMARY KEY,
  reference TEXT NOT NULL,
  email TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  notice TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  requested_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  confirmed_at TEXT
);
CREATE INDEX IF NOT EXISTS newsletter_opt_ins_expiry ON newsletter_opt_ins(expires_at);
