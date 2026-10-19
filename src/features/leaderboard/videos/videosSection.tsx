"use client";

import { useMemo } from "react";
import { VideoCard } from "./components/VideoCard";
import { LeaderboardPost } from "src/types/leadeerboard";
import { PaginationType } from "src/types/base";
import { LeaderboardPagination } from "../LeaderboardPagination";
import { VideoCardSkeleton } from "./VideoCardSkeleton";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useTranslations } from "next-intl";
import { createCategoryMap } from "src/lib/dictionaries/createCategoryMap";

interface VideosSectionProps {
  posts: LeaderboardPost[];
  paginate?: PaginationType;
  isLoading?: boolean;
}

export default function VideosSection({
  posts,
  paginate,
  isLoading = false,
}: VideosSectionProps) {
  const { businessCategories } = useBusinessCategory();
  const { mediaChannelCategories } = useMediaChannelCategory();
  const tLeaderboard = useTranslations("leaderboard");
  const tCommon = useTranslations("common");

  const translations = useMemo(
    () => ({
      placeSuffix: tLeaderboard("placeSuffix"),
      contentCategory: tLeaderboard("contentCategory"),
      businessCategory: tLeaderboard("businessCategory"),
      offer: tLeaderboard("offer"),
      back: tCommon("back"),
    }),
    [tCommon, tLeaderboard]
  );

  const businessCategoryMap = useMemo(
    () => createCategoryMap(businessCategories),
    [businessCategories]
  );

  const mediaChannelCategoryMap = useMemo(
    () => createCategoryMap(mediaChannelCategories),
    [mediaChannelCategories]
  );

  return (
    <div
      id="videos-section"
      className="max-w-screenMaxWidth w-full mx-auto px-[10px] flex flex-col gap-[24px]"
    >
      {/* 
        Адаптивная сетка с автоматической подстройкой количества колонок:
        - mobile (< 640px):    3 колонки × 5 рядов = 15 видео/страница
        - sm (640-876px):      4 колонки × 5 рядов = 20 видео/страница
        - grid-5 (876-1024px): 5 колонок × 5 рядов = 25 видео/страница (кастомный брейкпоинт)
        - lg (1024-1280px):    6 колонок × 5 рядов = 30 видео/страница
        - xl (1280-1536px):    7 колонок × 5 рядов = 35 видео/страница
        - 2xl (> 1536px):      8 колонок × 5 рядов = 40 видео/страница
        
        Карточки автоматически заполняют доступное пространство, 
        но не превышают max-w-[200px] для сохранения пропорций
      */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 grid-5:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[6px] grid-5:gap-[12px] auto-rows-min">
        {isLoading
          ? // Показываем максимум скелетонов (40 = 8 колонок × 5 рядов)
            // CSS скрывает лишние через nth-child в зависимости от breakpoint
            Array.from({ length: 40 }).map((_, index) => (
              <VideoCardSkeleton
                key={`skeleton-${index}`}
                className={`
                ${index >= 15 ? "hidden sm:block" : ""}
                ${index >= 20 ? "sm:hidden grid-5:block" : ""}
                ${index >= 25 ? "grid-5:hidden lg:block" : ""}
                ${index >= 30 ? "lg:hidden xl:block" : ""}
                ${index >= 35 ? "xl:hidden 2xl:block" : ""}
              `}
              />
            ))
          : // Показываем реальные карточки
            posts?.map((post) => (
              <VideoCard
                key={
                  post?.post?.id ??
                  post?.media_channel_post?.id ??
                  post?.place ??
                  ""
                }
                post={post}
                translations={translations}
                businessCategoryMap={businessCategoryMap}
                mediaChannelCategoryMap={mediaChannelCategoryMap}
              />
            ))}
      </div>

      {paginate && paginate?.total_pages > 1 && (
        <div className="flex justify-center">
          <LeaderboardPagination paginate={paginate} />
        </div>
      )}
    </div>
  );
}
