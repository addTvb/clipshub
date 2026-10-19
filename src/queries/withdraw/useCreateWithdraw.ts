import { useMutation } from "@tanstack/react-query";  
import toast from "react-hot-toast";
import { createWithdraw } from "src/api/withdraw";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";

export const useCreateWithdraw = () => {
  const t = useTranslations("withdraw");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWithdraw,
    mutationKey: ["withdraw", "create"],
    onSuccess: () => {
      toast.success(t("withdrawRequestCreatedSuccessfully"));
      queryClient.invalidateQueries({ queryKey: queryKeys.influencers.wallet.getInfluencerWallet });
      queryClient.invalidateQueries({ queryKey: queryKeys.influencers.wallet.getWithdrawRequests });
    }
  });
};

