import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmEmailByCode } from "src/api/auth";
import { AUTH_COOKIE_NAME } from "src/config/cookies";
import { mutationKeys } from "src/config/mutationKeys";
import { cookieSetter } from "src/lib/cookieSetter";
import { useAuthStore } from "src/store/auth";
import { useConfirmEmailStore } from "../../useConfirmEmailStore";
import { useEffect } from "react";

export const useConfirmEmail = () => {
  const { push } = useRouter();
  const login = useAuthStore((state) => state.login);
  const cleanEmail = useConfirmEmailStore((state) => state.cleanEmail);
  const searchParams = useSearchParams();
  const confirmCode = searchParams.get("code");

  const { data, isSuccess } = useQuery({
    queryKey: mutationKeys.auth.confirmEmail(confirmCode || ""),
    queryFn: () => confirmEmailByCode({ temp_token: confirmCode || "" }),
    enabled: !!confirmCode,
  });

  useEffect(() => {
    if (isSuccess && data?.auth_token) {
      cleanEmail();
      push("/auth/terms/?emailConfirmed=true");
      cookieSetter(AUTH_COOKIE_NAME, data.auth_token);
      login();
    }
  }, [isSuccess, data, cleanEmail, push, login]);
};
