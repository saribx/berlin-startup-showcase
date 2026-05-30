import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { startups } from "@/data/startups";

// Frozen contract for Track A (Voting). SPINE STUB: returns static data, no DB
// or session. Track A replaces the handler bodies with Drizzle queries +
// requireUser() + the transaction-guarded 3-vote budget, and points
// vote-context.tsx at these.

const BUDGET_TOTAL = 3;

export const getVoteState = createServerFn({ method: "GET" }).handler(async () => {
  const counts: Record<number, number> = {};
  for (const s of startups) counts[s.id] = s.votes;
  return {
    votedIds: [] as number[],
    counts,
    budgetUsed: 0,
    budgetRemaining: BUDGET_TOTAL,
    budgetTotal: BUDGET_TOTAL,
  };
});

export const toggleVote = createServerFn({ method: "POST" })
  .inputValidator(z.object({ startupId: z.number().int() }))
  .handler(async ({ data }) => {
    const s = startups.find((x) => x.id === data.startupId);
    return {
      voted: true,
      displayVotes: (s?.votes ?? 0) + 1,
      budgetUsed: 1,
      budgetRemaining: BUDGET_TOTAL - 1,
      budgetTotal: BUDGET_TOTAL,
    };
  });
