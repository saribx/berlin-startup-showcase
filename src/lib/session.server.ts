import { randomBytes } from "node:crypto";

import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { and, eq, gt } from "drizzle-orm";

import { getServerConfig } from "./config.server";
import { getDb } from "./db.server";
import { sessions, users, type User } from "./db/schema";

// Server-authoritative pseudonymous identity. Each browser gets its OWN citizen
// id in an httpOnly cookie, so the "3 votes per person" budget is per-visitor.
// Vote-first: requireUser() mints on demand, so voting never requires a login;
// the login dialog is an optional "claim a name" step (signIn).
//
// These helpers use request-scoped cookie APIs → call them only inside a
// createServerFn handler or route loader, never at module scope.

const THIRTY_DAYS_SEC = 60 * 60 * 24 * 30;

const nowSec = () => Math.floor(Date.now() / 1000);
const newToken = (bytes: number) => randomBytes(bytes).toString("hex");
const citizenLabel = (id: string) => `Citizen ${id.slice(-4).toUpperCase()}`;

/** Resolve the current user from the session cookie, or null. No mutation. */
export function getSession(): { user: User } | null {
  const sid = getCookie(getServerConfig().sessionCookieName);
  if (!sid) return null;
  const row = getDb()
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.id, sid), gt(sessions.expiresAt, nowSec())))
    .get();
  return row ? { user: row.user } : null;
}

/** Current user, minting a fresh anonymous (unclaimed) citizen + cookie if none. */
export function requireUser(): User {
  return getSession()?.user ?? createCitizen(undefined, false).user;
}

/** Sign in with a display name: claim + rename the current citizen (mint if none). */
export function signIn(input: { name: string }): User {
  const existing = getSession();
  if (!existing) return createCitizen(input.name, true).user;
  return getDb()
    .update(users)
    .set({ displayName: input.name, claimed: true })
    .where(eq(users.id, existing.user.id))
    .returning()
    .get();
}

/** Drop the session row + cookie. Votes stay in the DB under that citizen. */
export function logout(): void {
  const name = getServerConfig().sessionCookieName;
  const sid = getCookie(name);
  if (sid) getDb().delete(sessions).where(eq(sessions.id, sid)).run();
  deleteCookie(name, { path: "/" });
}

function createCitizen(displayName: string | undefined, claimed: boolean): { user: User } {
  const db = getDb();
  const id = `cit_${newToken(8)}`;
  const user = db
    .insert(users)
    .values({ id, displayName: displayName ?? citizenLabel(id), claimed })
    .returning()
    .get();
  const sid = newToken(32);
  db.insert(sessions)
    .values({ id: sid, userId: id, expiresAt: nowSec() + THIRTY_DAYS_SEC })
    .run();
  setCookie(getServerConfig().sessionCookieName, sid, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS_SEC,
    secure: getServerConfig().nodeEnv === "production",
  });
  return { user };
}
