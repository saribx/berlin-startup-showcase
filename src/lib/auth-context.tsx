import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Auth/session state. SPINE STUB: keeps the current mock + localStorage
// behavior so the app is unchanged. Track C swaps the internals to call
// auth.server.ts (me / loginBundId / logoutFn) — the hook surface stays fixed.

export type BundIdUser = {
  name: string;
  citizenId: string;
};

type AuthContextValue = {
  user: BundIdUser | null;
  isAuthenticated: boolean;
  login: (user: BundIdUser) => void;
  logout: () => void;
  openLogin: (reason?: string) => void;
  closeLogin: () => void;
  loginOpen: boolean;
  loginReason: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "hs50:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BundIdUser | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginReason, setLoginReason] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore unavailable localStorage
    }
  }, []);

  const login = useCallback((u: BundIdUser) => {
    setUser(u);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {
      // ignore unavailable localStorage
    }
    setLoginOpen(false);
    setLoginReason(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore unavailable localStorage
    }
  }, []);

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
