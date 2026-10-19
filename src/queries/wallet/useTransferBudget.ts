import { useMutation } from "@tanstack/react-query";
import { transferBudget } from "src/api/wallet";
import { mutationKeys } from "src/config/mutationKeys";
import { TransferRequest } from "src/types/wallet";

export const useTransferBudget = () => {
  const { mutate: transferBudgetMutate, isPending: transferLoading } =
    useMutation({
      mutationKey: mutationKeys.wallet.transfer,
      mutationFn: (params: {
        toWalletID: number;
        fromWalletID: number;
        body: TransferRequest;
      }) => transferBudget(params.fromWalletID, params.toWalletID, params.body),
    });

  return { transferBudgetMutate, transferLoading };
};
