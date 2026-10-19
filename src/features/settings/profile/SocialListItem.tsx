"use client";

import useDeleteAuthSocial from "src/queries/useDeleteAuthSocial";
import TrashIcon from "@icons/trash-red.svg";
import { Button } from "src/components/ui/button/button";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import { SocialAuthentication } from "src/types/auth";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { SocialAuthenticationType } from "src/types/auth";
import { useTranslations } from "next-intl";

interface IProps {
  account?: SocialAuthentication;
  platform?: SocialAuthenticationType;
  onConnect?: (type: SocialAuthenticationType) => void;
  isLinking?: boolean;
}

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

const extractUsername = (
  url: string | undefined,
  type: SocialAuthenticationType | undefined
): string => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    if (type === "instagram") {
      // Для Instagram: instagram.com/username
      return path.split("/")[1] || "";
    } else if (type === "tiktok") {
      // Для TikTok: tiktok.com/@username
      return path.split("@")[1] || "";
    }

    return url;
  } catch {
    return url;
  }
};

const SocialListItem = ({ account, platform, onConnect, isLinking }: IProps) => {
  const t = useTranslations("common");
  const { mutate: deleteSocialAuthentication, isPending: isDeleting } =
    useDeleteAuthSocial();

  return (
    <div className="flex items-center border border-[#DFE3EA] pr-[9px] rounded-[6px]">
      <div className="flex items-center justify-center size-[54px] bg-white50 mr-[12px]">
        <SocialMediaIcon
          socialPlatform={mapAuthTypeToPlatform(
            account?.type || platform || "instagram"
          )}
          className="size-[24px]"
        />
      </div>

      <div className="flex items-center gap-[8px] w-full min-w-[0]">
        <span className="text-gray400 font-[600] text-[16px]">
          {account?.type || platform}
        </span>
        <span className="text-gray600 font-medium text-sm truncate">
          {account?.email || extractUsername(account?.pageUrl, account?.type)}
        </span>
      </div>

      {account ? (
        <Button
          variant="icon"
          size="icon"
          className="w-fit ml-auto"
          onClick={() => {
            deleteSocialAuthentication(account.id);
          }}
          disabled={isDeleting}
          loading={isDeleting}
        >
          <TrashIcon width={24} height={24} />
        </Button>
      ) : (
        <Button
          size="sm"
          className="ml-auto"
          onClick={() => {
            if (platform && onConnect) {
              onConnect(platform);
            }
          }}
          disabled={isLinking}
          loading={isLinking}
        >
          {t("connect")}
        </Button>
      )}
    </div>
  );
};

export default SocialListItem;
