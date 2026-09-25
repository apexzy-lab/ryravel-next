CREATE TABLE `funnel_events` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`event_type` text NOT NULL,
	`occurred_at` text NOT NULL,
	`journey_slug` text,
	`case_study_slug` text,
	`feeling` text,
	`form_step` integer,
	`error_fields` text
);
--> statement-breakpoint
CREATE INDEX `funnel_events_occurred_idx` ON `funnel_events` (`occurred_at`);--> statement-breakpoint
CREATE INDEX `funnel_events_journey_idx` ON `funnel_events` (`journey_slug`,`event_type`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `funnel_events_session_idx` ON `funnel_events` (`session_id`,`occurred_at`);