import { useVotes } from "@/lib/vote-context";

// "x/50 votes used" indicator. SPINE STUB: reads vote-context (locally derived
// budget). Track A keeps the same surface once the budget comes from the server.

export function VoteBudgetPill() {
  const { budgetUsed, budgetTotal, budgetRemaining } = useVotes();
  const exhausted = budgetRemaining === 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
        exhausted
          ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          : "border-border bg-card text-muted-foreground"
      }`}
      title={exhausted ? `You've used all ${budgetTotal} votes — remove one to vote elsewhere` : undefined}
    >
      <span
        className={`inline-flex h-1.5 w-1.5 rounded-full ${exhausted ? "bg-amber-500" : "bg-emerald-500"}`}
      />
      <span className="tabular-nums font-semibold text-foreground">
        {budgetUsed}/{budgetTotal}
      </span>
      votes used
    </span>
  );
}
