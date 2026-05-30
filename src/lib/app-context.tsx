import { type ReactNode } from "react";

import { AuthProvider, useAuth } from "./auth-context";
import { VoteProvider, useVotes } from "./vote-context";

// Thin composer. Auth + Vote state was split into auth-context.tsx and
// vote-context.tsx so the parallel tracks own disjoint files. useApp() is kept
// as a back-compat convenience that merges both hooks into the original shape —
// existing call sites keep working; new code can use useAuth()/useVotes()
// directly.

export { type BundIdUser } from "./auth-context";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <VoteProvider>{children}</VoteProvider>
    </AuthProvider>
  );
}

export function useApp() {
  return { ...useAuth(), ...useVotes() };
}
