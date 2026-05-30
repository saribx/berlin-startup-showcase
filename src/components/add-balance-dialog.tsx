import { Plus, Wallet } from "lucide-react";
import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePortfolio } from "@/lib/use-portfolio";

// Track D — Fund. Free top-up dialog (play money, no payment): quick amounts +
// a custom field. Self-contained — owns its open state and the addBalance call
// (usePortfolio) so the page can drop it anywhere with its own trigger.

const QUICK = [100, 500, 1000] as const;
const MAX = 1_000_000;

export function AddBalanceDialog({ trigger }: { trigger: ReactNode }) {
  const { addBalance, isAdding } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(500);

  const valid = Number.isFinite(amount) && amount >= 1 && amount <= MAX;

  const handleConfirm = async () => {
    if (!valid || isAdding) return;
    await addBalance(amount);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Add balance
          </DialogTitle>
          <DialogDescription>
            Add capital to the Berlin Venture 50 fund. It's invested across the funded startups — you share
            in the returns, you don't pick the bets.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {QUICK.map((q) => {
              const active = amount === q;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-semibold tabular-nums transition-colors ${
                    active
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-border bg-background hover:border-foreground/30"
                  }`}
                >
                  +€{q.toLocaleString("de-DE")}
                </button>
              );
            })}
          </div>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Custom amount
            </span>
            <div className="mt-1 flex items-center rounded-lg border border-border bg-background px-3 focus-within:border-primary">
              <span className="text-sm text-muted-foreground">€</span>
              <input
                type="number"
                min={1}
                max={MAX}
                value={Number.isFinite(amount) ? amount : ""}
                onChange={(e) => setAmount(Math.floor(Number(e.target.value)))}
                className="w-full bg-transparent px-2 py-2.5 text-sm tabular-nums outline-none"
              />
            </div>
          </label>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!valid || isAdding}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:from-emerald-400 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            {isAdding ? "Adding…" : `Add €${valid ? amount.toLocaleString("de-DE") : "—"}`}
          </button>

          <p className="text-center text-[11px] text-muted-foreground">
            Illustrative · simulated fund performance. No real payment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
