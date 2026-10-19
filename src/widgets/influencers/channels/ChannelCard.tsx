"use client";

import Image from "next/image";
// import MoreOptionsButton from "src/components/ui/more-options-button";
import { MediaChannel, MediaChannelDetails } from "src/types/influencers";
// import { Button } from "src/components/ui/button/button"; // больше не нужен
import WarningIcon from "@icons/warning.svg";
import { formatNumber } from "src/lib/numbers/formatNumber";
import { useTranslations } from "next-intl";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import ChannelSettingsCard from "src/features/influencers/channels/ChannelSettingsCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button/button";
import { ChannelActionsPopup } from "../dashboard/ChannelActionsPopup";

interface IProps {
  mediaChannel: MediaChannel;
  mediaChannelDetails?: MediaChannelDetails;
}

const ChannelCard = ({ mediaChannel, mediaChannelDetails }: IProps) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const t = useTranslations("influencer");

  const handleCardClick = () => {
    if (openModal) return;
    switch (mediaChannel.status) {
      case "moderation":
      case "approved":
        router.push(`/influencers/channels/${mediaChannel.id}`);
        break;
      case "rejected":
      case "created":
      default:
        setOpenModal(true);
        break;
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const renderStatusElement = () => {
    switch (mediaChannel.status) {
      case "moderation":
      case "approved":
        return (
          <Button
            href={`/influencers/channels/${mediaChannel.id}`}
            className="mt-auto h-full w-full"
            size="lg"
          >
            {t("channelCardButton.approved")}
          </Button>
        );
      case "rejected":
        return (
          <Button
            className="mt-auto h-full w-full [&_svg]:size-[20px]"
            size="lg"
          >
            <WarningIcon />
            {t("channelCardButton.archived")}
          </Button>
        );
      case "created":
      default:
        return (
          <Button className="mt-auto h-full w-full" size="lg">
            {t("channelCardButton.created")}
          </Button>
        );
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col justify-between rounded-[8px] bg-white shadow-cardShadow cursor-pointer focus:outline-none"
        tabIndex={0}
        role="button"
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleCardClick();
        }}
        aria-label={mediaChannel.title}
      >
        <div className="p-[20px] flex gap-[10px] items-center">
          <Image
            alt="channel avatar"
            src={
              mediaChannelDetails?.cover_file?.link ||
              "/static/images/default-avatar.svg"
            }
            width={73}
            height={73}
            onError={(e) => {
              e.currentTarget.src = "/static/images/default-avatar.svg";
            }}
            className="size-[73px] rounded-[50%] object-cover border border-white200"
          />

          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[4px]">
              <SocialMediaIcon
                socialPlatform={mediaChannel.media_channel_type}
                className="size-[20px]"
              />
              <div className="lg:text-xl text-lg font-bold text-textColor">
                {mediaChannel.title}
              </div>
              {!!mediaChannel.external_name && (
                <div className="rounded-[8px] bg-white200 px-[6px] text-black400 text-xs font-semibold font-[Inter]">
                  @{mediaChannel.external_name}
                </div>
              )}
            </div>

            <div className="flex items-center gap-[24px]">
              <div className="flex flex-col gap-[2px] font-[Inter] font-semibold">
                <div className="text-gray350 text-[10px] uppercase">
                  {t("channelInfo.subscribers")}
                </div>
                <div className="text-textColor text-[13px]">
                  {formatNumber(
                    mediaChannelDetails?.media_channel_stat?.subscriber_count ||
                      0
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[2px] font-[Inter] font-semibold">
                <div className="text-gray350 text-[10px] uppercase">
                  {t("channelInfo.videos")}
                </div>
                <div className="text-textColor text-[13px]">
                  {formatNumber(
                    mediaChannelDetails?.media_channel_stat?.total_post_count ||
                      0
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[10px] px-[20px] py-[18px] border-t border-white200">
          {renderStatusElement()}

          <ChannelActionsPopup
            mediaChannelId={mediaChannel.id}
            onOpenChannelSettings={handleOpen}
            mediaChannelName={mediaChannel.title}
          />
        </div>
      </div>
      <ChannelSettingsCard
        isNewChannel={mediaChannel.status === "created"}
        openModal={openModal}
        setIsOpen={setOpenModal}
        mediaChannel={mediaChannel}
        mediaChannelDetails={mediaChannelDetails}
      />
    </>
  );
};

export default ChannelCard;
