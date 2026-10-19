import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getUserMe } from "src/api/auth";
import { AUTH_COOKIE_NAME, USER_TYPE_COOKIE_NAME } from "src/config/cookies";
import { queryKeys } from "src/config/queryKeys";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cookieSetter } from "src/lib/cookieSetter";

export const useGetUser = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const authCookie = Cookies.get(AUTH_COOKIE_NAME);

  // Проверка параметра termsSigned
  const termsSigned = searchParams.get('termsSigned') === 'true';

  useEffect(() => {
    // Если terms только что подписаны, принудительно обновляем данные пользователя
    if (termsSigned && authCookie) {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      
      // Очистка параметра termsSigned из URL
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('termsSigned');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [termsSigned, authCookie, queryClient]);

  const { data, isLoading: userLoading } = useQuery({
    queryKey: queryKeys.user.me,
    queryFn: getUserMe,
    enabled: !!authCookie,
  });

  const [termsSignDate, setTermsSignDate] = useState<string>("");

  useEffect(() => {
    const date =
      data?.user?.business_terms_signed_at ||
      data?.user?.clipper_terms_signed_at ||
      "";
    setTermsSignDate(date);

    if (date) {
      if (pathname.includes("auth/terms")) {
        push("/");
      } else if (pathname.includes("auth/setup-profile")) {
        push("/");
      }
    }
  }, [data, pathname, push]);

  useEffect(() => {
    if (data?.user?.type) {
      cookieSetter(USER_TYPE_COOKIE_NAME, data?.user?.type);
    }
  }, [data?.user?.type]);

  return { user: data?.user, userLoading, termsSignDate, featureFlags: data?.feature_flags };
};
