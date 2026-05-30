import { createServerFn } from "@tanstack/react-start";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "./db.server";
import { cycles, startups, votes } from "./db/schema";
import { getSession, requireUser } from "./session.server";

// Track A — Voting. Server-enforced 50-vote budget (per the active cycle's
// vote_budget). displayVotes = startups.seed_votes + COUNT(real votes).

const nowSec = () => Math.floor(Date.now() / 1000);

function activeCycle() {
  const cycle = getDb().select().from(cycles).where(eq(cycles.isActive, true)).get();
  if (!cycle) throw new Error("NO_ACTIVE_CYCLE");
  return cycle;
}

/** Read-only snapshot: live counts for every startup + this visitor's votes/budget. Never mints. */
export const getVoteState = createServerFn({ method: "GET" }).handler(async () => {
  const db = getDb();
  const cycle = activeCycle();

  const seeds = db.select({ id: startups.id, seed: startups.seedVotes }).from(startups).all();
  const tallies = db
    .select({ startupId: votes.startupId, n: sql<number>`count(*)` })
    .from(votes)
    .where(eq(votes.cycleId, cycle.id))
    .groupBy(votes.startupId)
    .all();
  const tally = new Map(tallies.map((t) => [t.startupId, Number(t.n)]));

  const counts: Record<number, number> = {};
  for (const s of seeds) counts[s.id] = s.seed + (tally.get(s.id) ?? 0);

  // Read-only: the session is established server-side in __root's beforeLoad
  // (ensureSession), so the cookie already exists before this client call.
  const session = getSession();
  const votedIds = session
    ? db
        .select({ startupId: votes.startupId })
        .from(votes)
        .where(and(eq(votes.userId, session.user.id), eq(votes.cycleId, cycle.id)))
        .all()
        .map((r) => r.startupId)
    : [];

  const budgetTotal = cycle.voteBudget;
  const budgetUsed = votedIds.length;
  return {
    votedIds,
    counts,
    budgetUsed,
    budgetRemaining: Math.max(0, budgetTotal - budgetUsed),
    budgetTotal,
  };
});

/**
 * Cast or remove a vote. Mints a citizen on first use (vote-first). Enforces the
 * budget atomically: the count-check + insert run in one synchronous
 * transaction, so a concurrent 4th vote can't slip through.
 */
export const toggleVote = createServerFn({ method: "POST" })
  .inputValidator(z.object({ startupId: z.number().int() }))
  .handler(async ({ data }) => {
    const db = getDb();
    const cycle = activeCycle();
    if (cycle.endsAt && nowSec() > cycle.endsAt) throw new Error("VOTING_CLOSED");

    const user = requireUser();

    const voted = db.transaction((tx) => {
      const existing = tx
        .select({ id: votes.id })
        .from(votes)
        .where(
          and(
            eq(votes.userId, user.id),
            eq(votes.startupId, data.startupId),
            eq(votes.cycleId, cycle.id),
          ),
        )
        .get();

      if (existing) {
        tx.delete(votes).where(eq(votes.id, existing.id)).run();
        return false;
      }

      const used = tx
        .select({ n: sql<number>`count(*)` })
        .from(votes)
        .where(and(eq(votes.userId, user.id), eq(votes.cycleId, cycle.id)))
        .get();
      if ((Number(used?.n) || 0) >= cycle.voteBudget) throw new Error("BUDGET_EXCEEDED");

      tx.insert(votes)
        .values({ userId: user.id, startupId: data.startupId, cycleId: cycle.id })
        .run();
      return true;
    });

    const seed = db
      .select({ seed: startups.seedVotes })
      .from(startups)
      .where(eq(startups.id, data.startupId))
      .get();
    const realCount = db
      .select({ n: sql<number>`count(*)` })
      .from(votes)
      .where(and(eq(votes.startupId, data.startupId), eq(votes.cycleId, cycle.id)))
      .get();
    const usedRow = db
      .select({ n: sql<number>`count(*)` })
      .from(votes)
      .where(and(eq(votes.userId, user.id), eq(votes.cycleId, cycle.id)))
      .get();

    const budgetUsed = Number(usedRow?.n) || 0;
    return {
      voted,
      displayVotes: (seed?.seed ?? 0) + (Number(realCount?.n) || 0),
      budgetUsed,
      budgetRemaining: Math.max(0, cycle.voteBudget - budgetUsed),
      budgetTotal: cycle.voteBudget,
    };
  });
