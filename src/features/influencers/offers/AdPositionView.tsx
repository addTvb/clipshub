"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import { AdPosition } from "src/features/business/offers/model/useAdPositionSelectorState";

interface IProps {
  position: AdPosition;
  title?: string;
}

export const AdPositionView = ({ position, title }: IProps) => {
  const t = useTranslations();

  const adPositions = [
    "left-top",
    "right-top",
    "left-center",
    "right-center",
    "left-bottom",
    "right-bottom",
  ];

  const isSelected = (pos: string) => {
    if (position === "top" && pos.includes("top")) return true;
    if (position === "center" && pos.includes("center")) return true;
    if (position === "bottom" && pos.includes("bottom")) return true;

    return position === pos;
  };

  return (
    <div className="space-y-[16px]">
      {/* {title ? (
        <span className="text-textColor text-base font-bold">
          {title ?? t("business.offerForm.choosePositionAdHalfScreen")}
        </span>
      ) : ( */}
      <div className="space-y-[10px]">

        <span className="text-textColor text-base font-bold">
          {title ?? t("influencer.takeOfferForm.positionAd")}
        </span>
        <div className="flex gap-[6px] items-center">
          <span className="text-gray600 text-[14px] font-[500] md:block hidden font-[Inter]">
            {t("influencer.takeOfferForm.makeSurePlacementMeetsRequirement")}
            <span className="font-bold">
              {<b className="capitalize">{position?.split("-").join(" ")}</b>}
            </span>
          </span>
        </div>
      </div>
      {/* )} */}

      <div className="flex items-center flex-col gap-[12px] sm:gap-[32px] sm:flex-row">
        <div className="relative grid grid-cols-2 grid-rows-3 w-fit gap-[6px] border border-[#DFE3EA] bg-white50 rounded-[8px] py-[12px] px-[6px]">
          <div className="absolute bg-gray300 w-[14px] h-[4px] top-[3px] left-[22px] rounded-full" />
          {adPositions.map((pos) => (
            <div
              className={clsx(
                "h-[20px] w-[20px] rounded-[6px]",
                isSelected(pos) ? "bg-[#3188AA]" : "bg-[#DFE3EA]"
              )}
              key={`ad-position-${pos}`}
            />
          ))}
          <div className="absolute bg-gray300 w-[22px] h-[2px] bottom-[3px] left-[18px] rounded-full" />
        </div>

        <div className="capitalize text-base text-gray400 font-bold">
          {position?.split("-").join(" ")}
        </div>
      </div>
    </div>
  );
};
