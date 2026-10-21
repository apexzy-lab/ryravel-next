CREATE TABLE IF NOT EXISTS talk_bookings (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  feeling TEXT,
  journey TEXT,
  note TEXT,
  start_utc TEXT NOT NULL,
  end_utc TEXT NOT NULL,
  guest_time_zone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  google_event_id TEXT,
  meet_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS talk_bookings_active_slot ON talk_bookings(start_utc) WHERE status IN ('pending','confirmed');
CREATE INDEX IF NOT EXISTS talk_bookings_email_created ON talk_bookings(email,created_at);
