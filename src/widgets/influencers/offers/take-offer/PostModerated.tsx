import PostLink from "src/components/ui/post-link";
import OfferStatBlock from "src/components/offers/offer-stat-block";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CategoryBadge from "src/components/ui/category/category-badge";
import TextCard from "src/components/ui/text-card";
import OfferCard from "src/widgets/influencers/dashboard/offer-card/OfferCard";
import { OfferType } from "src/types/offers";
import { PostType } from "src/types/posts";
import { AdOfferCampaignDetail } from "src/types/campaigns";
import { formatNumber } from "src/lib/numbers/formatNumber";
import ProgressBar from "src/components/ui/progress-bar";
import { formatDate } from "src/lib/date/formatDate";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { useWindowSize } from "usehooks-ts";
import clsx from "clsx";
import { useOfferById } from "src/queries/influencers/useOfferById";
import { formatCurrency } from "src/lib/numbers/formatCurrency";

interface IProps {
  offer: OfferType;
  post: PostType;
  campaignDetail: AdOfferCampaignDetail;
}

const PostModerated = ({ offer, post, campaignDetail }: IProps) => {
  const t = useTranslations();
  const tPage = useTranslations("influencer.postModerated");
  const { mediaChannelCategories } = useMediaChannelCategory();
  const { languages } = useLanguagesDictionary();
  const { width } = useWindowSize();
  const { mediaChannelResponseInformations } = useOfferById(offer.ad_offer.id);

  const renderCategory = () => {
    return (
      <div className="flex items-center gap-[8px]">
        {offer.media_channel_category_ids.map((categoryID) => {
          const category = mediaChannelCategories?.find(
            (category) => category.id === categoryID
          );
          return (
            category && (
              <CategoryBadge
                key={categoryID}
                name={category.name}
                iconPath={category.icon}
              />
            )
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={clsx(
          "flex flex-col gap-[24px] relative bg-white lg:p-[24px] p-[12px] pt-[32px] rounded-[8px] w-full max-w-contentMaxWidth h-fit",
          post.post.status === "rejected" && "opacity-[0.2]"
        )}
      >
        <div className="absolute -top-[8px] rounded-[8px] bg-primary py-[4px] px-[6px] text-base font-bold text-white">
          {tPage("stepLabel")}
        </div>
        <div className="pt-0 flex flex-col gap-[24px]">
          <div className="flex justify-between items-center">
            <div className="lg:text-[28px] text-[20px] font-bold">
              {tPage("title")}
            </div>
            <PostLink
              href={post.media_channel_post?.url}
              imageUrl={post.media_channel_post?.preview_image?.link}
              linkText={t("influencer.offerCard.footer.yourPost")}
            />
          </div>

          <hr className="block h-[1px] bg-gray500" />

          <div className="sm:flex grid grid-cols-2 lg:gap-x-[48px] lg:gap-y-[20px] gap-[20px] flex-wrap gap-y-[20px]">
            <OfferStatBlock
              iconName="eye"
              label={t("influencer.offerCard.infoBlocks.goalViews")}
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
              label={t("influencer.offerCard.infoBlocks.paid")}
              value={`$${formatCurrency(post.post_payment?.sum_paid || 0)}`}
            />
            <OfferStatBlock
              iconName="dollar"
              label={t("influencer.offerCard.infoBlocks.debt")}
              value={`$${formatCurrency(post.post_payment?.sum_dept || 0)}`}
            />
          {/*   <OfferStatBlock
              iconName="reward"
              label={t("influencer.offerCard.infoBlocks.reward")}
              value={`${formatNumber(
                offer.pricing.view_bonus_count
              )} Views / $${formatCurrency(offer.pricing.view_bonus_sum)}`}
            /> */}
            <OfferStatBlock
              iconName="calendar"
              label={t("influencer.offerCard.infoBlocks.started")}
              value={formatDate(post.post.created_at)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end bg-gray50 lg:p-[24px] p-[12px] rounded-b-[8px]">
          <div>
           {/*  {offer.pricing.view_bonus_count > 0 && (
              <div className="text-[14px] font-[500] text-gray400 text-right w-full">
                <div className="flex items-center gap-[4px] justify-end">
                  {t("influencer.offerCard.footer.reward")}
                  {` ${formatNumber(offer.pricing.view_bonus_count)}`}
                  <Image
                    src="/static/icons/eye-gray.svg"
                    alt="Views"
                    width={15}
                    height={15}
                    className="size-[15px]"
                  />

                  {`/ $${formatCurrency(offer.pricing.view_bonus_sum)}`}
                </div>
              </div>
            )} */}
            <div className="flex gap-[12px] items-center justify-end">
              {post && post?.post?.status === "approved" ? (
                <>
                  <div className="">
                    {t("influencer.offerCard.footer.paid")}
                  </div>
                  <div className="text-[20px] text-textColor font-bold">
                    {t("influencer.offerCard.footer.paidAmount", {
                      paid: `${formatCurrency(
                        post.post_payment?.sum_paid || 0
                      )}`,
                    })}
                  </div>
                </>
              ) : (
                <div className="text-[20px] text-textColor font-bold">
                  <span className="font-[600] text-[14px] text-gray400">
                    {t("influencer.offerCard.footer.perThousandViews", {
                      count: 1000,
                    })}
                  </span>{" "}
                  ${`${formatCurrency(offer.pricing.cmp_price)}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(post.post.status === "approved" ||
        (post.post.status === "closed" && post.post.media_channel_post_id)) && (
        <div className="flex flex-col gap-[16px]">
          <div className="text-[20px] font-bold">{tPage("aboutOffer")}</div>
          <div className="flex flex-col gap-[24px] lg:p-[24px] p-[12px] bg-white rounded-[8px]">
            <div className="flex flex-col gap-[18px]">
              <div className="flex justify-between gap-[8px]">
                <div className="flex lg:gap-[24px] gap-[16px] flex-col md:flex-row items-start md:items-center">
                  <div className="flex items-center gap-[12px] ">
                    <div className="flex items-center gap-[8px] gap-y-[16px] text-[20px] font-bold flex-wrap">
                      <div className="flex items-center gap-[8px]">
                        <Image
                          src={campaignDetail?.brand?.logo_file?.link || campaignDetail?.log_file?.link || ""}
                          alt={`${campaignDetail?.ad_campaign?.business_name} logo`}
                          width={46}
                          height={46}
                          className="size-[46px] rounded-[50%] object-cover"
                        />
                        <div className="truncate">
                          {campaignDetail.ad_campaign.business_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  {width >= 768 && renderCategory()}
                </div>
                {/* <div className="mt-[13px] flex-shrink-0">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-gray400 lg:text-[16px] text-[14px] whitespace-nowrap">
                      <DaysDifference creationDateStr={offer.ad_offer.created_at} />
                    </span>
                    <Image
                      src="/static/icons/lifetime.svg"
                      alt="Time"
                      width={20}
                      height={20}
                    />
                  </div>
                </div> */}
              </div>
              {width < 768 && renderCategory()}
            </div>

            <hr className="block h-[1px] bg-gray500" />

            <div className="sm:flex grid grid-cols-2 lg:gap-x-[48px] lg:gap-y-[20px] gap-[20px] flex-wrap gap-y-[20px]">
              <OfferStatBlock
                iconName="web"
                label={t("influencer.offerCard.infoBlocks.social")}
                value={offer.ad_offer.media_channel_type}
              >
                <div className="flex items-center gap-[8px]">
                  <SocialMediaIcon
                    socialPlatform={offer.ad_offer.media_channel_type}
                    className="size-[15px]"
                  />
                  {t("influencer." + offer.ad_offer.media_channel_type)}
                </div>
              </OfferStatBlock>
              <OfferStatBlock
                iconName="categoryInfluencer"
                label={t("influencer.offerCard.infoBlocks.channelCategory")}
                value={
                  offer.media_channel_category_ids &&
                  offer.media_channel_category_ids.length > 0
                    ? offer.media_channel_category_ids
                        .map((categoryID) => {
                          const category = mediaChannelCategories?.find(
                            (category) => category.id === categoryID
                          );
                          return category?.name || "";
                        })
                        .filter((name) => name)
                        .join(" & ")
                    : t("influencer.offerCard.infoBlocks.allCategories")
                }
              />
              <OfferStatBlock
                iconName="language"
                label={t("influencer.offerCard.infoBlocks.language")}
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
                    label={t("influencer.offerCard.infoBlocks.avgViews")}
                    value={`${formatNumber(
                      offer.ad_offer.min_avg_view_for_post_count
                    )} - ${formatNumber(
                      offer.ad_offer.max_avg_view_for_post_count
                    )}`}
                  />
                )}
              <OfferStatBlock
                iconName="time"
                label={t("influencer.offerCard.infoBlocks.lifetimePost")}
                value={`${offer.pricing.ttl_days}d`}
              />
            </div>

            <hr className="block h-[1px] bg-gray500" />

            {campaignDetail.ad_campaign.business_description && (
              <TextCard
                text={campaignDetail.ad_campaign.business_description}
              />
            )}

            {offer.spec.description && (
              <TextCard text={offer.spec.description} />
            )}
          </div>
        </div>
      )}

      {post.post.status === "rejected" && (
        <>
          <div className="flex flex-col gap-[24px] lg:p-[24px] p-[12px] bg-white rounded-[8px]">
            <div className="text-[20px] font-bold">
              {tPage("rejected.title")}
            </div>
            {!!post.post.failed_moderation_checks?.length && (
              <div className="text-gray400 font-[500] text-[14px] [&_span]:font-bold">
                <span>{tPage("rejected.reasonPrefix")}</span>{" "}
                {tPage("rejected.reasonText")}
                <span className="font-bold">
                  {" "}
                  {Array.isArray(post.post.failed_moderation_checks) &&
                    post.post.failed_moderation_checks.map(
                      (errorCode, index, array) => (
                        <span key={index}>
                          {tPage("rejected.reasons." + errorCode)}
                          {index < array.length - 1 ? ", " : "."}
                        </span>
                      )
                    )}
                </span>
              </div>
            )}
            {!!post.post.moderation_reject_reasons?.length && (
              <ul className="flex flex-col gap-[8px] text-gray400 font-[500] text-[14px]">
                {post.post.moderation_reject_reasons?.map((reason) => (
                  <li key={reason.id}>❌ {reason.description}</li>
                ))}
              </ul>
            )}
            <hr className="block h-[1px] bg-gray500" />
            <div className="text-gray400 font-bold text-[14px]">
              {tPage("rejected.retakeHint")}
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="text-[20px] font-bold">
              {tPage("rejected.retakeTitle")}
            </div>
            <OfferCard
              offer={offer}
              campaignDetail={campaignDetail}
              mediaChannelResponseInformations={
                mediaChannelResponseInformations
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default PostModerated;
