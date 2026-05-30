import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "./auth-context";

// Voting state + the 3-vote budget. SPINE STUB: keeps the current
// Set<number> + localStorage behavior so the app is unchanged, but already
// exposes budget fields so the "x/3" UI compiles. Track A swaps the internals
// to call votes.server.ts (getVoteState / toggleVote) with server-enforced
// budget + persistence — the hook surface stays fixed.

const BUDGET_TOTAL = 3;

type VoteContextValue = {
  votedIds: Set<number>;
  hasVoted: (id: number) => boolean;
  /** Toggle a vote. Spine: requires login (today's behavior). Returns whether a vote is now recorded. */
  toggleVote: (id: number) => boolean;
  /** Display count for a startup given its seed/base votes. */
  voteCount: (id: number, seedVotes: number) => number;
  budgetTotal: number;
  budgetUsed: number;
  budgetRemaining: number;
};

const VoteContext = createContext<VoteContextValue | null>(null);

const VOTES_KEY = "hs50:voted";

export function VoteProvider({ children }: { children: ReactNode }) {
  const { user, openLogin } = useAuth();
  const [votedIds, setVotedIds] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VOTES_KEY);
      if (raw) setVotedIds(new Set(JSON.parse(raw)));
    } catch {
      // ignore unavailable localStorage
    }
  }, []);

  const persist = (next: Set<number>) => {
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify([...next]));
    } catch {
      // ignore unavailable localStorage
    }
  };

  const toggleVote = useCallback(
    (id: number): boolean => {
      if (!user) {
        openLogin("You need to sign in with BundID before you can vote.");
        return false;
      }
      let nowVoted = false;
      setVotedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
          nowVoted = true;
        }
        persist(next);
        return next;
      });
      return nowVoted;
    },
    [user, openLogin],
  );

  const value = useMemo<VoteContextValue>(() => {
    const budgetUsed = votedIds.size;
    return {
      votedIds,
      hasVoted: (id: number) => votedIds.has(id),
      toggleVote,
      voteCount: (id: number, seedVotes: number) => seedVotes + (votedIds.has(id) ? 1 : 0),
      budgetTotal: BUDGET_TOTAL,
      budgetUsed,
      budgetRemaining: Math.max(0, BUDGET_TOTAL - budgetUsed),
    };
  }, [votedIds, toggleVote]);

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVotes must be used within VoteProvider");
  return ctx;
}
