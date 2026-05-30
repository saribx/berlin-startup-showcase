import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { me, signIn, signOut } from "./auth.server";

// Track C — Auth. Simplified name-entry login over the real httpOnly session.
// Same hook surface as the spine stub (so auth-nav-button / login-dialog are
// unchanged in shape); login() is now async (a server mutation).

export type AuthUser = { name: string; citizenId: string };

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (name: string) => Promise<void>;
  logout: () => void;
  openLogin: (reason?: string) => void;
  closeLogin: () => void;
  loginOpen: boolean;
  loginReason: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ME_KEY = ["me"] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginReason, setLoginReason] = useState<string | null>(null);

  const { data } = useQuery({ queryKey: ME_KEY, queryFn: () => me() });
  const user: AuthUser | null = data?.user
    ? { name: data.user.name, citizenId: data.user.id }
    : null;

  const loginMut = useMutation({
    mutationFn: (name: string) => signIn({ data: { name } }),
    onSuccess: (res) => {
      qc.setQueryData(ME_KEY, { user: res.user });
      // Signing in flips the fund position from gated → the citizen's own
      // (starting balance + any deposits), so refetch it.
      qc.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const logoutMut = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      qc.setQueryData(ME_KEY, { user: null });
      // The session is gone — vote budget, comment "mine" state, and the fund
      // position belong to a fresh anonymous citizen now, so refetch them.
      qc.invalidateQueries({ queryKey: ["voteState"] });
      qc.invalidateQueries({ queryKey: ["comments"] });
      qc.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const login = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      await loginMut.mutateAsync(trimmed);
      setLoginOpen(false);
      setLoginReason(null);
    },
    [loginMut],
  );

  const logout = useCallback(() => logoutMut.mutate(), [logoutMut]);

  const openLogin = useCallback((reason?: string) => {
    setLoginReason(reason ?? null);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setLoginReason(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      openLogin,
      closeLogin,
      loginOpen,
      loginReason,
    }),
    [user, login, logout, openLogin, closeLogin, loginOpen, loginReason],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
