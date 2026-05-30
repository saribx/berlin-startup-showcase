CREATE TABLE `comment_votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`comment_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_comment_vote` ON `comment_votes` (`comment_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`startup_id` integer NOT NULL,
	`parent_id` text,
	`user_id` text,
	`author` text NOT NULL,
	`username` text NOT NULL,
	`role` text,
	`company` text,
	`initials` text NOT NULL,
	`avatar_gradient` text NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`maker` integer DEFAULT false NOT NULL,
	`body` text NOT NULL,
	`seed_upvotes` integer DEFAULT 0 NOT NULL,
	`time_label` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_comments_startup` ON `comments` (`startup_id`);--> statement-breakpoint
CREATE INDEX `idx_comments_parent` ON `comments` (`parent_id`);--> statement-breakpoint
CREATE TABLE `cycles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`title` text NOT NULL,
	`status` text NOT NULL,
	`pool_eur` integer NOT NULL,
	`starts_at` integer,
	`ends_at` integer,
	`vote_budget` integer DEFAULT 3 NOT NULL,
	`is_active` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cycles_year_unique` ON `cycles` (`year`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `startups` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tagline` text NOT NULL,
	`category` text NOT NULL,
	`emoji` text NOT NULL,
	`domain` text,
	`seed_votes` integer DEFAULT 0 NOT NULL,
	`description` text,
	`founded` text,
	`team` integer,
	`funding` text,
	`users` text,
	`website` text,
	`hero_image` text,
	`images_json` text,
	`metrics_json` text,
	`chart_json` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`startup_id` integer NOT NULL,
	`cycle_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cycle_id`) REFERENCES `cycles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_vote_user_startup_cycle` ON `votes` (`user_id`,`startup_id`,`cycle_id`);