import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addDeposit as addDepositFn, getPortfolio } from "./fund.server";

// Track D — Fund. Client hook over fund.server.ts via react-query, mirroring
// vote-context's shape. Only the /account route needs it, so it's a hook rather
// than a global provider. Adding capital refetches the portfolio snapshot.

export const PORTFOLIO_KEY = ["portfolio"] as const;

export function usePortfolio() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: PORTFOLIO_KEY, queryFn: () => getPortfolio() });

  const mutation = useMutation({
    mutationFn: (amountEur: number) => addDepositFn({ data: { amountEur } }),
    onSuccess: (_res, amountEur) => {
      toast.success(`Added €${amountEur.toLocaleString("de-DE")} to the fund`, {
        description: "Your stake updates as the funded startups perform.",
      });
      qc.invalidateQueries({ queryKey: PORTFOLIO_KEY });
    },
    onError: () => toast.error("Couldn't add balance", { description: "Please try again." }),
  });

  return {
    portfolio: query.data,
    isLoading: query.isLoading,
    addBalance: (amountEur: number) => mutation.mutateAsync(amountEur),
    isAdding: mutation.isPending,
  };
}

export type Portfolio = NonNullable<ReturnType<typeof usePortfolio>["portfolio"]>;
