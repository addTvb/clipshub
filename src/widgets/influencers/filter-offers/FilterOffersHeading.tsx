"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";
import { formatCurrency } from "src/lib/numbers/formatCurrency";

interface IProps {
  offersCount?: number;
}

export const FilterOffersHeading = memo(({ offersCount }: IProps) => {
  const t = useTranslations("influencer");
  const pathname = usePathname();

  const h1 = useMemo(() => {
    if (pathname.endsWith("/tiktok"))
      return t("offers.offersMediaChannelTypeH1", {
        mediaChannelType: "TikTok",
      });
    if (pathname.endsWith("/youtube"))
      return t("offers.offersMediaChannelTypeH1", {
        mediaChannelType: "YouTube Shorts",
      });
    if (pathname.endsWith("/instagram"))
      return t("offers.offersMediaChannelTypeH1", {
        mediaChannelType: "Reels",
      });

    return t("availableOffers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="flex items-center gap-[10px] font-bold text-textColor">
      <h1 className="text-[28px] lg:text-[40px]">{h1}</h1>
      {!!offersCount && (
        <span className="text-base py-[4px] px-[6px] rounded-[8px] bg-gray300">
          {formatCurrency(offersCount)}
        </span>
      )}
    </div>
  );
});
FilterOffersHeading.displayName = "FilterOffersHeading";
