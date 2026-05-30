import { CircleUser, LogIn, LogOut } from "lucide-react";

import { useAuth } from "@/lib/auth-context";

// Track C — the nav auth control, backed by the real session (auth-context →
// auth.server). Shows the signed-in display name + sign out, or a Sign in button.

export function AuthNavButton() {
  const { user, isAuthenticated, openLogin, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={logout}
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-foreground transition-colors hover:border-foreground/40"
        title="Sign out"
      >
        <CircleUser
          className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
          strokeWidth={2.5}
        />
        <span className="max-w-[110px] truncate font-semibold">{user!.name}</span>
        <LogOut className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
      </button>
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
