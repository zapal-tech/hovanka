import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tags_locales\` (
  	\`tag\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`tags_locales_locale_parent_id_unique\` ON \`tags_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`articles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_rels_order_idx\` ON \`articles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_parent_idx\` ON \`articles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_path_idx\` ON \`articles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_tags_id_idx\` ON \`articles_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`practices_steps_blocks_radio_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices_steps_blocks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`practices_steps_blocks_radio_options_order_idx\` ON \`practices_steps_blocks_radio_options\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`practices_steps_blocks_radio_options_parent_id_idx\` ON \`practices_steps_blocks_radio_options\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`practices_steps_blocks_radio_options_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices_steps_blocks_radio_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`practices_steps_blocks_radio_options_locales_locale_parent_id_unique\` ON \`practices_steps_blocks_radio_options_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`practices_steps_blocks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'text' NOT NULL,
  	\`text_size\` text DEFAULT 'base',
  	\`checkbox_size\` text DEFAULT 'base',
  	\`radio_size_text\` text DEFAULT 'base',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`practices_steps_blocks_order_idx\` ON \`practices_steps_blocks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`practices_steps_blocks_parent_id_idx\` ON \`practices_steps_blocks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`practices_steps_blocks_locales\` (
  	\`text_content\` text,
  	\`textarea_content\` text,
  	\`checkbox_text\` text,
  	\`radio_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices_steps_blocks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`practices_steps_blocks_locales_locale_parent_id_unique\` ON \`practices_steps_blocks_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`practices_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`practices_steps_order_idx\` ON \`practices_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`practices_steps_parent_id_idx\` ON \`practices_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`practices\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`practices_updated_at_idx\` ON \`practices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`practices_created_at_idx\` ON \`practices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`practices_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`practices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`practices_locales_locale_parent_id_unique\` ON \`practices_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`emotions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`emotion\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`emotions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`emotions_parent_idx\` ON \`emotions\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`emotions_updated_at_idx\` ON \`emotions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`emotions_created_at_idx\` ON \`emotions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`emotions_statistics_statistics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`emotion\` text NOT NULL,
  	\`count\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`emotions_statistics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`emotions_statistics_statistics_order_idx\` ON \`emotions_statistics_statistics\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`emotions_statistics_statistics_parent_id_idx\` ON \`emotions_statistics_statistics\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`emotions_statistics\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`emotions_statistics_user_idx\` ON \`emotions_statistics\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`emotions_statistics_updated_at_idx\` ON \`emotions_statistics\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`emotions_statistics_created_at_idx\` ON \`emotions_statistics\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`journals\` ADD \`emotions_id\` integer REFERENCES emotions(id);`)
  await db.run(sql`CREATE INDEX \`journals_emotions_idx\` ON \`journals\` (\`emotions_id\`);`)
  await db.run(sql`ALTER TABLE \`journals\` DROP COLUMN \`mood\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tags_id\` integer REFERENCES tags(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`articles_id\` integer REFERENCES articles(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`practices_id\` integer REFERENCES practices(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`emotions_id\` integer REFERENCES emotions(id);`)
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`emotions_statistics_id\` integer REFERENCES emotions_statistics(id);`,
  )
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`payload_jobs_id\` integer REFERENCES payload_jobs(id);`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_practices_id_idx\` ON \`payload_locked_documents_rels\` (\`practices_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_emotions_id_idx\` ON \`payload_locked_documents_rels\` (\`emotions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_emotions_statistics_id_idx\` ON \`payload_locked_documents_rels\` (\`emotions_statistics_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_payload_jobs_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_jobs_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`tags_locales\`;`)
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`articles_rels\`;`)
  await db.run(sql`DROP TABLE \`practices_steps_blocks_radio_options\`;`)
  await db.run(sql`DROP TABLE \`practices_steps_blocks_radio_options_locales\`;`)
  await db.run(sql`DROP TABLE \`practices_steps_blocks\`;`)
  await db.run(sql`DROP TABLE \`practices_steps_blocks_locales\`;`)
  await db.run(sql`DROP TABLE \`practices_steps\`;`)
  await db.run(sql`DROP TABLE \`practices\`;`)
  await db.run(sql`DROP TABLE \`practices_locales\`;`)
  await db.run(sql`DROP TABLE \`emotions\`;`)
  await db.run(sql`DROP TABLE \`emotions_statistics_statistics\`;`)
  await db.run(sql`DROP TABLE \`emotions_statistics\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_journals\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`user_id\` integer NOT NULL,
  	\`type\` text,
  	\`mood\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_journals\`("id", "title", "content", "user_id", "type", "mood", "updated_at", "created_at") SELECT "id", "title", "content", "user_id", "type", "mood", "updated_at", "created_at" FROM \`journals\`;`,
  )
  await db.run(sql`DROP TABLE \`journals\`;`)
  await db.run(sql`ALTER TABLE \`__new_journals\` RENAME TO \`journals\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`journals_user_idx\` ON \`journals\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`journals_updated_at_idx\` ON \`journals\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`journals_created_at_idx\` ON \`journals\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`journals_id\` integer,
  	\`onboarding_form_submissions_id\` integer,
  	\`onboarding_step_values_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journals_id\`) REFERENCES \`journals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`onboarding_form_submissions_id\`) REFERENCES \`onboarding_form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`onboarding_step_values_id\`) REFERENCES \`onboarding_step_values\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "journals_id", "onboarding_form_submissions_id", "onboarding_step_values_id", "users_id") SELECT "id", "order", "parent_id", "path", "journals_id", "onboarding_form_submissions_id", "onboarding_step_values_id", "users_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_journals_id_idx\` ON \`payload_locked_documents_rels\` (\`journals_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_onboarding_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`onboarding_form_submissions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_onboarding_step_values_id_idx\` ON \`payload_locked_documents_rels\` (\`onboarding_step_values_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
}
