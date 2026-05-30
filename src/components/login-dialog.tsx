import { LogIn } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";

// Track C — simplified name-entry login. Backed by the real httpOnly session
// (auth-context → auth.server). No BundID/OIDC.

export function LoginDialog() {
  const { loginOpen, closeLogin, loginReason, login } = useAuth();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    try {
      await login(name);
      setName("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={loginOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeLogin();
          setName("");
        }
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-lg">Sign in</DialogTitle>
          <DialogDescription>
            {loginReason ?? "Choose a display name to vote and join the discussion."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
          <button
            type="submit"
            disabled={!name.trim() || submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <LogIn className="h-4 w-4" strokeWidth={2.5} />
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-1 text-center text-[11px] text-muted-foreground">
          No account needed — this is a simplified demo login.
        </p>
      </DialogContent>
    </Dialog>
  );
}
