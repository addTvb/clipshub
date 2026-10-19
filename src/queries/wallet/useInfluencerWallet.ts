import { useQuery } from "@tanstack/react-query";
import { getInfluencerWallet } from "src/api/wallet";
import { queryKeys } from "src/config/queryKeys";

export const useInfluencerWallet = () => {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.influencers.wallet.getInfluencerWallet,
    queryFn: getInfluencerWallet,
  });

  return { wallet: data?.wallet, walletLoading: isPending };
};
