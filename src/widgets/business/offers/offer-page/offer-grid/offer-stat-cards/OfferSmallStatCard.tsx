"use client";

import Image from "next/image";
import { socialPlatformIcons } from "../../../create-offer/form-steps/fifth-step/OfferDetails";
import { useTranslations } from "next-intl";

const titles = {
  socialPlatform: "offerForm.social",
  cpm: "offer.cpmTitle",
  maxPayPerPost: "offer.maxPayPerPostTitle",
};
const icons = {
  socialPlatform: "/static/images/stats/smile-blue.svg",
  cpm: "/static/images/stats/eye-dollar-pink.svg",
  maxPayPerPost: "/static/images/stats/image-dollar-yellow.svg",
};
interface IProps {
  cardType: "socialPlatform" | "cpm" | "maxPayPerPost";
  value: string | number;
}

export const OfferSmallStatCard = ({ cardType, value }: IProps) => {
  const t = useTranslations("business");
  return (
    <div className="rounded-[8px] shadow-statCardShadow p-[16px] bg-white flex items-start justify-between">
      <div className="flex flex-col h-full justify-between gap-[15px]">
        <div>{t(titles[cardType])}</div>
        {cardType === "socialPlatform" ? (
          <div className="flex items-center gap-[8px] capitalize text-xl font-bold">
            <Image
              src={socialPlatformIcons[value] || null}
              alt=""
              width={24}
              height={24}
            />
            <span>{value}</span>
          </div>
        ) : (
          <div className="text-[28px]">{value}</div>
        )}
      </div>

      <Image src={icons[cardType]} alt="" width={60} height={60} />
    </div>
  );
};
