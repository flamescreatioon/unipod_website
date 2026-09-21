import { index, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  interest: varchar('interest', { length: 80 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index('contact_messages_created_at_idx').on(table.createdAt)]);
