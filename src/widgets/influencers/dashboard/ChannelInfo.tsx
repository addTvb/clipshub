import Image from "next/image";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import { formatNumber } from "src/lib/numbers/formatNumber";
import { useTranslations } from "next-intl";
import { useMediaChannels } from "src/queries/influencers/useMediaChannels";
import { Spinner } from "src/components/ui/spinner";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import CategoryBadge from "src/components/ui/category/category-badge";
import SettingsIcon from "@icons/settings-gray.svg";
import { Button } from "src/components/ui/button/button";

interface IProps {
  mediaChannelId: number;
}

const DashboardChannelInfo = ({ mediaChannelId }: IProps) => {
  const { channelDetails, isLoading } = useMediaChannels();
  const { mediaChannelCategories } = useMediaChannelCategory();
  const t = useTranslations("influencer");

  const mediaChannel = channelDetails.find(
    (channel) => channel?.media_channel?.id == mediaChannelId
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Spinner color="dark" />
      </div>
    );
  }
  return (
    <div className="flex justify-between items-start">
      <div className="flex w-full md:flex-row flex-col items-center gap-[20px]">
        <Image
          alt="channel avatar"
          src={
            mediaChannel?.cover_file?.link ||
            "/static/images/default-avatar.svg"
          }
          width={101}
          height={101}
          onError={(e) => {
            e.currentTarget.src = "/static/images/default-avatar.svg";
          }}
          className="size-[101px] rounded-[50%] object-cover"
        />

        <div className="flex flex-col gap-[12px] md:items-start items-center">
          <div className="flex md:flex-row flex-col items-center gap-[10px]">
            <div className="text-[28px] lg:text-[40px] font-bold truncate">
              {mediaChannel?.media_channel.title}
            </div>
            {mediaChannel?.category_ids.map((categoryID) => {
              const category = mediaChannelCategories?.find(
                (category) => category.id === categoryID
              );
              return (
                category && (
                  <CategoryBadge
                    key={categoryID}
                    name={category.name}
                    iconPath={category.icon}
                  />
                )
              );
            })}
          </div>

          <div className="flex items-center gap-[4px] text-gray400 text-[14px] font-semibold">
            {mediaChannel && (
              <SocialMediaIcon
                socialPlatform={mediaChannel?.media_channel?.media_channel_type}
                className="size-[20px]"
              />
            )}

            {t(mediaChannel?.media_channel?.media_channel_type)}
          </div>

          <div className="flex items-center gap-[6px] text-gray600 text-[14px] font-semibold">
            <div>
              {formatNumber(
                mediaChannel?.media_channel_stat.subscriber_count || 0
              )}{" "}
              {t("channelInfo.subscribers")}
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="flex-none flex bg-gray500 size-[4px] rounded-[50%]" />
              {formatNumber(
                mediaChannel?.media_channel_stat.total_post_count || 0
              )}{" "}
              {t("channelInfo.videos")}
            </div>
          </div>
        </div>
      </div>
      <Button
        href={`/influencers/channels/${mediaChannelId}/settings`}
        variant="outline"
        className="p-2 size-auto bg-transparent [&_svg]:size-[15px]"
      >
        <SettingsIcon />
      </Button>
    </div>
  );
};

export default DashboardChannelInfo;
