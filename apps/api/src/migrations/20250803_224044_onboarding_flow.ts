import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`onboarding_form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`personalized_a_i_notifications_permission\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`onboarding_form_submissions_user_idx\` ON \`onboarding_form_submissions\` (\`user_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_updated_at_idx\` ON \`onboarding_form_submissions\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_created_at_idx\` ON \`onboarding_form_submissions\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`onboarding_form_submissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`onboarding_step_values_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`onboarding_form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`onboarding_step_values_id\`) REFERENCES \`onboarding_step_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_rels_order_idx\` ON \`onboarding_form_submissions_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_rels_parent_idx\` ON \`onboarding_form_submissions_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_rels_path_idx\` ON \`onboarding_form_submissions_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`onboarding_form_submissions_rels_onboarding_step_values_id_idx\` ON \`onboarding_form_submissions_rels\` (\`onboarding_step_values_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`onboarding_step_values\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`step\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`onboarding_step_values_updated_at_idx\` ON \`onboarding_step_values\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`onboarding_step_values_created_at_idx\` ON \`onboarding_step_values\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`onboarding_step_values_locales\` (
  	\`value\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`onboarding_step_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`onboarding_step_values_locales_locale_parent_id_unique\` ON \`onboarding_step_values_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`onboarding\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`steps_user_goals_type\` text NOT NULL,
  	\`steps_initial_emotional_state_type\` text NOT NULL,
  	\`steps_wanted_features_type\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`onboarding_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`onboarding_step_values_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`onboarding\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`onboarding_step_values_id\`) REFERENCES \`onboarding_step_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`onboarding_rels_order_idx\` ON \`onboarding_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`onboarding_rels_parent_idx\` ON \`onboarding_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`onboarding_rels_path_idx\` ON \`onboarding_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`onboarding_rels_onboarding_step_values_id_idx\` ON \`onboarding_rels\` (\`onboarding_step_values_id\`);`,
  )
  await db.run(sql`DROP TABLE \`app_usage_goals\`;`)
  await db.run(sql`DROP TABLE \`app_usage_goals_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
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
  await db.run(sql`PRAGMA foreign_keys=ON;`)
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
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`features_mood_tracker\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`app_usage_goals\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`app_usage_goals_updated_at_idx\` ON \`app_usage_goals\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`app_usage_goals_created_at_idx\` ON \`app_usage_goals\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`app_usage_goals_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`app_usage_goals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`app_usage_goals_locales_locale_parent_id_unique\` ON \`app_usage_goals_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`DROP TABLE \`onboarding_form_submissions\`;`)
  await db.run(sql`DROP TABLE \`onboarding_form_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`onboarding_step_values\`;`)
  await db.run(sql`DROP TABLE \`onboarding_step_values_locales\`;`)
  await db.run(sql`DROP TABLE \`onboarding\`;`)
  await db.run(sql`DROP TABLE \`onboarding_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`journals_id\` integer,
  	\`app_usage_goals_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journals_id\`) REFERENCES \`journals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`app_usage_goals_id\`) REFERENCES \`app_usage_goals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "journals_id", "app_usage_goals_id", "users_id") SELECT "id", "order", "parent_id", "path", "journals_id", "app_usage_goals_id", "users_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_journals_id_idx\` ON \`payload_locked_documents_rels\` (\`journals_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_app_usage_goals_id_idx\` ON \`payload_locked_documents_rels\` (\`app_usage_goals_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`users\` ADD \`features_mood_tracker\` integer;`)
}
