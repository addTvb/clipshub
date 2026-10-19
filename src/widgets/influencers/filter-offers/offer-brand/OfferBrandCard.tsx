import { useTranslations } from "next-intl";
import Image from "next/image";
import { CHImage } from "src/components/ui/image";
import CategoryBadge from "src/components/ui/category/category-badge";
import { CategoryBadgeSmall } from "src/components/ui/category/category-badge-small";
import { UiLink } from "src/components/ui/link/link";
import clsx from "clsx";
import { BrandWithOffersCount } from "src/types/brands";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useMemo } from "react";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import EyeIcon from "@icons/eye-icon.svg";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { Link } from "src/i18n/routing";
import { useFilterStore } from "../model/useFilterStore";

interface IProps {
  brandWithOffers: BrandWithOffersCount;
}

const MAX_CATEGORIES_TO_SHOW = 6;

const mediaChannelIcons: Record<SocialPlatform, { src: string; alt: string }> =
  {
    tiktok: { src: "/static/icons/tiktok.svg", alt: "TikTok" },
    youtube: { src: "/static/icons/youtube.svg", alt: "YouTube" },
    instagram: { src: "/static/icons/instagram.svg", alt: "Instagram" },
  };

export const OfferBrandCard = ({ brandWithOffers }: IProps) => {
  const t = useTranslations("influencer");

  const brand = brandWithOffers.brand;
  const title = brand.title || "";
  const offersCount = brandWithOffers.offers_count;
  const brandId = brand.id;
  const offerCPM = brandWithOffers.max_payout_cmp_price;
  const offerMaxReward = brandWithOffers.max_total_max_profit;

  const { businessCategories: businessCategoriesDictionary } =
    useBusinessCategory();
  const { mediaChannelCategories } = useMediaChannelCategory();

  const businessCategory = useMemo(() => {
    if (!brand.business_category_id || !businessCategoriesDictionary) {
      return undefined;
    }

    return businessCategoriesDictionary.find(
      (category) => category.id === brand.business_category_id
    );
  }, [brand.business_category_id, businessCategoriesDictionary]);

  const clipperCategories = useMemo(() => {
    const mediaChannelCategoryIds =
      brandWithOffers.media_channel_category_ids || [];

    if (!mediaChannelCategories || mediaChannelCategoryIds.length === 0) {
      return [];
    }

    return mediaChannelCategories.filter((category) =>
      mediaChannelCategoryIds.includes(category.id)
    );
  }, [mediaChannelCategories, brandWithOffers.media_channel_category_ids]);

  const { integration_types } = useFilterStore();

  return (
    <Link
      href={{
        pathname: `/influencers/offers/brand/${brandId}`,
        query: { integration_types: integration_types },
      }}
      className="flex flex-col rounded-[12px] bg-white shadow-imageShadow w-full justify-between"
    >
      <span className="p-[12px] pb-0 lg:p-[24px] lg:pb-0 flex flex-col gap-[16px]">
        <span className="flex items-center gap-[16px]">
          <CHImage
            width={48}
            height={48}
            src={brand.logo_file?.link}
            alt={brand.logo_file?.name || brand.title || "Brand logo"}
            imagePlaceholder
            className="rounded-full w-[48px] h-[48px] border border-gray700"
          />

          <span className="flex items-start lg:items-center gap-[8px] min-w-0 flex-col lg:flex-row">
            <h3 className="text-textColor font-bold text-lg lg:text-xl truncate flex-1 max-[1024px]:leading-[22px]">
              {title}
            </h3>

            {businessCategory && (
              <CategoryBadge
                iconPath={businessCategory?.icon || ""}
                name={businessCategory?.name || ""}
                className="border-none w-fit max-[1024px]:text-xs"
              />
            )}
          </span>
        </span>

        <span className="flex flex-col gap-[6px] font-[Inter]">
          <span className="uppercase text-gray350 text-[10px] font-semibold">
            {t("offerCard.infoBlocks.influencerCategory")}
          </span>
          <span className="flex flex-wrap gap-[6px]">
            {clipperCategories.length === 0 ? (
              <CategoryBadgeSmall
                title={t("offerCard.infoBlocks.allCategories")}
              />
            ) : (
              <>
                {clipperCategories
                  .slice(0, MAX_CATEGORIES_TO_SHOW)
                  .map((category) => (
                    <CategoryBadgeSmall
                      key={category.id}
                      title={category.name}
                    />
                  ))}
                {clipperCategories.length > MAX_CATEGORIES_TO_SHOW && (
                  <CategoryBadgeSmall
                    title={`+${
                      clipperCategories.length - MAX_CATEGORIES_TO_SHOW
                    }`}
                  />
                )}
              </>
            )}
          </span>
        </span>

        <span className="flex items-center gap-[8px] justify-between border border-white200 rounded-[12px] p-[12px]">
          <span className="flex items-center gap-[6px] flex-wrap">
            <span
              className={clsx(
                "text-blue300 text-sm font-bold py-[4px] px-[6px] rounded-[6px] bg-[#EDF6FA] border border-transparent w-max",
                "max-[1100px]:text-xs"
              )}
            >
              {offersCount} {t("offers.activeOffers")}
            </span>
            <span className="flex items-center gap-[6px]">
              {brandWithOffers.media_channel_types?.map((platform) => {
                const icon = mediaChannelIcons[platform];
                if (!icon) return null;
                return (
                  <span
                    key={platform}
                    className="h-[28px] p-[5px] rounded-[6px] bg-white border border-gray200 flex items-center justify-center"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={18}
                      height={18}
                    />
                  </span>
                );
              })}
            </span>
          </span>

          <span className="flex flex-col gap-[2px] items-end">
            {offerCPM && (
              <span className="flex items-center gap-[2px] text-gray400 text-sm font-medium font-[Inter] w-max">
                <span>
                  ${formatCurrency(offerCPM)} {"/ 1000"}
                </span>
                <EyeIcon className="text-gray400 size-[14px]" />
              </span>
            )}

            <span className="flex gap-[10px] items-end flex-wrap justify-end">
              <span className="text-gray350 text-[10px] font-semibold uppercase font-[Inter] w-max">
                {t("offerCard.footer.maxReward")}
              </span>
              <span className="text-textColor text-xl font-bold leading-none w-max">
                ${formatCurrency(offerMaxReward)}
              </span>
            </span>
          </span>
        </span>
      </span>

      <span className="px-[24px] py-[18px] w-full flex justify-center">
        <UiLink
          href={`/influencers/offers/brand/${brandId}`}
          className="w-fit flex items-center gap-[6px] text-base font-bold text-textColor"
          underlineColor="dark"
        >
          <span>{t("offerCard.footer.seeAllOffers")}</span>
          <Image
            src="/static/icons/arrow-right-black.svg"
            alt=""
            width={20}
            height={20}
          />
        </UiLink>
      </span>
    </Link>
  );
};
