"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import CategoryBadge from "src/components/ui/category/category-badge";
import { liderboardGroupType } from "src/types/leadeerboard";

type Category = { id: number; name: string; icon: string };
type Row = { object_id: number | null; views_score?: number };

interface BusinessCategoriesFilterProps {
  isModal?: boolean;
  businessCategories?: Category[];
  businessRows: Row[];
  loadingCategories: boolean;
  isLoadingRows: boolean;
  selectedCategoryId: number | null;
  groupType: liderboardGroupType | null;
  onSelectCategory: (categoryId: number | null, groupType: liderboardGroupType | null) => void;
}

export const BusinessCategoriesFilter = ({
  isModal = false,
  businessCategories,
  businessRows,
  loadingCategories,
  isLoadingRows,
  selectedCategoryId,
  groupType,
  onSelectCategory,
}: BusinessCategoriesFilterProps) => {
  const t = useTranslations("leaderboard");

  const getViewsForCategory = (categoryId: number) => {
    const row = businessRows.find((r) => r.object_id === categoryId);
    return row?.views_score || 0;
  };

  const getVariant = (isActive: boolean) => {
    if (isActive) {
      return isModal ? "modalActive" : "leaderboardActive";
    }
    return isModal ? "modal" : "leaderboard";
  };

  const handleCategoryClick = (categoryId: number, isActive: boolean) => {
    const nextCategoryId = isActive ? null : categoryId;
    const nextGroupType: liderboardGroupType | null = isActive ? null : "business-category";
    onSelectCategory(nextCategoryId, nextGroupType);
  };

  const availableCategories = businessCategories?.filter((category) =>
    businessRows.some((row) => row.object_id === category.id)
  );

  const hasBusinessCategories = (availableCategories?.length ?? 0) > 0;
  const isLoading = loadingCategories || isLoadingRows;

  const headerPadding = isModal ? "px-[8px] py-[6px]" : "";
  const titleClass = isModal
    ? "text-black400"
    : "text-white text-[16px] leading-[22px]";
  const containerClass = isModal ? "flex-col" : "flex-wrap";
  const loadingTextClass = isModal ? "text-black400" : "text-white";

  if (!hasBusinessCategories) return null;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className={clsx("flex items-center gap-[14px]", headerPadding)}>
        {isModal && (
          <Image
            src="/static/icons/table-blue.svg"
            alt="Business"
            width={20}
            height={20}
            className="size-[20px]"
          />
        )}
        <h3 className={clsx("text-[14px] font-bold", titleClass)}>
          {t("businessCategory")}
        </h3>
      </div>
      <div className={clsx("flex gap-[10px]", containerClass)}>
        {isLoading ? (
          <div className={loadingTextClass}>{t("loading")}</div>
        ) : (
          availableCategories?.map((category) => {
            const isActive =
              selectedCategoryId === category.id && groupType === "business-category";
            const variant = getVariant(isActive);

            return (
              <CategoryBadge
                key={`business-${category.id}`}
                name={category.name}
                iconPath={category.icon}
                viewCount={getViewsForCategory(category.id)}
                variant={variant}
                onClick={() => handleCategoryClick(category.id, isActive)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};


