import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWithdrawCreditial } from "src/api/withdraw";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { UpdateWithdrawCreditialRequest } from "src/types/withdraw";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const useUpdateWithdrawCreditial = () => {
  const t = useTranslations("withdraw");
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.withdraw.updateWithdrawCreditial,
    mutationFn: (params: {
      id: number;
      body: UpdateWithdrawCreditialRequest;
    }) => updateWithdrawCreditial(params.id, params.body),
    onSuccess: () => {
      toast.success(t("updateCreditialSuccessfully"));
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.wallet.getWithdrawRequests,
      });
    },
  });
};
