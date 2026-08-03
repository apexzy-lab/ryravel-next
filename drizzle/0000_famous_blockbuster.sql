CREATE TABLE `journey_enquiry_events` (
	`id` text PRIMARY KEY NOT NULL,
	`enquiry_id` text NOT NULL,
	`created_at` text NOT NULL,
	`actor_email` text NOT NULL,
	`event_type` text NOT NULL,
	`previous_value` text,
	`next_value` text,
	FOREIGN KEY (`enquiry_id`) REFERENCES `journey_enquiries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `journey_enquiry_events_enquiry_created_idx` ON `journey_enquiry_events` (`enquiry_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `journey_enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`country_code` text NOT NULL,
	`feeling` text NOT NULL,
	`travel_month` text NOT NULL,
	`travel_year` text NOT NULL,
	`duration` text NOT NULL,
	`people` text NOT NULL,
	`budget` text NOT NULL,
	`message` text,
	`referral` text,
	`newsletter` integer DEFAULT 0 NOT NULL,
	`source_url` text,
	`user_agent` text,
	`ip_hash` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`priority` text DEFAULT 'normal' NOT NULL,
	`assigned_to` text,
	`next_action` text,
	`next_action_due_at` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`fit_score` integer,
	`disposition_reason` text,
	`admin_note` text,
	`reviewed_by` text,
	`archived_at` text,
	`is_spam` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `journey_enquiries_reference_unique` ON `journey_enquiries` (`reference`);--> statement-breakpoint
CREATE INDEX `journey_enquiries_status_created_idx` ON `journey_enquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `journey_enquiries_due_idx` ON `journey_enquiries` (`next_action_due_at`);--> statement-breakpoint
CREATE INDEX `journey_enquiries_ip_created_idx` ON `journey_enquiries` (`ip_hash`,`created_at`);