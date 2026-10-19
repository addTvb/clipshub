"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import CategoryBadge from "src/components/ui/category/category-badge";
import { liderboardGroupType } from "src/types/leadeerboard";
import { useLeaderboardStore } from "../model/useLeaderboardStore";
import { usePathname } from "next/navigation";

type Category = { id: number; name: string; icon: string };
type Row = { object_id: number | null; views_score?: number };

interface ContentCategoriesFilterProps {
  isModal?: boolean;
  mediaChannelCategories?: Category[];
  contentRows: Row[];
  loadingMediaCategories: boolean;
  isLoadingContentRows: boolean;
  selectedCategoryId: number | null;
  groupType: liderboardGroupType | null;
  onSelectCategory: (categoryId: number | null, groupType: liderboardGroupType | null) => void;
}

export const ContentCategoriesFilter = ({
  isModal = false,
  mediaChannelCategories,
  contentRows,
  loadingMediaCategories,
  isLoadingContentRows,
  selectedCategoryId,
  groupType,
  onSelectCategory,
}: ContentCategoriesFilterProps) => {
  const t = useTranslations("leaderboard");
  const { setMediaGroup } = useLeaderboardStore();
  const pathname = usePathname();
  const isMediaChannelsPage = pathname?.includes("/leaderboard/media-channels");

  const getViewsForCategory = (categoryId: number) => {
    const row = contentRows.find((r) => r.object_id === categoryId);
    return row?.views_score || 0;
  };

  const hasContentCategories =
    (mediaChannelCategories?.filter((category) =>
      contentRows.some((row) => row.object_id === category.id)
    ).length ?? 0) > 0;

  if (!hasContentCategories) return null;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className={clsx("flex items-center gap-[14px]", isModal && "px-[8px] py-[6px]")}>
        {isModal && (
          <Image
            src="/static/icons/category-influencer.svg"
            alt="Content"
            width={20}
            height={20}
            className="size-[20px]"
          />
        )}
        <h3
          className={clsx(
            "text-[14px] font-bold",
            isModal ? "text-black400" : "text-white text-[16px] leading-[22px]"
          )}
        >
          {t("contentCategory")}
        </h3>
      </div>
      <div className={clsx("flex gap-[10px]", isModal ? "flex-col" : "flex-wrap")}>
        {loadingMediaCategories || isLoadingContentRows ? (
          <div className={isModal ? "text-black400" : "text-white"}>{t("loading")}</div>
        ) : (
          mediaChannelCategories
            ?.filter((category) => contentRows.some((row) => row.object_id === category.id))
            ?.map((category) => {
              const isContentGroup =
                groupType === "media_channel_content_category" || groupType === "media-channel-category";
              const isActive = selectedCategoryId === category.id && isContentGroup;

              const variant = isActive
                ? isModal
                  ? "modalActive"
                  : "leaderboardActive"
                : isModal
                ? "modal"
                : "leaderboard";

              const handleClick = () => {
                const nextCategoryId = isActive ? null : category.id;
                const nextGroup: liderboardGroupType | null = isActive
                  ? null
                  : isMediaChannelsPage
                  ? "media_channel_content_category"
                  : "media-channel-category";

                if (!isActive && isMediaChannelsPage) {
                  // На странице media-channels также синхронизируем групповой фильтр
                  setMediaGroup("media_channel_content_category");
                }

                onSelectCategory(nextCategoryId, nextGroup);
              };

              return (
                <CategoryBadge
                  key={`content-${category.id}`}
                  name={category.name}
                  iconPath={category.icon}
                  viewCount={getViewsForCategory(category.id)}
                  variant={variant}
                  onClick={handleClick}
                />
              );
            })
        )}
      </div>
    </div>
  );
};


