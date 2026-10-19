import { useQuery } from "@tanstack/react-query";
import { getUserWallet } from "src/api/wallet";
import { queryKeys } from "src/config/queryKeys";

export const useUserWallet = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.user.wallet.getUserWallet,
    queryFn: getUserWallet,
  });

  return { wallet: data?.wallet, walletLoading: isLoading };
};
