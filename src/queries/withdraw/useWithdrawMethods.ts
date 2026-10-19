import { useQuery } from "@tanstack/react-query";
import { getWalletWithdrawMethods } from "src/api/withdraw";
import { queryKeys } from "src/config/queryKeys";

export const useWithdrawMethods = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.influencers.wallet.getWithdrawMethods,
    queryFn: getWalletWithdrawMethods,
  });
  return { data, isLoading, error };
};
