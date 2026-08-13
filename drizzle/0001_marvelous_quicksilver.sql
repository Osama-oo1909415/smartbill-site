ALTER TABLE `waitlist_entries` ADD `unsubscribe_token` text;--> statement-breakpoint
ALTER TABLE `waitlist_entries` ADD `unsubscribed_at` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_waitlist_entries_unsubscribe_token` ON `waitlist_entries` (`unsubscribe_token`);