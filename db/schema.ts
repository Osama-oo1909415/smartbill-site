import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const waitlistEntries = sqliteTable(
  "waitlist_entries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    language: text("language", { enum: ["ar", "en"] }).notNull().default("ar"),
    unsubscribeToken: text("unsubscribe_token"),
    unsubscribedAt: integer("unsubscribed_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  },
  (table) => [uniqueIndex("idx_waitlist_entries_email").on(table.email), uniqueIndex("idx_waitlist_entries_unsubscribe_token").on(table.unsubscribeToken)],
);

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  language: text("language", { enum: ["ar", "en"] }).notNull().default("ar"),
  status: text("status", { enum: ["new", "closed"] }).notNull().default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
