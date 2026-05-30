import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

// Extracted from index.tsx (row) and startup.$id.tsx (hero) so Track A owns the
// vote control in one place. SPINE STUB: pure presentational — renders the count
// it's given and calls onToggle. Track A wires it to vote-context (optimistic
// toggle, disabled-at-budget). Styling is preserved verbatim per variant.

export function VoteButton({
  count,
  voted,
  onToggle,
  disabled = false,
  variant,
}: {
  count: number;
  voted: boolean;
  onToggle: () => void;
  disabled?: boolean;
  variant: "row" | "hero";
}) {
  const blocked = disabled && !voted;

  if (variant === "hero") {
    return (
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onToggle}
        disabled={blocked}
        aria-pressed={voted}
        className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
          voted
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
        } ${blocked ? "cursor-not-allowed opacity-50 hover:border-border hover:bg-card" : ""}`}
      >
        <ChevronUp className="h-4 w-4" strokeWidth={2.5} />
        <span className="tabular-nums">{count.toLocaleString()}</span>
        <span className="hidden sm:inline">{voted ? "Voted" : "Upvote"}</span>
      </motion.button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={blocked}
      aria-pressed={voted}
      aria-label={voted ? "Remove vote" : "Upvote"}
      className={`flex shrink-0 flex-col items-center justify-center rounded-lg border px-3 py-1.5 transition-all ${
        voted
          ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.18)]"
          : "border-border text-primary hover:border-primary hover:bg-primary/5"
      } ${blocked ? "cursor-not-allowed opacity-40 hover:border-border hover:bg-transparent" : ""}`}
    >
      <ChevronUp className={`h-4 w-4 ${voted ? "text-white" : "text-primary"}`} strokeWidth={2.5} />
      <span
        className={`text-xs font-semibold tabular-nums ${voted ? "text-white" : "text-foreground"}`}
      >
        {count.toLocaleString()}
      </span>
    </button>
  );
}
