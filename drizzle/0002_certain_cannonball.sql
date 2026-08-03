ALTER TABLE `journey_enquiries` ADD `deleted_at` text;--> statement-breakpoint
CREATE INDEX `journey_enquiries_deleted_idx` ON `journey_enquiries` (`deleted_at`);--> statement-breakpoint
PRAGMA optimize;
