"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const statIcons = {
  influencers: "/static/images/stats/man-blue.svg",
  totalPosts: "/static/images/stats/image-yellow.svg",
  totalViews: "/static/images/stats/eye-purple.svg",
  spent: "/static/images/stats/cash-cyan.svg",
};

type StatCardType = "influencers" | "totalPosts" | "totalViews" | "spent";

interface IProps {
  cardType: StatCardType;
  value: string | number;
  subValue?: string | number;
}

export const CampaignStatCard = ({ cardType, value, subValue }: IProps) => {
  const t = useTranslations("business");

  return (
    <div className="flex flex-col gap-[24px] h-full w-full max-w-full md:max-w-[342px] min-h-[162px] max-h-[162px] rounded-[6px] shadow-statCardShadow bg-white p-[16px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[19px]">
          <div className="text-gray400 text-base font-bold">{t(cardType)}</div>
          <div className="text-[28px] font-bold text-textColor">{value}</div>
        </div>

        <Image
          src={statIcons[cardType]}
          alt=""
          width={60}
          height={60}
          className="rounded-[10px] w-[60px] h-[60px]"
        />
      </div>

      {subValue && (
        <div className="font-semibold text-gray600 text-base">{subValue}</div>
      )}
    </div>
  );
};
