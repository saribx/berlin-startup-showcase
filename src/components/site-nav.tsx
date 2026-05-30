import { Link } from "@tanstack/react-router";

export function SiteNav() {
  const linkClass =
    "text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-semibold";
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
    </nav>
  );
}