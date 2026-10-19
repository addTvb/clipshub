"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "src/i18n/routing";
import { useGetUser } from "src/queries/useGetUser";

export const TermsRedirectGuard = () => {
  const { user, userLoading } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  const isTermsOrSetupPage =
    pathname.includes("/auth/terms") ||
    pathname.includes("/auth/setup-profile");

  useEffect(() => {
    if (
      !userLoading &&
      user &&
      user.type &&
      !isTermsOrSetupPage &&
      !user.business_terms_signed_at &&
      !user.clipper_terms_signed_at
    ) {
      router.replace("/auth/terms");
    }
  }, [user, userLoading, isTermsOrSetupPage, pathname, router]);

  return null;
};
