import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`language\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_journals\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`user_id\` integer,
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
  await db.run(sql`ALTER TABLE \`users\` ADD \`language\` text DEFAULT 'en';`)
}
