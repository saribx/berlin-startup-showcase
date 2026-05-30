import { useEffect, useState } from "react";

// Voting closes 3 days, 12 hours from first load (mockup).
const VOTE_WINDOW_MS = (3 * 24 + 12) * 60 * 60 * 1000;
let sharedTarget: number | null = null;
function getTarget() {
  if (sharedTarget === null) sharedTarget = Date.now() + VOTE_WINDOW_MS;
  return sharedTarget;
}

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const remaining = Math.max(0, targetMs - now);
  return {
    days: Math.floor(remaining / (24 * 60 * 60 * 1000)),
    hours: Math.floor((remaining / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((remaining / (60 * 1000)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

export function CountdownBadge() {
  const { days, hours, minutes, seconds } = useCountdown(getTarget());
  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-sm font-bold tabular-nums text-foreground">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
  const Sep = () => <span className="text-sm font-bold text-border">:</span>;
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/40 via-rose-500/30 to-primary/40 opacity-60 blur-sm transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-3 rounded-2xl border border-border bg-card px-3.5 py-2">
        <div className="hidden flex-col items-start leading-none sm:flex">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Voting
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground">
            Ends in
          </span>
        </div>
        <div className="hidden h-7 w-px bg-border sm:block" />
        <div className="flex items-center gap-2">
          <Unit value={days} label="Days" />
          <Sep />
          <Unit value={hours} label="Hrs" />
          <Sep />
          <Unit value={minutes} label="Min" />
          <span className="hidden sm:contents">
            <Sep />
            <Unit value={seconds} label="Sec" />
          </span>
        </div>
      </div>
    </div>
  );
}