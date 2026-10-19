import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createRefill } from "src/api/refill";
import { queryKeys } from "src/config/queryKeys";
import { RefillRequest } from "src/types/refill";
import { mutationKeys } from "src/config/mutationKeys";

export const useCreateDeposit = (data: RefillRequest) => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: mutationKeys.wallet.refill(data.transaction_id, data.currency),
    queryFn: () => createRefill(data),
    enabled: !!data.transaction_id,
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.wallet.getUserWallet });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.wallet.getDeposits });
    }
  }, [query.isSuccess, queryClient]);

  return query;
};