"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { LEGEND_COLORS } from "./constants";
import { useTranslations } from "next-intl";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { formatNumber } from "src/lib/numbers/formatNumber";

export const ChartTooltip = ({ active, payload }: any) => {
  const t = useTranslations("business");
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-[4px] rounded-[8px] border border-[#DFE3EA] py-[6px] px-[12px] bg-white50 ">
        <div className="flex justify-between gap-[15px] items-center text-sm py-[6px]">
          <div className="text-[#96A1C6] font-medium">{t("budgetDollar")}</div>
          <div className="text-[#f8d47a] font-bold flex items-center gap-[12px]">
            <span>{formatCurrency(payload[0].value)}</span>

            <div
              className={clsx(
                "w-[23px] h-[5px] bg-gradient-to-r rounded-full",
                LEGEND_COLORS.budget.from,
                LEGEND_COLORS.budget.to
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-[15px] items-center text-sm py-[6px]">
          <div className="text-[#96A1C6] font-medium">{t("offer.views")}</div>
          <div className="text-[#F97C4E] font-bold flex items-center gap-[12px]">
            <span>{formatNumber(payload[1].value)}</span>

            <div
              className={clsx(
                "w-[23px] h-[5px] bg-gradient-to-r rounded-full",
                LEGEND_COLORS.views.from,
                LEGEND_COLORS.views.to
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
