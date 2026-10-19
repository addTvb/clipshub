"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Progress } from "src/components/ui/progress";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import {
  AdOfferDetailForBusiness,
  OfferBusinessType,
} from "src/types/offers";
import { InfoPopover } from "src/components/ui/info-popover";

interface IProps {
  offerDetail: AdOfferDetailForBusiness;
  payment_summary?: OfferBusinessType["payment_summary"];
}

export const OfferBudgetStat = ({
  offerDetail,
  payment_summary,
}: IProps) => {
  const t = useTranslations("business");

  const paidSum = payment_summary?.paid_sum || 0;
  const reservedSum = payment_summary?.reserved_sum || 0;
  const budget = offerDetail.pricing.budget || 0;
  const spent = paidSum + reservedSum;
  const unallocated = budget - spent;

  return (
    <div className="shadow-statCardShadow rounded-[8px] bg-white flex flex-col justify-between p-[16px]">
      <div className="flex gap-[24px] justify-between items-start">
        <div className="flex flex-col gap-[18px]">
          <span className="text-gray400 text-base font-bold">
            {t("offer.spent")}
          </span>
          <span className="text-[28px] font-bold">
            {budget && budget > 0
              ? `$${formatCurrency(spent)} / $${formatCurrency(budget)}`
              : `$${formatCurrency(spent)}`}
          </span>
        </div>

        <Image
          src="/static/images/stats/cash-cyan.svg"
          alt=""
          width={60}
          height={60}
        />
      </div>

      <Progress
        max={!budget || spent > budget ? spent : budget}
        segments={[
          {
            value: reservedSum,
            color: "#ABAEFF",
          },
          {
            value: paidSum,
            color: "#F8D47A",
          },
        ]}
      />

      <div className="flex items-center justify-between mt-[10px]">
        <div className="text-gray600 text-base font-medium flex items-center gap-[6px]">
          <span>{t("offer.reserve")}</span>

          <InfoPopover>{t("offer.reservePopoverText")}</InfoPopover>
        </div>

        <div className="flex gap-[12px] items-center">
          <span className="text-gray600 text-sm font-bold">
            ${formatCurrency(reservedSum)}
          </span>
          <span className="rounded-full bg-[#ABAEFF] w-[16px] h-[6px]" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray600 text-base font-medium">
          {t("offer.spent")}
        </div>

        <div className="flex gap-[12px] items-center">
          <span className="text-gray600 text-sm font-bold">
            ${formatCurrency(paidSum)}
          </span>
          <span className="rounded-full bg-[#F8D47A] w-[16px] h-[6px]" />
        </div>
      </div>

      {!!budget && (
        <div className="flex items-center justify-between">
          <div className="text-gray600 text-base font-medium">
            {unallocated < 0 ? t("offer.overspent") : t("offer.unallocated")}
          </div>

          <div className="flex gap-[12px] items-center">
            <span className="text-gray600 text-sm font-bold">
              ${formatCurrency(unallocated)}
            </span>
            <span className="rounded-full bg-[#DFE3EA] w-[16px] h-[6px]" />
          </div>
        </div>
      )}
    </div>
  );
};
