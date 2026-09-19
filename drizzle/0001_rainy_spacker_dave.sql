CREATE INDEX `idx_chemical_batches_expires_at` ON `chemical_batches` (`expires_at`);--> statement-breakpoint
CREATE INDEX `idx_cleaning_records_ipc_status` ON `cleaning_records` (`ipc_status`);--> statement-breakpoint
CREATE INDEX `idx_cleaning_records_cleaned_at` ON `cleaning_records` (`cleaned_at`);