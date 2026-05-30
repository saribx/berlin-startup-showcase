import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Frozen contract for Track C (Auth). SPINE STUB: no real session. Track C
// replaces the bodies with session.server.ts (getSession / loginWithBundId /
// logout) so identity is a real httpOnly-cookie session, and points
// auth-context.tsx + bund-id-dialog.tsx at these.

export type SessionUser = { id: string; name: string };

export const me = createServerFn({ method: "GET" }).handler(async () => {
  return { user: null as SessionUser | null };
});

export const loginBundId = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    return { user: { id: "stub", name: data.name } as SessionUser };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  return { ok: true as const };
});
