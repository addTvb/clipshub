"use client";

import { useTranslations } from "next-intl";
import AddChannelButton from "./AddChannelButton";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import {
  handleInstagramAuth,
  handleTikTokAuth,
} from "src/widgets/auth/SocialMediaLogin";
import { Spinner } from "src/components/ui/spinner";
import clsx from "clsx";
import { useAutoChannelAuth } from "src/hooks/useAutoChannelAuth";
import { Button } from "src/components/ui/button/button";
import Image from "next/image";

interface IProps {
  wrapperClassName?: string;
  subtitle?: string;
  onOpenModal?: () => void;
}

const AddChannelCard = ({
  wrapperClassName,
  subtitle,
  onOpenModal,
}: IProps) => {
  const t = useTranslations("influencer");
  const { isPending, addChannel } = useAutoChannelAuth();

  useEffect(() => {
    const handleChannelConnect = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "channel-connect") {
        const { code, channelType } = event.data.payload;

        const redirectUrl =
          channelType === "instagram"
            ? `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
            : `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`;

        addChannel({
          code,
          front_url: redirectUrl,
          type: channelType,
        });
      }
    };

    window.addEventListener("message", handleChannelConnect);
    return () => window.removeEventListener("message", handleChannelConnect);
  }, [addChannel]);

  // Авторизация Google/YouTube
  const googleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    onSuccess: (codeResponse) => {
      addChannel({
        code: codeResponse.code,
        front_url: window.location.origin,
        type: "youtube",
      });
    },
    onError: () => {
      toast.error(t("oauthError"));
    },
    flow: "auth-code",
  });

  // Обработчик клика для всех типов кнопок
  const handleChannelConnect = (type: SocialPlatform) => {
    if (type === "youtube") {
      googleLogin();
    } else if (type === "instagram") {
      handleInstagramAuth(
        `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
      );
    } else if (type === "tiktok") {
      handleTikTokAuth(
        `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`
      );
    } else {
      toast(t("comingSoon"));
    }
  };

  if (isPending) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center rounded-[8px] bg-white h-[180px] shadow-cardShadow",
          wrapperClassName
        )}
      >
        <Spinner color="dark" />
      </div>
    );
  }

  return (
    <>
      <div
        className={clsx(
          "flex flex-col gap-[24px] p-[24px] pb-[12px] rounded-[8px] bg-white shadow-cardShadow",
          wrapperClassName
        )}
      >
        <div className="text-base font-bold">{t("addChannel")}</div>
        {subtitle && <div className="text-sm text-gray600">{subtitle}</div>}
        <div className="flex flex-col gap-[12px]">
          <div className="flex gap-[12px]">
            <AddChannelButton
              type="instagram"
              onClick={() => handleChannelConnect("instagram")}
              disabled={isPending}
            />
            <AddChannelButton
              type="youtube"
              onClick={() => handleChannelConnect("youtube")}
              disabled={isPending}
            />
            <AddChannelButton
              type="tiktok"
              onClick={() => handleChannelConnect("tiktok")}
              disabled={isPending}
            />
          </div>
          <Button
            onClick={onOpenModal}
            loading={isPending}
            className="gap-[6px] text-gray400 font-medium text-sm p-0 max-h-[32px] w-fit self-center"
            variant="text"
          >
            <Image
              src="/static/icons/alternative-arrows.svg"
              alt=""
              width={20}
              height={20}
            />
            <span>{t("alternativeMethod.title")}</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddChannelCard;
