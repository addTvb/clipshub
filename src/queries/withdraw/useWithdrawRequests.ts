import { useQuery } from "@tanstack/react-query";
import { getWithdrawRequests } from "src/api/withdraw";
import { queryKeys } from "src/config/queryKeys";

export const useWithdrawRequests = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.influencers.wallet.getWithdrawRequests,
    queryFn: getWithdrawRequests,
  });
  return { data, isLoading, error };
};
