import { useMemo } from "react";
import { useInfluencerWallet } from "src/queries/wallet/useInfluencerWallet";
import { WithdrawCreditial } from "src/types/withdraw";

export const useShouldLockOverlay = (
  filteredUserMethods: WithdrawCreditial[]
) => {
  const { wallet } = useInfluencerWallet();

  const shouldShowOverlay = useMemo(
    () =>
      Boolean(
        filteredUserMethods.length === 0 &&
          typeof wallet?.balance === "number" &&
          wallet.balance < 10
      ),
    [filteredUserMethods.length, wallet?.balance]
  );

  return { shouldShowOverlay };
};
