import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "./db.server";
import { cycles, deposits, startups, votes } from "./db/schema";
import { getSession, requireUser } from "./session.server";

// Track D — Fund / citizen co-investment. Berliners add their own capital into
// the cycle's fund and share in its (simulated) performance, pro-rata.
//
// Three roles stay separated, on purpose:
//   • Votes decide ONLY the top-50 membership (the funded cohort).
//   • The FUND sizes each startup's ticket out of the pool — decoupled from
//     votes (a deterministic per-id "fund manager" distribution).
//   • The MARKET (simulated, per-id) decides each startup's return.
// The citizen's return = their contribution × the fund's allocation-weighted
// blended rate, accruing from each deposit's timestamp.
//
// Every rate/share below is a RATIO (0.12 = +12%); the client formats to %.

const COHORT_SIZE = 50; // "Top 50 receive capital" (how-it-works phase 04)
const HOLDINGS_SHOWN = 8;
const STARTING_BALANCE_EUR = 100; // welcome credit every citizen starts with
const SALT_TICKET = 0x9e3779b1; // fund sizing
const SALT_RATE = 0x85ebca6b; // market return

function activeCycle() {
  const cycle = getDb().select().from(cycles).where(eq(cycles.isActive, true)).get();
  if (!cycle) throw new Error("NO_ACTIVE_CYCLE");
  return cycle;
}

/** Deterministic hash → [0,1). Stable per (n, salt), so funding/returns never drift. */
function hash01(n: number, salt: number): number {
  let x = (Math.imul(n ^ salt, 2654435761) >>> 0) ^ salt;
  x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 3266489917) >>> 0;
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type CohortMember = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  domain: string | null;
  fw: number; // fund-sizing weight (per id, not votes)
  rate: number; // simulated annual return ratio (per id, not votes)
};

/**
 * Build the funded cohort and the fund's blended (allocation-weighted) rate.
 * Votes are used ONLY to pick the top-50 membership; after that they're gone.
 */
function fundModel() {
  const db = getDb();
  const cycle = activeCycle();

  const seeds = db
    .select({
      id: startups.id,
      name: startups.name,
      emoji: startups.emoji,
      category: startups.category,
      domain: startups.domain,
      seed: startups.seedVotes,
    })
    .from(startups)
    .all();
  const tallies = db
    .select({ startupId: votes.startupId, n: sql<number>`count(*)` })
    .from(votes)
    .where(eq(votes.cycleId, cycle.id))
    .groupBy(votes.startupId)
    .all();
  const tally = new Map(tallies.map((t) => [t.startupId, Number(t.n)]));

  // Membership: top 50 by live votes (seed + real). Votes used nowhere else.
  const cohort: CohortMember[] = seeds
    .map((s) => ({ ...s, votes: s.seed + (tally.get(s.id) ?? 0) }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, COHORT_SIZE)
    .map((s) => ({
      id: s.id,
      name: s.name,
      emoji: s.emoji,
      category: s.category,
      domain: s.domain,
      fw: 0.5 + hash01(s.id, SALT_TICKET), // [0.5, 1.5)
      rate: clamp(0.08 + (hash01(s.id, SALT_RATE) * 0.52 - 0.2), -0.15, 0.45),
    }));

  const sumFw = cohort.reduce((a, m) => a + m.fw, 0) || 1;
  const blendedRate = cohort.reduce((a, m) => a + (m.fw / sumFw) * m.rate, 0);

  return { cycle, cohort, sumFw, blendedRate, pool: cycle.poolEur };
}

/** Read-only portfolio snapshot for the current session user (empty if none). Never mints. */
export const getPortfolio = createServerFn({ method: "GET" }).handler(async () => {
  const db = getDb();
  const { cycle, cohort, sumFw, blendedRate, pool } = fundModel();

  // Top funded startups (the fund's biggest bets) for the breakdown.
  const holdings = [...cohort]
    .sort((a, b) => b.fw - a.fw)
    .slice(0, HOLDINGS_SHOWN)
    .map((m) => {
      const share = m.fw / sumFw;
      return {
        id: m.id,
        name: m.name,
        emoji: m.emoji,
        category: m.category,
        domain: m.domain,
        ticketEur: Math.round(pool * share),
        share, // ratio of the fund
        rate: m.rate, // simulated annual ratio
      };
    });

  const session = getSession();
  const rows = session
    ? db
        .select({ id: deposits.id, amountEur: deposits.amountEur, createdAt: deposits.createdAt })
        .from(deposits)
        .where(and(eq(deposits.userId, session.user.id), eq(deposits.cycleId, cycle.id)))
        .orderBy(asc(deposits.createdAt))
        .all()
    : [];

  // Every citizen starts with a €100 welcome credit already in the fund; their
  // balance = that credit + any top-ups. No real elapsed market time exists, so
  // returns are reported as a forward, clearly-labeled 1-year PROJECTION at the
  // fund's blended rate.
  const depositedEur = rows.reduce((a, d) => a + d.amountEur, 0);
  const balanceEur = session ? STARTING_BALANCE_EUR + depositedEur : 0;
  const projectedValueEur = Math.round(balanceEur * (1 + blendedRate));
  const projectedReturnEur = projectedValueEur - balanceEur;

  // Decompose the projection across the fund's top holdings: yourStake = your
  // share of that startup's ticket; yourGain = stake × its rate. Summed over all
  // 50 these reconcile exactly to balance and projectedReturn.
  const holdingsOut = holdings.map((h) => ({
    ...h,
    yourStakeEur: Math.round(balanceEur * h.share),
    yourGainEur: Math.round(balanceEur * h.share * h.rate),
  }));

  // Forward 12-month projection curve (x = months ahead) for the chart.
  const series =
    balanceEur > 0
      ? Array.from({ length: 13 }, (_, m) => ({
          month: m,
          value: Math.round(balanceEur * (1 + blendedRate * (m / 12))),
          contributed: balanceEur,
        }))
      : [];

  // History = real deposits (newest first), then the welcome credit as the origin.
  const history = rows
    .map((d) => ({ id: d.id, amountEur: d.amountEur, createdAt: d.createdAt, welcome: false }))
    .reverse();
  if (session) {
    history.push({
      id: 0,
      amountEur: STARTING_BALANCE_EUR,
      createdAt: session.user.createdAt,
      welcome: true,
    });
  }

  return {
    signedIn: !!(session && session.user.claimed),
    poolEur: pool,
    fundedCount: cohort.length,
    blendedRate,
    horizonYears: 1,
    balanceEur,
    depositedEur,
    projectedValueEur,
    projectedReturnEur,
    holdings: holdingsOut,
    history,
    series,
  };
});

/** Add capital to the cycle fund. Mints a citizen on demand (vote-first parity). */
export const addDeposit = createServerFn({ method: "POST" })
  .inputValidator(z.object({ amountEur: z.number().int().min(1).max(1_000_000) }))
  .handler(async ({ data }) => {
    const db = getDb();
    const cycle = activeCycle();
    const user = requireUser();

    db.insert(deposits)
      .values({ userId: user.id, cycleId: cycle.id, amountEur: data.amountEur })
      .run();

    const total = db
      .select({ n: sql<number>`coalesce(sum(${deposits.amountEur}), 0)` })
      .from(deposits)
      .where(and(eq(deposits.userId, user.id), eq(deposits.cycleId, cycle.id)))
      .get();

    return { ok: true as const, contributedEur: Number(total?.n) || 0 };
  });
