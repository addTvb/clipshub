"use client";

import clsx from "clsx";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { OfferSetStatusType } from "src/types/offers";

interface IProps {
  status?: OfferSetStatusType;
}

const styles = {
  moderated: "bg-[#00B69B] text-white",
  moderating: "bg-[#E6EBF2] text-gray400", 
  draft: "bg-[#E6EBF2] text-gray400",
  closed: "bg-[#E6EBF2] text-gray400",
  paused: "bg-[#E6EBF2] text-gray400",
  rejected: "bg-[#E6EBF2] text-gray400",
};

export const OfferStatusBadge = memo(({ status }: IProps) => {
  const t = useTranslations();

  if (status)
    return (
      <span
        className={clsx(
          "capitalize py-[4px] px-[6px] rounded-[8px] text-sm lg:text-base font-bold",
          styles[status]
        )}
      >
        {t(`business.offer.statuses.${status}`)}
      </span>
    );
});
OfferStatusBadge.displayName = "OfferStatusBadge";
