import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLeaderboardStore } from "./useLeaderboardStore";
import { liderboardPeriodType, liderboardGroupType } from "src/types/leadeerboard";

const VALID_PERIODS: liderboardPeriodType[] = ["week", "month", "year", "all"];
const VALID_GROUPS: liderboardGroupType[] = ["business-category", "media-channel-category"];

const parseSearchParams = (searchParams: URLSearchParams) => {
  const period = searchParams.get("period") as liderboardPeriodType;
  const page = searchParams.get("page");
  const categoryId = searchParams.get("category");
  const groupType = searchParams.get("group") as liderboardGroupType;

  return {
    period: period && VALID_PERIODS.includes(period) ? period : "all",
    page: page && parseInt(page) > 0 ? parseInt(page) : 1,
    categoryId: categoryId && parseInt(categoryId) > 0 ? parseInt(categoryId) : null,
    groupType: groupType && VALID_GROUPS.includes(groupType) ? groupType : null,
  };
};

const stringifyParams = (
  period: liderboardPeriodType, 
  page: number,
  categoryId: number | null,
  groupType: liderboardGroupType | null
): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (period !== "all") {
    params.set("period", period);
  }
  
  if (page > 1) {
    params.set("page", page.toString());
  }

  if (categoryId && groupType) {
    params.set("category", categoryId.toString());
    params.set("group", groupType);
  }
  
  return params;
};

export const useLeaderboardParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { period, page, selectedCategoryId, groupType, setPeriod, setPage, setCategory } = useLeaderboardStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация из URL при монтировании
  useEffect(() => {
    const params = parseSearchParams(searchParams);
    if (params.period !== period) setPeriod(params.period);
    if (params.page !== page) setPage(params.page);
    if (params.categoryId !== selectedCategoryId || params.groupType !== groupType) {
      setCategory(params.categoryId, params.groupType);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Синхронизация изменений с URL (только после инициализации)
  useEffect(() => {
    if (!isInitialized) return;

    const newParams = stringifyParams(period, page, selectedCategoryId, groupType);
    const newUrl = newParams.toString() 
      ? `${pathname}?${newParams.toString()}` 
      : pathname;

    router.replace(newUrl, { scroll: false });
  }, [period, page, selectedCategoryId, groupType, pathname, router, isInitialized]);

  return { 
    period, 
    page, 
    selectedCategoryId, 
    groupType, 
    setPeriod, 
    setPage, 
    setCategory,
    isInitialized 
  };
};

