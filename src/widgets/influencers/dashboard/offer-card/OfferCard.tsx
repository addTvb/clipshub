import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import CategoryBadge from "src/components/ui/category/category-badge";
import PostLink from "src/components/ui/post-link";
import {
  AdCampaignDetailForInfluencer,
  InfluencerAdOfferDetail,
  OfferType,
} from "src/types/offers";
import { PostType } from "src/types/posts";
import { MediaChannelResponseInformation } from "src/types/offers";
import { AdOfferCampaignDetail } from "src/types/campaigns";
import { Status } from "./OfferCardStatus";
import { InfoBlock } from "./InfoBlock";
import { Link } from "src/i18n/routing";
import CountdownTimer from "src/components/ui/countdown-timer";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";
import { useWindowSize } from "usehooks-ts";
import { useAuthStore } from "src/store/auth";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { USER_TYPE_COOKIE_NAME } from "src/config/cookies";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { CancelOfferButton } from "../../offers/cancel-offer/CancelOfferButton";
/* import { DaysDifference } from "src/components/ui/days-difference"; */
import { AttentionPopup } from "../../filter-offers/popups/AttentionPopup";
import { PremiumBadge } from "./PremiumBadge";
import { useGetUser } from "src/queries/useGetUser";
import { PremiumPopup } from "../../filter-offers/popups/PremiumPopup";

const ICONS = {
  link: "/static/icons/link.svg",
  eye: "/static/icons/eye-gray.svg",
  dollar: "/static/icons/dollar-coin-blue.svg",
  reserved: "/static/icons/reserved.svg",
  web: "/static/icons/web-gray.svg",
  cpm: "/static/icons/cpm.svg",
  calendar: "/static/icons/calendar.svg",
  arrowRight: "/static/icons/arrow-right-black.svg",
  category: "/static/images/categories/1.svg",
  categoryInfluencer: "/static/icons/category-influencer.svg",
  time: "/static/icons/lifetime.svg",
  language: "/static/icons/location-pin-blue.svg",
};

interface OfferCardProps {
  offer: InfluencerAdOfferDetail | OfferType;
  post?: PostType;
  campaignDetail: AdCampaignDetailForInfluencer | AdOfferCampaignDetail;
  mediaChannelResponseInformations?: MediaChannelResponseInformation[];
}

const OfferCard: FC<OfferCardProps> = ({
  offer,
  post,
  campaignDetail,
  mediaChannelResponseInformations,
}) => {
  const t = useTranslations("influencer");
  const { businessCategories } = useBusinessCategory();
  const queryClient = useQueryClient();
  const { width } = useWindowSize();
  const { isAuthenticated } = useAuthStore();
  const userTypeCookie = Cookies.get(USER_TYPE_COOKIE_NAME);
  const pathname = usePathname();
  const { featureFlags } = useGetUser();
  const [openAttentionModal, setOpenAttentionModal] = useState(false);
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const handleOpenPremium = () => setOpenPremiumModal(true);

  const isPremium = offer.ad_offer.viralista_school_member;

  const handleOpenAttention = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isPremium && !featureFlags?.viralista_school_member) {
      handleOpenPremium();
      return;
    }
    setOpenAttentionModal(true);
  };

  // Обработчик завершения таймера
  const handleTimerComplete = () => {
    if (post && post.post) {
      // Обновляем данные поста
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.posts.getPostById(post.post.id),
      });

      // Обновляем списки постов для текущего медиа-канала
      if (post.post.media_channel_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.influencers.posts.getPostsByMediaChannel(
            post.post.media_channel_id,
            post.post.status,
            undefined,
            undefined
          ),
        });
      }
    }
  };

  // Функция для определения, какую кнопку показывать
  const renderButton = () => {
    if (!isAuthenticated) {
      return (
        <Button
          variant="outline"
          size="lg"
          className="px-[11px] py-[12px]"
          href="/auth/login"
        >
          {t("takeOffer")}
        </Button>
      );
    }

    if (userTypeCookie === "business") return null;

    if (post) {
      switch (post?.post?.status) {
        case "approved":
          return null;
        case "created":
          return (
            <div className="flex items-center gap-[12px]">
              <CancelOfferButton
                postId={post.post.id}
                channelId={post.post.media_channel_id}
              />
              <Button
                href={`/influencers/post/${post.post.id}`}
                size="lg"
                className="px-[11px] py-[12px]"
              >
                {t("offerCard.buttons.makePost")}
                <CountdownTimer
                  createdAt={post.post.created_at}
                  duration={2 * 60 * 60 * 1000}
                  onComplete={handleTimerComplete}
                />
              </Button>
            </div>
          );
        case "moderation":
        case "rejected":
          return (
            <Button
              href={`/influencers/post/${post.post.id}`}
              size="lg"
              className="px-[11px] py-[12px]"
            >
              {t("offerCard.buttons.moderationInfo")}
            </Button>
          );
        case "archived":
        case "closed":
          return;
        default:
          return (
            <Button
              href={`/influencers/post/${post.post.id}`}
              size="lg"
              className="px-[11px] py-[12px]"
            >
              {t("offerCard.buttons.viewDetails")}
            </Button>
          );
      }
    }

    // Проверяем, есть ли хотя бы один канал с пустым массивом take_check_errors
    const hasValidChannel = mediaChannelResponseInformations?.some(
      (channel) =>
        Array.isArray(channel.take_check_errors) &&
        channel.take_check_errors.length === 0
    );

    return (
      <Button
        variant={hasValidChannel ? undefined : "outline"}
        size="lg"
        className="px-[11px] py-[12px]"
        onClick={handleOpenAttention}
      >
        {t("takeOffer")}
      </Button>
    );
  };

  // Функция для определения, что показывать в правой части футера
  const renderFooterRight = () => {
    return (
      <span className="flex items-center gap-[12px] font-[500] text-[14px] text-gray400 sm:flex-row flex-col">
        {((post?.post.status !== "created" &&
          post?.post.status !== "moderation") ||
          pathname.includes("/offers")) && (
          <span>
            {pathname.includes("/offers") &&
              offer.pricing?.cmp_price &&
              offer.pricing?.cmp_price > 0 && (
                <span className="text-[14px] font-[500] text-gray400 text-right w-full">
                  <span className="flex items-center gap-[4px] justify-end font-[Inter]">
                    {` $${formatCurrency(
                      offer.pricing?.cmp_price || 0
                    )} / 1000`}
                    <Image
                      src={ICONS.eye}
                      alt="Views"
                      width={15}
                      height={15}
                      className="size-[15px]"
                    />
                  </span>
                </span>
              )}

            {!!(
              post &&
              (post?.post?.status == "approved" ||
                post?.post?.status == "closed")
            ) && (
              <span className="flex gap-[12px] items-center justify-end">
                <span>{t("offerCard.footer.paid")}</span>
                <span className="text-[20px] text-textColor font-bold">
                  {t("offerCard.footer.paidAmount", {
                    paid: `${formatCurrency(post?.post_payment?.sum_paid)}`,
                  })}
                </span>
              </span>
            )}

            {pathname.includes("/offers") && (
              <span className="text-[20px] text-textColor font-bold flex flex-wrap justify-end items-end gap-x-[4px]">
                <span className="font-[600] text-[14px] text-gray400 font-[Inter]">
                  {t("offerCard.footer.maxReward")}
                </span>{" "}
                <span className="leading-[26px]">
                  ${`${formatCurrency(offer.pricing?.total_max_profit || 0)}`}
                </span>
              </span>
            )}
          </span>
        )}

        {width >= 768 ? renderButton() : null}
      </span>
    );
  };

  const renderCategory = () => {
    const maxToShow = 5;
    const categoryIDs = campaignDetail.business_category_ids;
    const shownIDs = categoryIDs.slice(0, maxToShow);
    const restCount = categoryIDs.length - maxToShow;

    return (
      <span className="flex items-center gap-[8px] flex-wrap">
        {shownIDs.map((categoryID) => {
          const category = businessCategories?.find(
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
        {restCount > 0 && (
          <span className="flex items-center gap-[8px] px-[10px] py-[6px] bg-white50 text-sm rounded-[6px] capitalize font-semibold text-black400">
            {`+${restCount}`}
          </span>
        )}
      </span>
    );
  };

  const mainLink = post
    ? `/influencers/post/${post.post.id}`
    : `/influencers/offers/${offer.ad_offer.id}`;

  return (
    <>
      <AttentionPopup
        open={openAttentionModal}
        setOpen={setOpenAttentionModal}
        mediaChannelResponseInformations={mediaChannelResponseInformations}
        offerId={offer?.ad_offer.id}
      />
      <PremiumPopup open={openPremiumModal} setOpen={setOpenPremiumModal} />

      <Link
        href={mainLink}
        className="w-full flex flex-col md:gap-[24px] bg-white rounded-[8px] shadow-cardShadow relative"
        style={
          isPremium
            ? {
                background: `radial-gradient(6% 15% at 0.76% 1%, rgba(89, 121, 253, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), #FFF`,
              }
            : {}
        }
      >
        {isPremium && (
          <>
            <PremiumBadge />
            <div
              className="absolute inset-0 rounded-[8px] pointer-events-none z-0"
              style={{
                padding: "2px",
                background: `
              radial-gradient(ellipse 160px 100px at 0% 0%, 
                #728EFE 0%, 
                rgba(114, 142, 254, 0.95) 0px,
                rgba(114, 142, 254, 0.85) 100px,
                rgba(114, 142, 254, 0.7) 50px,
                rgba(160, 107, 248, 0.7) 110px,
                rgba(160, 107, 248, 0.5) 30px,
                rgba(255, 255, 255, 0.3) 145px,
                rgba(255, 255, 255, 0.5) 150px,
                rgba(255, 255, 255, 0.7) 155px,
                rgba(255, 255, 255, 0.85) 158px,
                rgba(255, 255, 255, 0.95) 159px,
                white 160px
              ),
              white
            `,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
          </>
        )}
        <div className="relative z-10 flex flex-col md:gap-[24px]">
          <span className="flex flex-col gap-[18px] lg:p-[24px] p-[12px]">
            <span className="flex justify-between gap-[8px]">
              <span className="flex lg:gap-[24px] gap-[16px] flex-col md:flex-row items-start md:items-center">
                <span className="flex items-center gap-[12px]">
                  <span className="flex items-center gap-[8px] gap-y-[16px] text-[20px] font-bold flex-wrap">
                    <span className="flex items-center gap-[8px]">
                      <Image
                        src={campaignDetail?.brand?.logo_file?.link || ""}
                        alt={`${campaignDetail?.brand?.title} logo`}
                        width={46}
                        height={46}
                        className="size-[46px] rounded-[50%] object-cover"
                      />
                      <span className="truncate max-w-[260px] sm:max-w-[450px]">
                        {campaignDetail?.brand?.title} {t("offerDetail.offer")}
                      </span>
                    </span>

                    {post && post?.post?.status && (
                      <Status type={post?.post?.status} />
                    )}
                  </span>
                </span>
                {width >= 768 && renderCategory()}
              </span>
              <span className="mt-[13px] flex-shrink-0">
                {/* {(!post || post?.post?.status !== "approved") && (
                <span className="flex items-center gap-[8px] font-[Inter]">
                  <span className="text-gray400 lg:text-[16px] text-[14px] whitespace-nowrap">
                    <DaysDifference creationDateStr={offer.ad_offer.created_at} />
                  </span>
                  <Image src={ICONS.time} alt="Time" width={20} height={20} />
                </span>
              )} */}
                {post && post.post.status === "approved" && (
                  <PostLink
                    href={post.media_channel_post?.url}
                    imageUrl={post.media_channel_post?.preview_image?.link}
                    linkText={t("offerCard.footer.yourPost")}
                  />
                )}
              </span>
            </span>
            {width < 768 && renderCategory()}
            <hr className="block h-[1px] bg-gray500" />
            <InfoBlock offer={offer} post={post} />
          </span>

          <span className="flex flex-col gap-[11px] bg-gray50 lg:p-[24px] p-[12px] rounded-b-[8px]">
            <span className="flex items-center justify-between w-full">
              <span className="text-[16px] font-bold flex items-center gap-[6px]">
                <span className="max-[400px]:w-[80px]">
                  {t("offerCard.buttons.viewDetails")}
                </span>
                <Image
                  src={ICONS.arrowRight}
                  alt="Arrow Right"
                  width={16}
                  height={16}
                />
              </span>
              {renderFooterRight()}
            </span>
            {width < 768 ? renderButton() : null}
          </span>
        </div>
      </Link>
    </>
  );
};

export default OfferCard;
