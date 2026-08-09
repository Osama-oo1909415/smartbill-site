import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const waitlistEntries = sqliteTable(
  "waitlist_entries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    language: text("language", { enum: ["ar", "en"] }).notNull().default("ar"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  },
  (table) => [uniqueIndex("idx_waitlist_entries_email").on(table.email)],
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

/** Anonymous referral links. No account, email, amount, or card contents are stored. */
export const inviteCodes = sqliteTable("invite_codes", {
  code: text("code").primaryKey(),
  language: text("language", { enum: ["ar", "en"] }).notNull().default("ar"),
  campaign: text("campaign", { enum: ["month_card", "beta_invite"] }).notNull().default("month_card"),
  clickCount: integer("click_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
