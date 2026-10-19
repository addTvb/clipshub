/* eslint-disable i18next/no-literal-string */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Divider } from "src/components/ui/divider";
import { useCreateOfferStore } from "../../model/useCreateOfferStore";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useMemo } from "react";
import { AdType } from "src/types/base";
import { AD_TYPES_OBJ } from "src/features/business/offers/model/adTypes";
import { CampaignSettings } from "src/types/campaigns";
import { calculateWatermarkCommission } from "src/lib/numbers/calculateWatermarkCommission";

// const avgChannelViewsText = {
//   any: "any",
//   "5k": "5,000 - 50,000",
//   "50k": "50,000 - 100,000",
//   "200k": "200,000 - 500,000",
//   "500k": "500,000 - 1,000,000",
// };

const socialPlatformName = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const socialPlatformIcons: any = {
  youtube: "/static/images/youtube.svg",
  tiktok: "/static/images/tiktok.svg",
  instagram: "/static/images/instagram.svg",
};
export const socialPlatformIconsWithText = {
  youtube: "/static/icons/social-shorts.svg",
  tiktok: "/static/icons/social-tiktok.svg",
  instagram: "/static/icons/social-reels.svg",
};

interface IProps {
  budget: number;
  isBudgetUnlimit: boolean;
  campaignSettings: CampaignSettings;
}

export const OfferDetails = ({
  budget,
  isBudgetUnlimit,
  campaignSettings,
}: IProps) => {
  const t = useTranslations("business.offerForm");
  const tOffer = useTranslations("business.offer");
  const tBase = useTranslations();

  const {
    socialPlatform,
    mediaChannelCategoryIDs,
    // avgChannelViews,
    lifetimePost,
    view_bonuses,
    maxPayoutPerPost,
    payoutAmount,
    adType,
  } = useCreateOfferStore();

  const { mediaChannelCategories } = useMediaChannelCategory();

  const categories = useMemo(() => {
    return mediaChannelCategories?.filter((item) =>
      mediaChannelCategoryIDs.includes(item.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaChannelCategoryIDs]);

  const serviceCommission = calculateWatermarkCommission({
    fee: campaignSettings?.fee_pct,
    discount: campaignSettings?.watermark_fee_discount_pct,
    allowDiscount: campaignSettings?.allow_platform_watermark,
  });

  return (
    <div className="space-y-[10px]">
      <div className="font-bold text-base">{t("offerDetails")}</div>

      <div className="bg-white50 rounded-[8px] p-[12px] space-y-[12px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/web-gray.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">{t("social")}</span>
          </div>

          {socialPlatform && (
            <div className="flex items-center gap-[4px] text-xs md:text-sm font-medium">
              <Image
                src={socialPlatformIcons[socialPlatform]}
                alt=""
                width={18}
                height={18}
              />
              <span>{socialPlatformName[socialPlatform]}</span>
            </div>
          )}
        </div>

        <Divider dashed color="#B3B7BD" />

        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/settings.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {tBase("common.adType.title")}
            </span>
          </div>

          <div className="flex items-center gap-[4px] text-xs md:text-sm font-medium">
            {"icon" in AD_TYPES_OBJ[adType as AdType] &&
              (AD_TYPES_OBJ[adType as AdType] as { icon: string }).icon && (
                <Image
                  src={
                    (AD_TYPES_OBJ[adType as AdType] as { icon: string }).icon
                  }
                  alt=""
                  width={18}
                  height={18}
                />
              )}
            <span>
              {tBase.has(AD_TYPES_OBJ[adType as AdType].title)
                ? tBase(AD_TYPES_OBJ[adType as AdType].title)
                : adType}
            </span>
          </div>
        </div>

        <Divider dashed color="#B3B7BD" />

        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px] min-w-max">
            <Image
              src="/static/icons/four-square-blue.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {t("category")}
            </span>
          </div>

          <div className="text-xs md:text-sm font-medium">
            {categories?.length && categories?.length > 0 ? (
              categories?.map((item, index) => (
                <span
                  className="capitalize"
                  key={`media-channel-category-${item.id}`}
                >
                  {item.name}
                  {index + 1 < categories.length && ", "}
                </span>
              ))
            ) : (
              <span className="text-xs md:text-sm font-medium">
                {tBase("common.all")}
              </span>
            )}
          </div>
        </div>

        {/* <Divider dashed color="#B3B7BD" /> */}
        {/* <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/location-pin-blue.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">{t("country")}</span>
          </div>

          <div className="text-xs md:text-sm font-medium">{language}</div>
        </div> */}

        {/* <Divider dashed color="#B3B7BD" />
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/eye-gray.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {t("averageChannelViews")}
            </span>
          </div>

          <div className="text-xs md:text-sm font-medium">
            {avgChannelViewsText[avgChannelViews]}
          </div>
        </div> */}

        <Divider dashed color="#B3B7BD" />

        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/dollar-coin-blue.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {t("paymentModel")}
            </span>
          </div>

          <div className="text-xs md:text-sm font-medium">
            ${payoutAmount} / {t("1000views")} (max ${maxPayoutPerPost})
          </div>
        </div>

        <Divider dashed color="#B3B7BD" />
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/clock-blue.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {t("lifetime")}
            </span>
          </div>

          <div className="text-xs md:text-sm font-medium">
            {t("daysCount", { days: lifetimePost })}
          </div>
        </div>

        {view_bonuses && view_bonuses.length > 0 && (
          <>
            <Divider dashed color="#B3B7BD" />

            <div className="flex items-center gap-[16px]">
              <div className="flex items-center gap-[8px]">
                <Image
                  src="/static/icons/dollar-coin-blue.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-xs lg:text-sm font-bold">
                  {t("rewardNumberViews")}
                </span>
              </div>

              <div className="text-xs md:text-sm font-medium space-y-[4px]">
                {view_bonuses.map((bonus, index) => (
                  <div key={index}>
                    ${bonus.bonus_sum} / {bonus.views_count}{" "}
                    <span className="lowercase">{tOffer("views")}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Divider dashed color="#B3B7BD" />

        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/static/icons/dollar-coin-blue.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xs lg:text-sm font-bold">
              {t("maxBudget")}
            </span>
          </div>

          <div className="text-xs md:text-sm font-medium">
            {!isBudgetUnlimit ? `${t("unlimited")}` : `$${budget}`}
          </div>
        </div>
      </div>
      <p className="text-gray400 font-medium text-sm pl-[10px]">
        {t("serviceCommission", { commission: serviceCommission })}
      </p>
    </div>
  );
};
