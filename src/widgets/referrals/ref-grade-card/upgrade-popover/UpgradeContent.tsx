import Image from "next/image";
import React from "react";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { AnimatedUpArrowsIcon } from "./AnimatedUpArrowsIcon";
import { useTranslations } from "next-intl";

interface IProps {
  beginnerReward: number;
  smallClipperReward: number;
}

export const UpgradeContent = ({
  beginnerReward,
  smallClipperReward,
}: IProps) => {
  const t = useTranslations("influencer.referralProgram");
  return (
    <div className="text-gray400 text-sm font-medium w-full flex flex-col gap-[12px]">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-[12px] items-center">
        <div className="p-[4px] flex flex-col border border-white50 rounded-[10px] min-w-max max-[900px]:w-full">
          <div className="p-[4px] flex items-center gap-[6px]">
            <Image
              src="/static/images/ref-grades/beginner.webp"
              alt=""
              width={22}
              height={22}
            />
            <span className="text-black400 font-[Inter] text-sm font-medium">
              {t("grades.beginner")}
            </span>
          </div>

          <div className="rounded-[10px] bg-white50 py-[4px] text-gray550 text-center text-base font-bold">
            ${formatCurrency(beginnerReward, 2)}
          </div>
        </div>

        <AnimatedUpArrowsIcon className="rotate-90" />

        <div className="p-[4px] flex flex-col border border-white50 rounded-[10px]">
          <div className="p-[4px] flex items-center gap-[6px]">
            <Image
              src="/static/images/ref-grades/small.webp"
              alt=""
              width={22}
              height={22}
            />
            <span className="text-black400 font-[Inter] text-sm font-medium">
              {t("grades.small")}
            </span>
          </div>

          <div className="rounded-[10px] relative overflow-hidden py-[4px] text-textColor text-center text-base font-bold">
            <div className="absolute inset-0 rounded-[10px] bg-white50 z-0 pointer-events-none" />
            <div className="absolute inset-0 rounded-[10px] bg-smallClipperUpgrade bg-[length:200%_100%] bg-repeat-x animate-gradient-x blur-[3px] z-0 pointer-events-none" />
            <span className="relative z-10">
              ${formatCurrency(smallClipperReward, 2)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-gray400 font-[Inter] text-sm font-medium">
        {t.rich("upgradePopoverText", {
          reward: () => (
            <strong>${formatCurrency(smallClipperReward, 2)}</strong>
          ),
          bold: (chunks) => <strong>{chunks}</strong>,
        })}
      </div>
    </div>
  );
};
