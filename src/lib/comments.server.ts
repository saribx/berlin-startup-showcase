import { randomBytes } from "node:crypto";

import { createServerFn } from "@tanstack/react-start";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "./db.server";
import { commentVotes, comments } from "./db/schema";
import { getSession, requireUser } from "./session.server";

// Track B — Comments. Persistent threaded discussion backed by the comments +
// comment_votes tables. displayUpvotes = seed_upvotes + COUNT(comment_votes).

export type CommentDTO = {
  id: string;
  author: string;
  username: string;
  role: string | null;
  company: string | null;
  initials: string;
  avatarGradient: string;
  verified: boolean;
  maker: boolean;
  time: string;
  body: string;
  upvotes: number;
  votedByMe: boolean;
  replies: CommentDTO[];
};

const hex = (n: number) => randomBytes(n).toString("hex");
const nowSec = () => Math.floor(Date.now() / 1000);

function relTime(createdAtSec: number): string {
  const diff = nowSec() - createdAtSec;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function initialsOf(name: string) {
  const i = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return i || "YO";
}

/** Full nested tree for a startup, with per-comment displayUpvotes + votedByMe. */
export const listComments = createServerFn({ method: "GET" })
  .inputValidator(z.object({ startupId: z.number().int() }))
  .handler(async ({ data }): Promise<CommentDTO[]> => {
    const db = getDb();
    const session = getSession();

    const rows = db.select().from(comments).where(eq(comments.startupId, data.startupId)).all();

    const counts = db
      .select({ cid: commentVotes.commentId, n: sql<number>`count(*)` })
      .from(commentVotes)
      .innerJoin(comments, eq(commentVotes.commentId, comments.id))
      .where(eq(comments.startupId, data.startupId))
      .groupBy(commentVotes.commentId)
      .all();
    const countMap = new Map(counts.map((c) => [c.cid, Number(c.n)]));

    let mine = new Set<string>();
    if (session) {
      const mv = db
        .select({ cid: commentVotes.commentId })
        .from(commentVotes)
        .innerJoin(comments, eq(commentVotes.commentId, comments.id))
        .where(
          and(eq(comments.startupId, data.startupId), eq(commentVotes.userId, session.user.id)),
        )
        .all();
      mine = new Set(mv.map((m) => m.cid));
    }

    const dto = new Map<string, CommentDTO>();
    const createdAt = new Map<string, number>();
    for (const r of rows) {
      createdAt.set(r.id, r.createdAt);
      dto.set(r.id, {
        id: r.id,
        author: r.author,
        username: r.username,
        role: r.role,
        company: r.company,
        initials: r.initials,
        avatarGradient: r.avatarGradient,
        verified: r.verified,
        maker: r.maker,
        time: r.timeLabel ?? relTime(r.createdAt),
        body: r.body,
        upvotes: r.seedUpvotes + (countMap.get(r.id) ?? 0),
        votedByMe: mine.has(r.id),
        replies: [],
      });
    }

    // Assemble the tree; replies stay in insertion (chronological) order.
    const roots: CommentDTO[] = [];
    for (const r of rows) {
      const node = dto.get(r.id)!;
      const parent = r.parentId ? dto.get(r.parentId) : undefined;
      if (parent) parent.replies.push(node);
      else roots.push(node);
    }
    // Newest root comments first (stable — seeds keep their authored order).
    roots.sort((a, b) => (createdAt.get(b.id) ?? 0) - (createdAt.get(a.id) ?? 0));
    return roots;
  });

/** Add a top-level comment (parentId null) or a reply. Mints a citizen on first use. */
export const addComment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      startupId: z.number().int(),
      parentId: z.string().nullish(),
      body: z.string().min(1).max(2000),
    }),
  )
  .handler(async ({ data }): Promise<CommentDTO> => {
    const db = getDb();
    const user = requireUser();
    const id = `cmt_${hex(8)}`;
    const username = user.displayName.toLowerCase().replace(/\s+/g, "_");

    db.insert(comments)
      .values({
        id,
        startupId: data.startupId,
        parentId: data.parentId ?? null,
        userId: user.id,
        author: user.displayName,
        username,
        role: "Citizen",
        company: null,
        initials: initialsOf(user.displayName),
        avatarGradient: "from-primary to-rose-600",
        verified: false,
        maker: false,
        body: data.body,
        seedUpvotes: 0,
        timeLabel: null,
      })
      .run();

    return {
      id,
      author: user.displayName,
      username,
      role: "Citizen",
      company: null,
      initials: initialsOf(user.displayName),
      avatarGradient: "from-primary to-rose-600",
      verified: false,
      maker: false,
      time: "just now",
      body: data.body,
      upvotes: 0,
      votedByMe: false,
      replies: [],
    };
  });

/** Toggle this browser's upvote on a comment. Returns the new authoritative count. */
export const toggleCommentVote = createServerFn({ method: "POST" })
  .inputValidator(z.object({ commentId: z.string() }))
  .handler(async ({ data }) => {
    const db = getDb();
    const user = requireUser();

    const existing = db
      .select({ id: commentVotes.id })
      .from(commentVotes)
      .where(and(eq(commentVotes.commentId, data.commentId), eq(commentVotes.userId, user.id)))
      .get();

    let voted: boolean;
    if (existing) {
      db.delete(commentVotes).where(eq(commentVotes.id, existing.id)).run();
      voted = false;
    } else {
      db.insert(commentVotes).values({ commentId: data.commentId, userId: user.id }).run();
      voted = true;
    }

    const seed = db
      .select({ s: comments.seedUpvotes })
      .from(comments)
      .where(eq(comments.id, data.commentId))
      .get();
    const cnt = db
      .select({ n: sql<number>`count(*)` })
      .from(commentVotes)
      .where(eq(commentVotes.commentId, data.commentId))
      .get();

    return { voted, displayUpvotes: (seed?.s ?? 0) + (Number(cnt?.n) || 0) };
  });
