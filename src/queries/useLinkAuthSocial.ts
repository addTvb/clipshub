import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { linkSocialAuthentication } from "src/api/auth";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { useTranslations } from "next-intl";


const useLinkAuthSocial = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("settings");
  return useMutation({
    mutationFn: linkSocialAuthentication,
    mutationKey: mutationKeys.auth.linkSocialAuthentication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.socials });
      toast.success(t("socialMediaAccountLinkedSuccessfully"));
    },
  });
};

export default useLinkAuthSocial;


