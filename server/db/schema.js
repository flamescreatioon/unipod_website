import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    interest: varchar("interest", { length: 80 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("contact_messages_created_at_idx").on(table.createdAt)],
);

export const cmsEntries = pgTable(
  "cms_entries",
  {
    id: serial("id").primaryKey(),
    contentType: varchar("content_type", { length: 40 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),
    summary: text("summary").notNull().default(""),
    body: text("body").notNull().default(""),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("cms_entries_type_status_idx").on(table.contentType, table.status),
  ],
);
