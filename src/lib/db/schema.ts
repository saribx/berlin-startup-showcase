import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  type AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

// ─────────────────────────────────────────────────────────────────────────────
// Berlin Venture 50 schema — the single serialization point for all backend tracks.
// Frozen after the spine: tracks import tables/types from here but never edit it.
// A new column = a tiny spine-amendment everyone rebases on.
//
// Timestamps are unix epoch seconds: integer column defaulting to (unixepoch()).
// ─────────────────────────────────────────────────────────────────────────────

/** Funding cycles. Exactly one row is `isActive` (the live 2026 vote). */
export const cycles = sqliteTable("cycles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull().unique(),
  title: text("title").notNull(),
  status: text("status", { enum: ["voting", "completed"] }).notNull(),
  poolEur: integer("pool_eur").notNull(),
  startsAt: integer("starts_at"),
  endsAt: integer("ends_at"),
  /** The "50 votes per person" rule lives here, per cycle. */
  voteBudget: integer("vote_budget").notNull().default(50),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),
});

/** The 100 startups (ids 1..100, matching src/data/startups.ts exactly). */
export const startups = sqliteTable("startups", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(),
  emoji: text("emoji").notNull(),
  domain: text("domain"),
  /** Headline baseline (e.g. Helsing 490970); displayVotes = seedVotes + COUNT(votes). */
  seedVotes: integer("seed_votes").notNull().default(0),
  // Authored detail (ids 1..3 today); ids without these are derived in code.
  description: text("description"),
  founded: text("founded"),
  team: integer("team"),
  funding: text("funding"),
  users: text("users"),
  website: text("website"),
  heroImage: text("hero_image"),
  imagesJson: text("images_json"), // JSON: {color,label}[]
  metricsJson: text("metrics_json"), // JSON: {label,value}[]
  chartJson: text("chart_json"), // JSON: {title,unit,points:{label,value}[]}
});

/** Pseudonymous citizens (no PII). id = "cit_" + hex. */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  displayName: text("display_name").notNull(),
  /** false = anonymous voting session; true = the visitor signed in with a name. */
  claimed: integer("claimed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Server sessions. `id` is the opaque token stored in the httpOnly cookie. */
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  expiresAt: integer("expires_at").notNull(),
});

/**
 * Votes. UNIQUE(user,startup,cycle) makes a vote idempotent (no double count);
 * the per-cycle budget of 50 is enforced in the toggleVote handler's transaction.
 */
export const votes = sqliteTable(
  "votes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    startupId: integer("startup_id")
      .notNull()
      .references(() => startups.id),
    cycleId: integer("cycle_id")
      .notNull()
      .references(() => cycles.id),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("uniq_vote_user_startup_cycle").on(t.userId, t.startupId, t.cycleId)],
);

/** Threaded comments. parent_id self-FK = a reply; null = top-level. */
export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(),
    startupId: integer("startup_id")
      .notNull()
      .references(() => startups.id),
    parentId: text("parent_id").references((): AnySQLiteColumn => comments.id, {
      onDelete: "cascade",
    }),
    userId: text("user_id").references(() => users.id), // null for seeded/system comments
    // Denormalized author display (seed data carries rich author metadata).
    author: text("author").notNull(),
    username: text("username").notNull(),
    role: text("role"),
    company: text("company"),
    initials: text("initials").notNull(),
    avatarGradient: text("avatar_gradient").notNull(),
    verified: integer("verified", { mode: "boolean" }).notNull().default(false),
    maker: integer("maker", { mode: "boolean" }).notNull().default(false),
    body: text("body").notNull(),
    seedUpvotes: integer("seed_upvotes").notNull().default(0),
    timeLabel: text("time_label"), // preserves seed "2d ago"; new ones use createdAt
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_comments_startup").on(t.startupId),
    index("idx_comments_parent").on(t.parentId),
  ],
);

/** One upvote per person per comment. */
export const commentVotes = sqliteTable(
  "comment_votes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    commentId: text("comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("uniq_comment_vote").on(t.commentId, t.userId)],
);

/**
 * Citizen co-investment deposits — capital a signed-in citizen adds into the
 * cycle's fund. The ledger is the source of truth (no denormalized balance):
 * principal = SUM(amount_eur); returns are computed in fund.server.ts from the
 * funded cohort. Whole EUR, like cycles.pool_eur. createdAt drives time-accrual.
 */
export const deposits = sqliteTable(
  "deposits",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cycleId: integer("cycle_id")
      .notNull()
      .references(() => cycles.id),
    amountEur: integer("amount_eur").notNull(),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index("idx_deposits_user").on(t.userId)],
);

// Inferred types for use across server modules.
export type Cycle = typeof cycles.$inferSelect;
export type StartupRow = typeof startups.$inferSelect;
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Vote = typeof votes.$inferSelect;
export type CommentRow = typeof comments.$inferSelect;
export type CommentVote = typeof commentVotes.$inferSelect;
export type Deposit = typeof deposits.$inferSelect;
