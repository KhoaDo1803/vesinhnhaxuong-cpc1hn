CREATE TABLE `chemical_batches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chemical_name` text NOT NULL,
	`batch_code` text NOT NULL,
	`prepared_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`status` text DEFAULT 'Được phép sử dụng' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chemical_batches_batch_code_unique` ON `chemical_batches` (`batch_code`);--> statement-breakpoint
CREATE TABLE `cleaning_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`area` text NOT NULL,
	`line` text NOT NULL,
	`chemical` text NOT NULL,
	`operator` text NOT NULL,
	`result` text DEFAULT 'Đạt' NOT NULL,
	`ipc_status` text DEFAULT 'Chờ đối chiếu' NOT NULL,
	`cleaned_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
