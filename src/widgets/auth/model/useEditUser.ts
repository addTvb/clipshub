import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { updateUser } from "src/api/auth";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { EditUserRequest } from "src/types/auth";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("settings");

  const { mutate: editUserProfile, isPending: pendingEditUser } = useMutation({
    mutationKey: mutationKeys.auth.setupProfile,
    mutationFn: (body: EditUserRequest) => updateUser(body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      toast.success(t("profileUpdatedSuccessfully"));
    },
  });

  return {
    editUserProfile,
    pendingEditUser,
  };
};
