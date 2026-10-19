"use client";

import { Spinner } from "src/components/ui/spinner";
import SocialListItem from "./SocialListItem";
import { useAuthSocials } from "src/queries/useAuthSocials";
import useLinkAuthSocial from "src/queries/useLinkAuthSocial";
import { SocialAuthenticationType } from "src/types/auth";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import {
  handleInstagramAuth,
  handleTikTokAuth,
} from "src/widgets/auth/SocialMediaLogin";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";

const mapAuthTypeToPlatform = (
  authType: SocialAuthenticationType
): SocialPlatform => {
  switch (authType) {
    case "google":
      return "youtube"; // Google авторизация используется для YouTube
    case "tiktok":
      return "tiktok";
    case "instagram":
      return "instagram";
    default:
      return "instagram"; // значение по умолчанию
  }
};

const SocialList = () => {
  const { data: socials, isLoading: socialsLoading } = useAuthSocials();
  const { mutate: linkSocialAuthentication, isPending: isLinking } =
    useLinkAuthSocial();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const channelType = searchParams.get(
    "channelType"
  ) as SocialAuthenticationType;
  const router = useRouter();
  
  useEffect(() => {
    if (code && channelType) {
      const redirectUrl =
        channelType === "instagram"
          ? `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
          : `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`;
      linkSocialAuthentication({
        code,
        front_url: redirectUrl,
        auth_type: channelType,
      });
      router.replace(window.location.pathname);
    }
  }, [code, channelType, linkSocialAuthentication, router]);

  // Обработчик сообщений от окон авторизации
  useEffect(() => {
    const handleChannelConnect = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "channel-connect") {
        const { code, channelType } = event.data.payload;

        const redirectUrl =
          channelType === "instagram"
            ? `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
            : `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`;

        linkSocialAuthentication({
          code,
          front_url: redirectUrl,
          auth_type: channelType,
        });
      }
    };

    window.addEventListener("message", handleChannelConnect);
    return () => window.removeEventListener("message", handleChannelConnect);
  }, [linkSocialAuthentication]);

  // Авторизация Google/YouTube
  const googleLogin = useGoogleLogin({
    scope:
      "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    onSuccess: (codeResponse) => {
      linkSocialAuthentication({
        code: codeResponse.code,
        front_url: window.location.origin,
        auth_type: "google",
      });
    },
    flow: "auth-code",
  });

  // Обработчик клика для всех типов кнопок
  const handleChannelConnect = (type: SocialAuthenticationType) => {
    const platform = mapAuthTypeToPlatform(type);

    if (type === "google") {
      googleLogin();
    } else if (platform === "instagram") {
      handleInstagramAuth(
        `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
      );
    } else if (platform === "tiktok") {
      handleTikTokAuth(
        `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`
      );
    }
  };

  if (socialsLoading)
    return (
      <div className="flex justify-center items-center h-[188px]">
        <Spinner size="small" color="dark" />
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      {socials?.list.map((acc) => (
        <SocialListItem key={acc.id} account={acc} />
      ))}
      <SocialListItem
        platform="instagram"
        onConnect={handleChannelConnect}
        isLinking={isLinking}
      />
      <SocialListItem
        platform="google"
        onConnect={handleChannelConnect}
        isLinking={isLinking}
      />
      <SocialListItem
        platform="tiktok"
        onConnect={handleChannelConnect}
        isLinking={isLinking}
      />
    </div>
  );
};

export default SocialList;
