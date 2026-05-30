import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getSession, logout, signIn as signInSession } from "./session.server";

// Track C — Auth. Simplified name-entry login backed by the real httpOnly
// session. me() reports a user only once they've claimed a name (an anonymous
// voting session stays "Sign in" in the nav). Signing in claims + renames the
// current citizen, so any votes/comments cast anonymously carry over.

export type SessionUser = { id: string; name: string };

export const me = createServerFn({ method: "GET" }).handler(async () => {
  const session = getSession();
  const user =
    session && session.user.claimed
      ? ({ id: session.user.id, name: session.user.displayName } satisfies SessionUser)
      : null;
  return { user };
});

export const signIn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1).max(60) }))
  .handler(async ({ data }) => {
    const user = signInSession({ name: data.name.trim() });
    return { user: { id: user.id, name: user.displayName } satisfies SessionUser };
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  logout();
  return { ok: true as const };
});
