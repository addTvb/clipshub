"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import clsx from "clsx";
import { InfoPopover } from "src/components/ui/info-popover";

interface IProps {
  title?: string;
}

export const HalfScreenPositionSelector = ({ title }: IProps) => {
  const t = useTranslations();

  const [adPositions] = useState(() => {
    return [
      { position: "top", isSelected: false },
      { position: "bottom", isSelected: true },
    ];
  });

  return (
    <div className="space-y-[16px]">
      <div className="flex gap-[6px] items-center">
        <span className="text-textColor text-base font-bold">
          {title ?? t("business.offerForm.choosePositionAdHalfScreen")}
        </span>
        <InfoPopover>{t("business.offerForm.halfScreenAdPopover")}</InfoPopover>
      </div>
      <div className="flex items-center flex-col gap-[12px] sm:gap-[32px] sm:flex-row">
        <div className="relative flex flex-col w-fit gap-[8px] border border-[#DFE3EA] bg-white50 rounded-[8px] py-[12px] px-[6px]">
          <div className="absolute bg-gray300 w-[14px] h-[4px] top-[3px] left-[50%] -translate-x-[50%] rounded-full" />
          {adPositions.map((buttonState) => (
            <span
              className={clsx(
                "h-[47px] w-[66px] lg:h-[32px] lg:w-[46px] rounded-[8px] lg:rounded-[6px] transition-shadow text-xs font-semibold",
                buttonState.isSelected
                  ? "bg-[#3188AA] text-white"
                  : "bg-[#DFE3EA] text-gray600"
              )}
              key={`half-ad-position-${buttonState.position}`}
            />
          ))}
          <div className="absolute bg-gray300 w-[22px] h-[2px] bottom-[3px] left-[50%] -translate-x-[50%] rounded-full" />
        </div>
        <div className="capitalize text-base text-gray400 font-bold">
          {t("business.offerForm.bottom")}
        </div>
      </div>
    </div>
  );
};
