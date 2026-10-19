import { useTranslations } from "next-intl";
import Image from "next/image";
import { Avatar } from "src/features/auth/Avatar";
import { formatNumberWithSpaces } from "src/lib/numbers/formatNumberWithSpaces";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { DictionaryType } from "src/types/category";
import { LeaderboardMediaChannelItem } from "src/types/leadeerboard";
import { socialPlatformIconsWithText } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";

interface IProps {
  mediaChannel: LeaderboardMediaChannelItem;
  index: number;
}

export const MediaChannelCard = ({ mediaChannel, index }: IProps) => {
  const t = useTranslations();
  const { mediaChannelCategories } = useMediaChannelCategory();

  const getCategory = (categoryID: number): DictionaryType | null => {
    const arr = mediaChannelCategories?.filter(
      (category) => category.id === categoryID
    );
    return arr && arr.length > 0 ? arr[0] : null;
  };

  const category = getCategory(mediaChannel?.content_category_id);

  return (
    <div className="flex flex-col gap-[8px] p-[10px] bg-white rounded-[12px]">
      {/* Header with position, avatar, nickname and platform */}
      <div className="flex items-center gap-[12px] p-[4px_12px_4px_8px] bg-white rounded-[8px]">
        <div className="flex items-center gap-[12px] flex-1">
          <span className="text-gray350 font-bold text-[14px]">
            /{index + 4}
          </span>
          <div className="flex items-center gap-[6px]">
            <Avatar
              src={mediaChannel?.user_avatar?.link}
              alt=""
              width={44}
              height={44}
            />
            <span className="text-black400 font-medium text-[14px]">
              {mediaChannel?.user_masked_nick}
            </span>
          </div>
        </div>
        <Image
          src={socialPlatformIconsWithText[mediaChannel?.platform]}
          alt=""
          width={53}
          height={16}
        />
      </div>

      {/* Stats section */}
      <div className="flex flex-col">
        {/* Views */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-t-[8px]">
          <span className="text-gray350 font-semibold text-[13px] flex-1">
            {t("leaderboard.table.views")}
          </span>
          <div className="flex items-center gap-[4px]">
            <Image
              src="/static/icons/eye-gray.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="text-black400 font-medium text-[14px]">
              {formatNumberWithSpaces(mediaChannel?.views)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Qty Posts */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 ">
          <span className="text-gray350 font-semibold text-[13px] flex-1">
            {t("leaderboard.table.qtyPosts")}
          </span>
          <div className="flex items-center gap-[4px]">
            <Image
              src="/static/icons/hashtag-gray.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="text-black400 font-medium text-[14px]">
              {formatNumberWithSpaces(mediaChannel?.posts_count)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Content Category */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50">
          <span className="text-gray350 font-semibold text-[13px] flex-1">
            {t("leaderboard.table.contentCategory")}
          </span>
          <div className="flex items-center gap-[4px]">
            <Image src={category?.icon || ""} alt="" width={16} height={16} />
            <span className="text-black400 font-medium text-[14px]">
              {category ? category?.name : "-"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Paid */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-b-[8px]">
          <span className="text-gray350 font-semibold text-[13px] flex-1">
            {t("leaderboard.table.paid")}
          </span>
          <span className="cash-bg-clip font-bold text-[14px]">
            ${formatNumberWithSpaces(mediaChannel?.cash)} USD
          </span>
        </div>
      </div>
    </div>
  );
};
