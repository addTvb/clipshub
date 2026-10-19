import { useQuery } from "@tanstack/react-query";
import { getDeposits } from "src/api/refill";
import { queryKeys } from "src/config/queryKeys";

export const useGetDeposits = () => {
  return useQuery({
    queryKey: queryKeys.user.wallet.getDeposits,
    queryFn: getDeposits,
  });
};