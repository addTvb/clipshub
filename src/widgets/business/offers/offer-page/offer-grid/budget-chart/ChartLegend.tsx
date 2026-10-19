"use client";

import { clsx } from "clsx";
import { LegendProps } from "recharts";
import { LegendKey } from "./types";
import { LEGEND_TITLES, LEGEND_COLORS } from "./constants";

export const ChartLegend = ({ payload }: Pick<LegendProps, "payload">) => {
  if (!payload) return null;

  return (
    <div className="flex justify-center items-center gap-8">
      {payload.map(({ value }) => {
        const key = value as LegendKey;
        return (
          <div key={key} className="flex items-center gap-2">
            <div
              className={clsx(
                "w-[23px] h-[5px] bg-gradient-to-r rounded-full",
                LEGEND_COLORS[key].from,
                LEGEND_COLORS[key].to
              )}
            />
            <span className="text-xs font-medium text-[#45445980]">
              {LEGEND_TITLES[key]}
            </span>
          </div>
        );
      })}
    </div>
  );
};
