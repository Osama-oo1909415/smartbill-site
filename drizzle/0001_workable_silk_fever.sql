CREATE TABLE `invite_codes` (
	`code` text PRIMARY KEY NOT NULL,
	`language` text DEFAULT 'ar' NOT NULL,
	`campaign` text DEFAULT 'month_card' NOT NULL,
	`click_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
