import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type BundIdUser = {
  name: string;
  citizenId: string; // mock pseudonymous id
};

type AppContextValue = {
  user: BundIdUser | null;
  isAuthenticated: boolean;
  login: (user: BundIdUser) => void;
  logout: () => void;
  openLogin: (reason?: string) => void;
  closeLogin: () => void;
  loginOpen: boolean;
  loginReason: string | null;
  votedIds: Set<number>;
  hasVoted: (id: number) => boolean;
  /**
   * Toggle a vote. If the user is not authenticated, opens the BundID
   * login dialog and returns false (no vote recorded yet).
   */
  toggleVote: (id: number) => boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

const USER_KEY = "hs50:user";
const VOTES_KEY = "hs50:voted";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BundIdUser | null>(null);
  const [votedIds, setVotedIds] = useState<Set<number>>(() => new Set());
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginReason, setLoginReason] = useState<string | null>(null);

  // Hydrate from localStorage (client only).
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(USER_KEY);
      if (rawUser) setUser(JSON.parse(rawUser));
    } catch {}
    try {
      const rawVotes = localStorage.getItem(VOTES_KEY);
      if (rawVotes) setVotedIds(new Set(JSON.parse(rawVotes)));
    } catch {}
  }, []);

  const persistVotes = (next: Set<number>) => {
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify([...next]));
    } catch {}
  };

  const login = useCallback((u: BundIdUser) => {
    setUser(u);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {}
    setLoginOpen(false);
    setLoginReason(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
  }, []);

  const openLogin = useCallback((reason?: string) => {
    setLoginReason(reason ?? null);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setLoginReason(null);
  }, []);

  const toggleVote = useCallback(
    (id: number): boolean => {
      if (!user) {
        setLoginReason("You need to sign in with BundID before you can vote.");
        setLoginOpen(true);
        return false;
      }
      setVotedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        persistVotes(next);
        return next;
      });
      return true;
    },
    [user],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      openLogin,
      closeLogin,
      loginOpen,
      loginReason,
      votedIds,
      hasVoted: (id: number) => votedIds.has(id),
      toggleVote,
    }),
    [user, login, logout, openLogin, closeLogin, loginOpen, loginReason, votedIds, toggleVote],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}