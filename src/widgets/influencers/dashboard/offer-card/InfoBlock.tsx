"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import OfferStatBlock from "src/components/offers/offer-stat-block";
import ProgressBar from "src/components/ui/progress-bar";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import { formatDate } from "src/lib/date/formatDate";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { InfluencerAdOfferDetail } from "src/types/offers";
import { PostType } from "src/types/posts";
import { formatNumber } from "src/lib/numbers/formatNumber";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import Image from "next/image";
import { AD_TYPES_OBJ } from "src/features/business/offers/model/adTypes";
import { DictionaryType } from "src/types/category";
import { CategoryBadgeSmall } from "src/components/ui/category/category-badge-small";

interface IProps {
  post?: PostType;
  offer: InfluencerAdOfferDetail;
}

export const InfoBlock = ({ post, offer }: IProps) => {
  const t = useTranslations("influencer");
  const tBase = useTranslations();
  const { mediaChannelCategories } = useMediaChannelCategory();
  const { languages } = useLanguagesDictionary();

  const selectedLanguageId = offer.language_ids?.[0];
  const selectedLanguage: DictionaryType | undefined = (
    languages as DictionaryType[] | undefined
  )?.find((lang) => lang.id === selectedLanguageId);
  const languageCode = selectedLanguage?.slug || "";
  const languageName = selectedLanguage?.name || "";
  const selectedMediaChannelCategories = useMemo(
    () =>
      (offer.media_channel_category_ids || [])
        .map((categoryID) =>
          mediaChannelCategories?.find((category) => category.id === categoryID)
        )
        .filter((category): category is DictionaryType =>
          Boolean(category?.name)
        ),
    [offer.media_channel_category_ids, mediaChannelCategories]
  );

  const renderInfoBlocks = () => {
    if (post) {
      switch (post?.post?.status) {
        case "approved":
          return (
            <div className="sm:flex grid grid-cols-2 lg:gap-x-[48px] lg:gap-y-[20px] gap-[20px] flex-wrap gap-y-[20px]">
              <OfferStatBlock
                iconName="eye"
                label={t("offerCard.infoBlocks.goalViews")}
              >
                <div className="flex flex-col gap-[8px]">
                  {formatNumber(post.media_channel_post?.view_count || 0)}
                  {offer.pricing.max_profit_views
                    ? ` / ${formatNumber(offer.pricing.max_profit_views)}`
                    : ""}
                  <ProgressBar
                    value={post.media_channel_post?.view_count || 0}
                    maxValue={offer.pricing.max_profit_views || 0}
                  />
                </div>
              </OfferStatBlock>
              <OfferStatBlock
                iconName="dollar"
                label={t("offerCard.infoBlocks.paid")}
                value={`$${formatCurrency(post.post_payment?.sum_paid || 0)}`}
              />
              <OfferStatBlock
                iconName="reserved"
                label={t("offerCard.infoBlocks.debt")}
                value={`$${formatCurrency(post.post_payment?.sum_dept || 0)}`}
              />
              <OfferStatBlock
                iconName="cpm"
                label={t("offerCard.infoBlocks.cpm")}
                value={`$${formatCurrency(offer.pricing.cmp_price)}`}
              />
              <OfferStatBlock
                iconName="calendar"
                label={t("offerCard.infoBlocks.started")}
                value={formatDate(post.post.created_at)}
              />
            </div>
          );
        case "created":
        case "moderation":
        case "archived":
        case "closed":
        case "rejected":
          return (
            <div className="sm:flex grid grid-cols-2 lg:gap-x-[48px] lg:gap-y-[20px] gap-[20px] flex-wrap gap-y-[20px]">
              <OfferStatBlock
                iconName="web"
                label={t("offerCard.infoBlocks.social")}
                value={offer.ad_offer.media_channel_type}
              >
                <div className="flex items-center gap-[8px]">
                  <SocialMediaIcon
                    socialPlatform={offer.ad_offer.media_channel_type}
                    className="size-[15px]"
                  />
                  {t(offer.ad_offer.media_channel_type)}
                </div>
              </OfferStatBlock>
              <OfferStatBlock
                iconName="categoryInfluencer"
                label={t("offerCard.infoBlocks.channelCategory")}
              >
                <div className="flex items-center gap-[6px] flex-wrap">
                  {selectedMediaChannelCategories.length > 0
                    ? selectedMediaChannelCategories.map((category) => (
                        <CategoryBadgeSmall
                          title={category.name}
                          key={category.id}
                        />
                      ))
                    : t("offerCard.infoBlocks.allCategories")}
                </div>
              </OfferStatBlock>
              <OfferStatBlock
                iconName="language"
                label={t("offerCard.infoBlocks.language")}
                value={offer.language_ids
                  .map((languageId) => {
                    const language = languages?.find(
                      (lang) => lang.id === languageId
                    );
                    return language?.name || "";
                  })
                  .filter((name) => name)
                  .join(" / ")}
              />
              {!!offer.ad_offer.min_avg_view_for_post_count &&
                !!offer.ad_offer.max_avg_view_for_post_count && (
                  <OfferStatBlock
                    iconName="time"
                    label={t("offerCard.infoBlocks.avgViews")}
                    value={`${offer.ad_offer.min_avg_view_for_post_count} - ${offer.ad_offer.max_avg_view_for_post_count}`}
                  />
                )}
              {offer.pricing?.ttl_days && (
                <OfferStatBlock
                  iconName="time"
                  label={t("offerCard.infoBlocks.lifetimePost")}
                  value={`${offer.pricing?.ttl_days || 0}d`}
                />
              )}
            </div>
          );
        default:
          return null;
      }
    }
    return (
      <div className="sm:flex grid grid-cols-2 lg:gap-x-[28px] lg:gap-y-[20px] gap-[20px] flex-wrap gap-y-[20px] max-[400px]:gap-x-[0px]">
        <OfferStatBlock
          iconName="web"
          label={t("offerCard.infoBlocks.social")}
          value={offer.ad_offer.media_channel_type}
        >
          <div className="flex items-center gap-[8px]">
            <SocialMediaIcon
              socialPlatform={offer.ad_offer.media_channel_type}
              className="size-[15px]"
            />
            {t(offer.ad_offer.media_channel_type)}
          </div>
        </OfferStatBlock>
        <OfferStatBlock
          iconName="categoryInfluencer"
          label={t("offerCard.infoBlocks.influencerCategory")}
        >
          <div className="flex items-center gap-[6px] flex-wrap">
            {selectedMediaChannelCategories.length > 0
              ? selectedMediaChannelCategories.map((category) => (
                  <CategoryBadgeSmall title={category.name} key={category.id} />
                ))
              : t("offerCard.infoBlocks.allCategories")}
          </div>
        </OfferStatBlock>
        <OfferStatBlock
          iconName="language"
          label={t("offerCard.infoBlocks.language")}
        >
          <div className="flex items-center gap-[8px]">
            <Image
              src={languageCode ? `/static/icons/lang/${languageCode}.svg` : ""}
              alt=""
              width={21}
              height={15}
            />
            <span>{languageName}</span>
          </div>
        </OfferStatBlock>
        {!!(
          offer.ad_offer.min_avg_view_for_post_count ||
          offer.ad_offer.max_avg_view_for_post_count
        ) && (
          <OfferStatBlock
            iconName="time"
            label={t("offerCard.infoBlocks.avgViews")}
            value={`${offer.ad_offer.min_avg_view_for_post_count} - ${offer.ad_offer.max_avg_view_for_post_count}`}
          />
        )}

        {offer.pricing.ttl_days && (
          <OfferStatBlock
            iconName="time"
            label={t("offerCard.infoBlocks.lifetimePost")}
            value={`${offer.pricing?.ttl_days || 0}d`}
          />
        )}

        <OfferStatBlock
          iconName="settings"
          label={tBase("common.adType.title")}
        >
          <div className="flex items-center gap-[8px] ">
            {(AD_TYPES_OBJ[offer.spec.integration_type] as { icon: string })
              .icon && (
              <Image
                src={
                  (
                    AD_TYPES_OBJ[offer.spec.integration_type] as {
                      icon: string;
                    }
                  ).icon
                }
                width={20}
                height={20}
                alt=""
              />
            )}

            <span>
              {tBase(AD_TYPES_OBJ[offer.spec.integration_type].title)}
            </span>
          </div>
        </OfferStatBlock>
      </div>
    );
  };

  return renderInfoBlocks();
};
