"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import clsx from "clsx";
import FiltersIcon from "@icons/filters-icon.svg";
import ArrowIcon from "@icons/arrow-down-icon.svg";
import { Modal } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button/button";
import { useMediaQuery } from "usehooks-ts";

import { Divider } from "src/components/ui/divider";
import { useLeaderboardRowsQuery } from "src/queries/leaderboard/posts/useLeaderboardRowsQuery";
import { liderboardGroupType } from "src/types/leadeerboard";
import { useLeaderboardStore } from "./model/useLeaderboardStore";
import { useLeaderboardParams } from "./model";
import { GroupFilter } from "./filters/GroupFilter";
import { BusinessCategoriesFilter } from "./filters/BusinessCategoriesFilter";
import { ContentCategoriesFilter } from "./filters/ContentCategoriesFilter";

export type FilterType = "business" | "content" | "global";

interface FilterPanelProps {
  className?: string;
}

export const FilterPanel = ({ className }: FilterPanelProps) => {
  const t = useTranslations("leaderboard");
  const tCommon = useTranslations("common");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { period } = useLeaderboardParams();
  const pathname = usePathname();

  const {
    selectedCategoryId,
    groupType,
    setCategory,
    mediaGroup,
    setMediaGroup,
  } = useLeaderboardStore();

  const { rows: businessRows, isLoading } = useLeaderboardRowsQuery(
    "business-category",
    { period: period }
  );
  const { rows: contentRows, isLoading: isLoadingContent } =
    useLeaderboardRowsQuery("media-channel-category", {
      period: period,
    });
  const { businessCategories, loadingCategories } = useBusinessCategory();
  const { mediaChannelCategories, loadingCategories: loadingMediaCategories } =
    useMediaChannelCategory();

  const handleAllPostsClick = () => {
    if (isMediaChannelsPage) setMediaGroup("media_channel");
    setCategory(null, null);
    setIsFiltersOpen(false);
    setIsMobileModalOpen(false);
  };

  const handleFiltersClick = () => {
    if (isMobile) {
      setIsMobileModalOpen(true);
    } else {
      setIsFiltersOpen(!isFiltersOpen);
    }
  };

  const handleCategoryClick = (
    categoryId: number | null,
    groupType: liderboardGroupType | null
  ) => {
    setCategory(categoryId, groupType);
  };

  const handleApplyFilters = () => {
    setIsMobileModalOpen(false);
  };

  // Определяем, на какой странице находимся
  const isMediaChannelsPage = pathname?.includes("/leaderboard/media-channels");
  const isPostsPage = pathname?.includes("/leaderboard/posts");

  // Активности для UI
  const isAllPostsSelected = isPostsPage && selectedCategoryId === null;
  const isAllMediaChannelsSelected =
    isMediaChannelsPage &&
    selectedCategoryId === null &&
    mediaGroup === "media_channel";

  const isFiltersActivePosts = selectedCategoryId !== null;
  const isFiltersActiveMedia = mediaGroup !== "media_channel";

  // Проверяем наличие категорий для отображения
  const hasBusinessCategories =
    (businessCategories?.filter((category) =>
      businessRows.some((row) => row.object_id === category.id)
    ).length ?? 0) > 0;

  const hasContentCategories =
    (mediaChannelCategories?.filter((category) =>
      contentRows.some((row) => row.object_id === category.id)
    ).length ?? 0) > 0;

  // Есть ли хоть какие-то категории
  const hasAnyCategories = hasBusinessCategories || hasContentCategories;

  // Показываем фильтры: на posts — по наличию категорий, на media-channels — всегда
  const shouldShowFiltersPosts =
    isLoading ||
    isLoadingContent ||
    loadingCategories ||
    loadingMediaCategories ||
    hasAnyCategories;
  const shouldShowFilters = isMediaChannelsPage ? true : shouldShowFiltersPosts;

  return (
    <>
      <div className={clsx("flex flex-col gap-[24px]", className)}>
        {/* Кнопки переключения */}
        <div className="flex gap-[10px]">
          <button
            onClick={handleAllPostsClick}
            className={clsx(
              "flex items-center gap-[6px] px-[6px] py-[6px] rounded-[8px] text-[14px] font-semibold transition-all",
              isAllPostsSelected || isAllMediaChannelsSelected
                ? "bg-white text-black1000"
                : "bg-black500 text-gray300"
            )}
          >
            {isPostsPage ? t("allPosts") : t("allChannels")}
          </button>

          {shouldShowFilters && (
            <button
              onClick={handleFiltersClick}
              className={clsx(
                "flex items-center gap-[6px] px-[6px] py-[6px] rounded-[8px] text-[14px] font-semibold transition-all",
                isMediaChannelsPage
                  ? isFiltersActiveMedia
                    ? "bg-white text-black1000"
                    : "bg-black500 text-gray300"
                  : isFiltersActivePosts
                  ? "bg-white text-black1000"
                  : "bg-black500 text-gray300"
              )}
            >
              <FiltersIcon className="w-[16px] h-[16px]" />
              {t("filters")}
              <ArrowIcon
                className={clsx(
                  "w-[14px] h-[14px] transition-transform rotate-[-90deg]",
                  isFiltersOpen && "rotate-[360deg]"
                )}
              />
            </button>
          )}
        </div>

        {/* Контент фильтров с плавной анимацией (только на десктопе) */}
        {!isMobile && shouldShowFilters && (
          <div
            className={clsx(
              "transition-all duration-300 ease-in-out",
              isFiltersOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {isMediaChannelsPage ? (
              <div className="flex flex-col gap-[32px]">
                <GroupFilter
                  isModal={false}
                  mediaGroup={mediaGroup}
                  setMediaGroup={setMediaGroup}
                />
                <ContentCategoriesFilter
                  isModal={false}
                  mediaChannelCategories={mediaChannelCategories}
                  contentRows={contentRows}
                  loadingMediaCategories={loadingMediaCategories}
                  isLoadingContentRows={isLoadingContent}
                  selectedCategoryId={selectedCategoryId}
                  groupType={groupType}
                  onSelectCategory={handleCategoryClick}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-[32px]">
                <BusinessCategoriesFilter
                  isModal={false}
                  businessCategories={businessCategories}
                  businessRows={businessRows}
                  loadingCategories={loadingCategories}
                  isLoadingRows={isLoading}
                  selectedCategoryId={selectedCategoryId}
                  groupType={groupType}
                  onSelectCategory={handleCategoryClick}
                />
                <ContentCategoriesFilter
                  isModal={false}
                  mediaChannelCategories={mediaChannelCategories}
                  contentRows={contentRows}
                  loadingMediaCategories={loadingMediaCategories}
                  isLoadingContentRows={isLoadingContent}
                  selectedCategoryId={selectedCategoryId}
                  groupType={groupType}
                  onSelectCategory={handleCategoryClick}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Мобильная модалка с фильтрами */}
      {shouldShowFilters && (
        <Modal
          open={isMobileModalOpen}
          setIsOpen={setIsMobileModalOpen}
          title={tCommon("filters")}
          className="space-y-[12px]"
          withCross
          mobileBreakpoint={768}
          renderFooter={() => (
            <Button onClick={handleApplyFilters} className="w-full">
              {tCommon("apply")}
            </Button>
          )}
        >
          {isMediaChannelsPage ? (
            <div className="flex flex-col gap-[32px]">
              <GroupFilter
                isModal={true}
                mediaGroup={mediaGroup}
                setMediaGroup={setMediaGroup}
              />
              <ContentCategoriesFilter
                isModal={true}
                mediaChannelCategories={mediaChannelCategories}
                contentRows={contentRows}
                loadingMediaCategories={loadingMediaCategories}
                isLoadingContentRows={isLoadingContent}
                selectedCategoryId={selectedCategoryId}
                groupType={groupType}
                onSelectCategory={handleCategoryClick}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-[32px]">
              <BusinessCategoriesFilter
                isModal={true}
                businessCategories={businessCategories}
                businessRows={businessRows}
                loadingCategories={loadingCategories}
                isLoadingRows={isLoading}
                selectedCategoryId={selectedCategoryId}
                groupType={groupType}
                onSelectCategory={handleCategoryClick}
              />
              {hasBusinessCategories && hasContentCategories && (
                <Divider color="#DFE3EA" />
              )}
              <ContentCategoriesFilter
                isModal={true}
                mediaChannelCategories={mediaChannelCategories}
                contentRows={contentRows}
                loadingMediaCategories={loadingMediaCategories}
                isLoadingContentRows={isLoadingContent}
                selectedCategoryId={selectedCategoryId}
                groupType={groupType}
                onSelectCategory={handleCategoryClick}
              />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
