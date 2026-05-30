import { performance } from "node:perf_hooks";
import process from "node:process";

import { startups as seedStartups, startupDetails, type Comment } from "../../data/startups";
import { getDb } from "../db.server";
import { comments, commentVotes, cycles, sessions, startups, users, votes } from "./schema";

// Seed the local SQLite DB from the static source data (the single source of
// truth). Idempotent: skips if already seeded unless run with `--reset`.
//   Run: DATABASE_URL=file:./data/app.db tsx src/lib/db/seed.ts [--reset]

const reset = process.argv.includes("--reset");
const nowSec = Math.floor(Date.now() / 1000);
const VOTE_WINDOW_SEC = (3 * 24 + 12) * 60 * 60; // mirrors the countdown badge

type CommentInsert = typeof comments.$inferInsert;

function flatten(
  startupId: number,
  list: Comment[],
  parentId: string | null,
  out: CommentInsert[],
) {
  for (const c of list) {
    out.push({
      id: c.id,
      startupId,
      parentId,
      userId: null,
      author: c.author,
      username: c.username,
      role: c.role ?? null,
      company: c.company ?? null,
      initials: c.initials,
      avatarGradient: c.avatarGradient,
      verified: c.verified ?? false,
      maker: c.maker ?? false,
      body: c.body,
      seedUpvotes: c.upvotes,
      timeLabel: c.time,
    });
    if (c.replies?.length) flatten(startupId, c.replies, c.id, out);
  }
}

function main() {
  const t0 = performance.now();
  const db = getDb();

  const already = db.select({ id: startups.id }).from(startups).limit(1).all();
  if (already.length && !reset) {
    console.log("Seed skipped — DB already populated (use --reset to wipe & reseed).");
    return;
  }

  if (reset) {
    console.log("[reset] wiping all tables…");
    // FK-safe delete order (children first).
    db.delete(commentVotes).run();
    db.delete(votes).run();
    db.delete(comments).run();
    db.delete(sessions).run();
    db.delete(users).run();
    db.delete(startups).run();
    db.delete(cycles).run();
  }

  console.log(`[1/3] cycles…`);
  db.insert(cycles)
    .values({
      year: 2026,
      title: "Funding cycle 2026",
      status: "voting",
      poolEur: 200_000_000,
      voteBudget: 3,
      isActive: true,
      startsAt: nowSec,
      endsAt: nowSec + VOTE_WINDOW_SEC,
    })
    .run();

  console.log(`[2/3] ${seedStartups.length} startups…`);
  const startupRows: (typeof startups.$inferInsert)[] = seedStartups.map((s) => {
    const d = startupDetails[s.id];
    return {
      id: s.id,
      name: s.name,
      tagline: s.tagline,
      category: s.category,
      emoji: s.emoji,
      domain: s.domain ?? null,
      seedVotes: s.votes,
      description: d?.description ?? null,
      founded: d?.founded ?? null,
      team: d?.team ?? null,
      funding: d?.funding ?? null,
      users: d?.users ?? null,
      website: d?.website ?? null,
      heroImage: d?.heroImage ?? null,
      imagesJson: d ? JSON.stringify(d.images) : null,
      metricsJson: d ? JSON.stringify(d.metrics) : null,
      chartJson: d?.chart ? JSON.stringify(d.chart) : null,
    };
  });

  const commentRows: CommentInsert[] = [];
  for (const s of seedStartups) {
    const d = startupDetails[s.id];
    if (d?.comments?.length) flatten(s.id, d.comments, null, commentRows);
  }

  db.transaction((tx) => {
    for (const r of startupRows) tx.insert(startups).values(r).run();
    for (const r of commentRows) tx.insert(comments).values(r).run();
  });
  console.log(`[3/3] ${commentRows.length} comments (incl. nested replies)…`);

  const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
  console.log(
    `Done: 1 cycle, ${startupRows.length} startups, ${commentRows.length} comments in ${elapsed}s.`,
  );
}

main();
