import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRefill } from "src/api/refill";
import { queryKeys } from "src/config/queryKeys";
import { RefillRequest } from "src/types/refill";
import { mutationKeys } from "src/config/mutationKeys";
import { Currency } from "src/types/base";

export const useCreateDepositMutation = (transactionId: string, currency: Currency) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationKey: mutationKeys.wallet.refill(transactionId, currency),
    mutationFn: (data: RefillRequest) => createRefill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.wallet.getUserWallet });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.wallet.getDeposits });
    },
  });

  return mutation;
};

