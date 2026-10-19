import { useMutation } from "@tanstack/react-query";
import { useConfirmEmailStore } from "../../useConfirmEmailStore";
import { mutationKeys } from "src/config/mutationKeys";
import { resendEmailConfirm } from "src/api/auth";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useResendEmail = () => {
  const t = useTranslations("common");
  const email = useConfirmEmailStore((state) => state.email);

  const { mutate: resendEmail } = useMutation({
    mutationKey: mutationKeys.auth.resendEmail,
    mutationFn: () => resendEmailConfirm({ email: email }),
    onSuccess() {
      toast.success(t("resendSuccessful"));
    },
  });

  return { resendEmail };
};
