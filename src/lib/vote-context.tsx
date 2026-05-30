import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { toast } from "sonner";

import { getVoteState, toggleVote as toggleVoteFn } from "./votes.server";

// Track A — Voting. Server-backed (votes.server.ts) via react-query with
// optimistic updates and the 3-vote budget. The hook surface matches the spine
// stub so index.tsx / startup.$id.tsx are untouched.

type VoteState = {
  votedIds: number[];
  counts: Record<number, number>;
  budgetUsed: number;
  budgetRemaining: number;
  budgetTotal: number;
};

const BUDGET_TOTAL = 3;
const EMPTY: VoteState = {
  votedIds: [],
  counts: {},
  budgetUsed: 0,
  budgetRemaining: BUDGET_TOTAL,
  budgetTotal: BUDGET_TOTAL,
};
const VOTE_STATE_KEY = ["voteState"] as const;

type VoteContextValue = {
  votedIds: Set<number>;
  hasVoted: (id: number) => boolean;
  toggleVote: (id: number) => void;
  voteCount: (id: number, seedVotes: number) => number;
  budgetTotal: number;
  budgetUsed: number;
  budgetRemaining: number;
};

const VoteContext = createContext<VoteContextValue | null>(null);

export function VoteProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: VOTE_STATE_KEY,
    queryFn: () => getVoteState(),
  });
  const state = data ?? EMPTY;

  const mutation = useMutation({
    mutationFn: (startupId: number) => toggleVoteFn({ data: { startupId } }),
    onMutate: async (startupId) => {
      await qc.cancelQueries({ queryKey: VOTE_STATE_KEY });
      const prev = qc.getQueryData<VoteState>(VOTE_STATE_KEY) ?? EMPTY;
      const isVoted = prev.votedIds.includes(startupId);
      const delta = isVoted ? -1 : 1;
      const next: VoteState = {
        ...prev,
        votedIds: isVoted
          ? prev.votedIds.filter((id) => id !== startupId)
          : [...prev.votedIds, startupId],
        counts: {
          ...prev.counts,
          [startupId]: (prev.counts[startupId] ?? 0) + delta,
        },
        budgetUsed: prev.budgetUsed + delta,
        budgetRemaining: Math.max(0, prev.budgetRemaining - delta),
      };
      qc.setQueryData(VOTE_STATE_KEY, next);
      return { prev };
    },
    onError: (err, _startupId, ctx) => {
      if (ctx?.prev) qc.setQueryData(VOTE_STATE_KEY, ctx.prev);
      const msg = String((err as Error)?.message ?? "");
      if (msg.includes("BUDGET_EXCEEDED")) {
        toast.error("You've used all 3 votes", {
          description: "Remove a vote to back a different startup.",
        });
      } else if (msg.includes("VOTING_CLOSED")) {
        toast.error("Voting has closed for this cycle.");
      } else {
        toast.error("Could not record your vote", { description: "Please try again." });
      }
    },
    onSuccess: (res, startupId) => {
      qc.setQueryData<VoteState>(VOTE_STATE_KEY, (prev) => {
        const base = prev ?? EMPTY;
        const set = new Set(base.votedIds);
        if (res.voted) set.add(startupId);
        else set.delete(startupId);
        return {
          ...base,
          votedIds: [...set],
          counts: { ...base.counts, [startupId]: res.displayVotes },
          budgetUsed: res.budgetUsed,
          budgetRemaining: res.budgetRemaining,
          budgetTotal: res.budgetTotal,
        };
      });
    },
  });

  const value = useMemo<VoteContextValue>(() => {
    const votedIds = new Set(state.votedIds);
    return {
      votedIds,
      hasVoted: (id) => votedIds.has(id),
      toggleVote: (id) => {
        if (!votedIds.has(id) && state.budgetRemaining <= 0) {
          toast.error("You've used all 3 votes", {
            description: "Remove a vote to back a different startup.",
          });
          return;
        }
        mutation.mutate(id);
      },
      voteCount: (id, seedVotes) => state.counts[id] ?? seedVotes,
      budgetTotal: state.budgetTotal,
      budgetUsed: state.budgetUsed,
      budgetRemaining: state.budgetRemaining,
    };
  }, [state, mutation]);

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVotes must be used within VoteProvider");
  return ctx;
}
