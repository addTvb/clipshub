"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

import { liderboardPeriodType } from "src/types/leadeerboard";
import { useLeaderboardParams } from "./model";

interface Iprops {
  className?: string;
}

const PERIODS: { value: liderboardPeriodType; label: string }[] = [
  { value: "week", label: "weekly" },
  { value: "month", label: "monthly" },
  { value: "year", label: "year" },
  { value: "all", label: "allTime" },
];

export const PeriodTabs = ({ className }: Iprops) => {
  const t = useTranslations("leaderboard");
  const { period, setPeriod } = useLeaderboardParams();

  return (
    <div
      className={clsx(
        "backdrop-blur-[10.45px] backdrop-filter bg-[#12162d] flex gap-[6px] p-[6px] rounded-[36px] sm:w-fit w-full",
        className
      )}
    >
      {PERIODS.map((periodItem) => (
        <button
          key={periodItem.value}
          onClick={() => setPeriod(periodItem.value)}
          className={clsx(
            "whitespace-nowrap sm:w-fit w-full text-white sm:text-[16px] text-[14px] font-bold leading-[22px] px-[12px] py-[6px] rounded-[22px] transition-all duration-200",
            period === periodItem.value ? "bg-blue300" : "hover:bg-blue300/50"
          )}
        >
          {t(periodItem.label)}
        </button>
      ))}
    </div>
  );
};
