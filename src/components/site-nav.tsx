import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function SiteNav() {
  const linkClass =
    "text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-semibold";
  const { user, isAuthenticated, openLogin, logout } = useApp();
  return (
    <nav className="hidden sm:flex items-center gap-5 text-[13px] font-medium">
      <Link to="/" activeOptions={{ exact: true }} className={linkClass}>
        Vote
      </Link>
      <Link to="/cycles" className={linkClass}>
        Cycle overview
      </Link>
      <Link to="/how-it-works" className={linkClass}>
        How it works
      </Link>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={logout}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-foreground transition-colors hover:border-foreground/40"
          title="Sign out"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[#004b8d]" strokeWidth={2.5} />
          <span className="max-w-[110px] truncate font-semibold">{user!.name}</span>
          <LogOut className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => openLogin()}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#004b8d] px-3 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-[#003a70]"
        >
          <LogIn className="h-3.5 w-3.5" strokeWidth={2.5} />
          Sign in
        </button>
      )}
    </nav>
  );
}