import { create } from "zustand";
import { liderboardPeriodType, liderboardGroupType, LeaderboardGroupType } from "src/types/leadeerboard";

interface LeaderboardState {
  period: liderboardPeriodType;
  page: number;
  per_page: number;
  selectedCategoryId: number | null;
  groupType: liderboardGroupType | null;
  mediaGroup: LeaderboardGroupType;
  setPeriod: (period: liderboardPeriodType) => void;
  setPage: (page: number) => void;
  setCategory: (categoryId: number | null, groupType: liderboardGroupType | null) => void;
  setMediaGroup: (group: LeaderboardGroupType) => void;
  reset: () => void;
}

const DEFAULT_PERIOD: liderboardPeriodType = "all";
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const useLeaderboardStore = create<LeaderboardState>()((set) => ({
  period: DEFAULT_PERIOD,
  page: DEFAULT_PAGE,
  per_page: DEFAULT_PER_PAGE,
  selectedCategoryId: null,
  groupType: null,
  mediaGroup: "media_channel",

  setPeriod: (period) =>
    set({ period, page: DEFAULT_PAGE }), // Сброс страницы при смене периода

  setPage: (page) => set({ page }),

  setCategory: (categoryId, groupType) =>
    set({ selectedCategoryId: categoryId, groupType, page: DEFAULT_PAGE }), // Сброс страницы при смене категории

  setMediaGroup: (group) => set({ mediaGroup: group, page: DEFAULT_PAGE }),

  reset: () =>
    set({
      period: DEFAULT_PERIOD,
      page: DEFAULT_PAGE,
      per_page: DEFAULT_PER_PAGE,
      selectedCategoryId: null,
      groupType: null,
      mediaGroup: "media_channel",
    }),
}));

