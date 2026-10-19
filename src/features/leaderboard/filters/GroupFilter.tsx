"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { LeaderboardGroupType } from "src/types/leadeerboard";
import CategoryBadge from "src/components/ui/category/category-badge";
import { useLeaderboardStore } from "../model/useLeaderboardStore";

interface GroupFilterProps {
  isModal?: boolean;
  mediaGroup: LeaderboardGroupType;
  setMediaGroup: (value: LeaderboardGroupType) => void;
}

export const GroupFilter = ({ isModal = false, mediaGroup, setMediaGroup }: GroupFilterProps) => {
  const t = useTranslations("leaderboard");
  const { groupType, setCategory } = useLeaderboardStore();

  const GROUP_OPTIONS: { value: LeaderboardGroupType; label: string }[] = [
    // { value: "media_channel", label: t("allChannels") },
    { value: "youtube_platform", label: "YouTube" },
    { value: "tiktok_platform", label: "TikTok" },
    { value: "instagram_platform", label: "Instagram" },
    // { value: "media_channel_content_category", label: t("contentCategory") },
  ];

  const PLATFORM_GROUPS: LeaderboardGroupType[] = [
    "youtube_platform",
    "tiktok_platform",
    "instagram_platform",
    "media_channel",
  ];

  const getVariant = (isActive: boolean) => {
    if (isActive) {
      return isModal ? "modalActive" : "leaderboardActive";
    }
    return isModal ? "modal" : "leaderboard";
  };

  const handleOptionClick = (optionValue: LeaderboardGroupType) => {
    const isActive = mediaGroup === optionValue;

    // Обратное отщелкивание — возврат к дефолтной группе
    if (isActive && optionValue !== "media_channel") {
      setMediaGroup("media_channel");
      return;
    }

    // Если был выбран контент-категория фильтр, а пользователь переключается на платформу — сбрасываем категорию
    const isSwitchingToPlatform = PLATFORM_GROUPS.includes(optionValue);
    const hasContentCategorySelected = groupType === "media_channel_content_category";

    if (isSwitchingToPlatform && hasContentCategorySelected) {
      setCategory(null, null);
    }

    setMediaGroup(optionValue);
  };

  const gapClass = isModal ? "gap-[12px]" : "gap-[16px]";
  const containerClass = isModal ? "flex-col" : "flex-wrap";
  const headerPadding = isModal ? "py-[6px]" : "";
  const titleClass = isModal
    ? "text-black400"
    : "text-white text-[16px] leading-[22px]";

  return (
    <div className={clsx("flex flex-col", gapClass)}>
      <div className={clsx("flex items-center gap-[14px]", headerPadding)}>
        <h3 className={clsx("text-[14px] font-bold", titleClass)}>{t("group")}</h3>
      </div>
      <div className={clsx("flex gap-[10px]", containerClass)}>
        {GROUP_OPTIONS.map((option) => {
          const isActive = mediaGroup === option.value;
          const variant = getVariant(isActive);

          return (
            <CategoryBadge
              key={option.value}
              name={option.label}
              iconPath=""
              variant={variant}
              onClick={() => handleOptionClick(option.value)}
            />
          );
        })}
      </div>
    </div>
  );
};


