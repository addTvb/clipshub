import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWithdrawCreditial } from "src/api/withdraw";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const useDeleteWithdrawCreditial = () => {
  const t = useTranslations("withdraw");
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.withdraw.deleteWithdrawCreditial,
    mutationFn: (params: { id: number }) => deleteWithdrawCreditial(params.id),
    onSuccess: () => {
      toast.success(t("deleteCreditialSuccessfully"));
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.wallet.getWithdrawRequests,
      });
    },
  });
};
