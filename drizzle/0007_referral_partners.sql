CREATE TABLE IF NOT EXISTS referral_partners (
  slug TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  access_token_hash TEXT NOT NULL UNIQUE,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
ALTER TABLE journey_enquiries ADD COLUMN partner_slug TEXT;
CREATE INDEX IF NOT EXISTS journey_enquiries_partner_created_idx ON journey_enquiries(partner_slug,created_at);
