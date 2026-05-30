import { Link } from "@tanstack/react-router";
import { CircleUser, LogIn } from "lucide-react";

import { useAuth } from "@/lib/auth-context";

// Track C — the nav auth control, backed by the real session (auth-context →
// auth.server). When signed in it links to the account page (sign out lives
// there); otherwise a Sign in button that opens the login dialog.

export function AuthNavButton() {
  const { user, isAuthenticated, openLogin } = useAuth();

  if (isAuthenticated) {
    return (
      <Link
        to="/account"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-foreground transition-colors hover:border-foreground/40 data-[status=active]:border-emerald-500/50 data-[status=active]:bg-emerald-500/5"
        title="Your account"
      >
        <CircleUser
          className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
          strokeWidth={2.5}
        />
        <span className="max-w-[110px] truncate font-semibold">{user!.name}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openLogin()}
      className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-emerald-600/30 ring-1 ring-inset ring-white/15 transition-all hover:from-emerald-400 hover:to-emerald-600 hover:shadow-md hover:shadow-emerald-500/40 active:scale-[0.97]"
    >
      <LogIn className="h-3.5 w-3.5" strokeWidth={2.5} />
      Sign in
    </button>
  );
}
