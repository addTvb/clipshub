import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawCreditial } from "src/api/withdraw";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useCreateWithdrawCreditial = () => {
  const t = useTranslations("withdraw");
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.withdraw.createWithdrawCreditial,
    mutationFn: createWithdrawCreditial,
    onSuccess: () => {
      toast.success(t("createCreditialSuccessfully"));
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.wallet.getWithdrawRequests,
      });
    },
  });
};
