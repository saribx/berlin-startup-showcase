import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/app-context";

const MOCK_USER = { name: "Anna Becker", citizenId: "DE-BUND-7821-4490" };

export function BundIdDialog() {
  const { loginOpen, closeLogin, loginReason, login } = useApp();
  const [step, setStep] = useState<"choose" | "verifying">("choose");

  const handleSignIn = () => {
    setStep("verifying");
    // Mock the BundID redirect / verification handshake.
    setTimeout(() => {
      login(MOCK_USER);
      setStep("choose");
    }, 1100);
  };

  return (
    <Dialog
      open={loginOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeLogin();
          setStep("choose");
        }
      }}
    >
      <DialogContent className="max-w-md overflow-hidden border-0 p-0">
        {/* BundID-style header */}
        <div className="bg-[#004b8d] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Bundesrepublik Deutschland
              </div>
              <div className="text-lg font-bold tracking-tight">BundID</div>
            </div>
            <span className="ml-auto rounded-full bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-950">
              Mockup
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-5">
          <DialogHeader className="mb-4 space-y-1.5 text-left">
            <DialogTitle className="text-lg">Sign in with BundID</DialogTitle>
            <DialogDescription>
              {loginReason ??
                "Authenticate with your German citizen ID to participate in Berlin50."}
            </DialogDescription>
          </DialogHeader>

          {step === "choose" ? (
            <>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Demo identity
              </p>
              <div className="flex w-full items-center gap-3 rounded-lg border border-[#004b8d] bg-[#004b8d]/5 px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#004b8d] to-[#c80f1e] text-xs font-semibold text-white">
                  {MOCK_USER.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {MOCK_USER.name}
                  </div>
                  <div className="truncate font-mono to-[11px] text-[11px] text-muted-foreground">
                    {MOCK_USER.citizenId}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#004b8d] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003a70]"
              >
                <Lock className="h-4 w-4" strokeWidth={2.5} />
                Continue with BundID
              </button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                This is a non-functional mockup — no real authentication takes place.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#004b8d]/10"
              >
                <Loader2 className="h-7 w-7 animate-spin text-[#004b8d]" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Verifying with BundID…
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Confirming citizen ID {MOCK_USER.citizenId}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}