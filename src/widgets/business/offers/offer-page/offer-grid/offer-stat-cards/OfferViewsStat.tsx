"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import {  OfferBusinessType } from "src/types/offers";

interface IProps {
  statictic?: OfferBusinessType["statictic"];
}

export const OfferViewsStat = ({ statictic }: IProps) => {
  const t = useTranslations("business");
  return (
    <div className="shadow-statCardShadow rounded-[8px] bg-white flex flex-col justify-between p-[16px]">
      <div className="flex gap-[24px] justify-between items-start">
        <div className="flex flex-col gap-[18px]">
          <span className="text-gray400 text-base font-bold">
            {t("offer.totalViews")}
          </span>
          <span className="text-[28px] font-bold">
            {formatCurrency(statictic?.views_count || 0)}
          </span>
        </div>

        <Image
          src="/static/images/stats/eye-purple.svg"
          alt=""
          width={60}
          height={60}
        />
      </div>

      {/* <div className="flex items-center justify-between text-gray600 text-base font-medium">
        <div>{t("offer.goal")}</div>
        <div>
          {formatCurrency(offer?.ad_offer.min_avg_view_for_post_count)}{" "}
          -{" "}
          {formatCurrency(offer?.ad_offer.max_avg_view_for_post_count)}
        </div>
      </div> */}
    </div>
  );
};
