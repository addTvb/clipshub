import { LegendKey } from "./types";

export const CHART_DATA = [
  { day: 1, budget: 0, views: 0 },
  { day: 2, budget: 120, views: 85000 },
  { day: 3, budget: 200, views: 220000 },
  { day: 4, budget: 300, views: 300000 },
  { day: 5, budget: 350, views: 420000 },
  { day: 6, budget: 400, views: 380000 },
  { day: 7, budget: 420, views: 470000 },
  { day: 8, budget: 450, views: 490000 },
  { day: 9, budget: 480, views: 495000 },
  { day: 10, budget: 500, views: 500000 },
];

export const LEGEND_TITLES: Record<LegendKey, string> = {
  budget: "Budget Spent ($)",
  views: "Views",
};

export const LEGEND_COLORS: Record<LegendKey, { from: string; to: string }> = {
  budget: { from: "from-[#f8d47a]", to: "to-[#f8d47a]" },
  views: { from: "from-[#FF9364]", to: "to-[#F25F33]" },
};
