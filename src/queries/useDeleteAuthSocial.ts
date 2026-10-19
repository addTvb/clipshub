import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSocialAuthentication } from "src/api/auth";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { useTranslations } from "next-intl";


const useDeleteAuthSocial = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("settings");
  return useMutation({
    mutationFn: deleteSocialAuthentication,
    mutationKey: mutationKeys.auth.deleteSocialAuthentication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.socials });
      toast.success(t("socialMediaAccountDeletedSuccessfully"));
    },
  });
};

export default useDeleteAuthSocial;
