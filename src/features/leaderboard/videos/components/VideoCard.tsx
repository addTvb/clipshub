"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LazyHoverVideo from "src/components/ui/lazy-hover-video";
import EyeIcon from "@icons/eye-icon.svg";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import WreathLeftIcon from "@public/static/images/leaderboard/wreath-left.svg";
import WreathRightIcon from "@public/static/images/leaderboard/wreath-right.svg";
import ArrowIcon from "@icons/arrow-down-icon.svg";
import Image from "next/image";
import { Link } from "src/i18n/routing";
import BackArrowIcon from "@icons/back-arrow-icon.svg";
import { useMediaQuery } from "usehooks-ts";
import { LeaderboardPost } from "src/types/leadeerboard";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";
import { PostDetailsModal } from "../../PostDetailsModal";
import clsx from "clsx";
import { useLocale } from "next-intl";

type CategoryDictionary = Readonly<Record<string, string>>;

export interface VideoCardTranslations {
  placeSuffix: string;
  contentCategory: string;
  businessCategory: string;
  offer: string;
  back: string;
}

export interface VideoCardProps {
  post: LeaderboardPost;
  businessCategoryMap: CategoryDictionary;
  mediaChannelCategoryMap: CategoryDictionary;
  translations: VideoCardTranslations;
  className?: string;
  isPlaceVisible?: boolean;
}

const getDictionaryValue = (
  dictionary: CategoryDictionary,
  identifier: string | number | null | undefined
) => {
  if (identifier === null || identifier === undefined) {
    return "";
  }

  const key = typeof identifier === "string" ? identifier : String(identifier);
  return dictionary[key] ?? "";
};

interface PlaceBadgeProps {
  place: number | string;
  translations: VideoCardTranslations;
  topImage: {
    width: number;
    height: number;
    className?: string;
  };
  nonTopWrapperClassName?: string;
}

const PlaceBadge = ({
  place,
  translations,
  topImage,
  nonTopWrapperClassName,
}: PlaceBadgeProps) => {
  const locale = useLocale();
  const numericPlace = typeof place === "number" ? place : Number(place);
  const isNumericPlace = Number.isFinite(numericPlace);
  const isTopPlace = isNumericPlace && numericPlace >= 1 && numericPlace <= 3;

  const placeValue =
    isNumericPlace || typeof place === "string" ? String(place ?? "") : "";
  const altText = placeValue ? `${placeValue} place` : "place";

  if (isTopPlace) {
    return (
      <Image
        src={`/static/images/leaderboard/grade${numericPlace}.svg`}
        alt={altText}
        width={topImage.width}
        height={topImage.height}
        className={topImage.className}
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center gap-[4px] text-gray350 text-[14px] font-[700]",
        nonTopWrapperClassName
      )}
    >
      <WreathLeftIcon />
      {place}
      {locale !== "ru" ? translations.placeSuffix : ""}
      <WreathRightIcon />
    </div>
  );
};

const VideoCardComponent = ({
  post,
  className,
  businessCategoryMap,
  mediaChannelCategoryMap,
  translations,
  isPlaceVisible,
}: VideoCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile && isFlipped) {
      setIsFlipped(false);
    }
  }, [isMobile, isFlipped]);

  const mediaChannelPost = post?.media_channel_post;

  const socialPlatform = mediaChannelPost?.media_channel_type ?? "youtube";
  const videoSrc = mediaChannelPost?.video_file?.link ?? "";
  const posterSrc = mediaChannelPost?.preview_image?.link ?? "";
  const place = post?.place ?? "";
  const viewCount = mediaChannelPost?.view_count ?? 0;
  const formattedViewCount = useMemo(
    () => formatNumberWithCommas(viewCount),
    [viewCount]
  );
  const mediaChannelCategoryId = post?.post?.media_channel_category_id ?? null;
  const mediaChannelCategoryName = useMemo(
    () => getDictionaryValue(mediaChannelCategoryMap, mediaChannelCategoryId),
    [mediaChannelCategoryId, mediaChannelCategoryMap]
  );

  const businessCategoryId =
    post?.ad_offer_campaign_detail?.business_category_ids?.[0] ?? null;

  const businessCategoryName = useMemo(
    () => getDictionaryValue(businessCategoryMap, businessCategoryId),
    [businessCategoryId, businessCategoryMap]
  );
  const offerId = post?.ad_offer?.ad_offer?.id;
  const offerName = post?.ad_offer?.ad_offer?.name ?? "";
  const offerLink = offerId ? `/influencers/offers/${offerId}` : "#";
  const offerImageSrc = post?.ad_offer_campaign_detail?.log_file?.link ?? "";

  const handleShowDetails = useCallback(() => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsFlipped(true);
    }
  }, [isMobile]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleResetFlip = useCallback(() => {
    setIsFlipped(false);
  }, []);

  const containerClassName = useMemo(
    () => clsx("[perspective:1000px] w-full max-w-[200px] mx-auto", className),
    [className]
  );

  return (
    <>
      <PostDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        place={place}
        platform={socialPlatform}
        totalViews={viewCount}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        contentCategory={mediaChannelCategoryName}
        businessCategory={businessCategoryName}
        offerName={offerName}
        offerImage={offerImageSrc}
        offerLink={offerLink}
      />

      <div className={containerClassName}>
        <div
          className="relative [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)]"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="flex flex-col gap-[5px] md:p-[8px] p-1 md:pb-[2px] pb-0 bg-white [border-radius:11.5%/5.2%] shadow-imageShadow [backface-visibility:hidden] [transform-style:preserve-3d]">
            <LazyHoverVideo
              src={videoSrc}
              poster={posterSrc}
              alt="Video"
              className="w-full h-full object-cover"
              showControls
              onShowDetails={handleShowDetails}
            />
            <div className="flex items-center justify-between gap-[4px] pl-[4px] pb-[5px] max-[460px]:flex-col max-[460px]:justify-center max-[460px]:gap-0 max-[460px]:py-[4px]">
              {isPlaceVisible ? (
                <PlaceBadge
                  place={place}
                  translations={translations}
                  topImage={{ width: 32, height: 14 }}
                />
              ) : (
                <div className="flex items-center gap-[8px] md:pl-0 pl-[4px]">
                  {socialPlatform && (
                    <>
                      <SocialMediaIcon
                        socialPlatform={socialPlatform}
                        className="md:size-[16px] size-[14px]"
                      />
                      <div className="w-[1px] h-[18px] bg-gray300" />
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center md:gap-[6px] gap-[4px] md:pr-[10px] pr-[6px] py-[6px] max-[460px]:p-0">
                <EyeIcon className="text-gray350 md:size-[16px] size-[10px]" />
                <span className="md:text-[12px] text-[11px] font-[700]">
                  {formattedViewCount}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col absolute inset-0  w-full md:p-[8px] p-1 md:pb-[2px] pb-0 bg-white [border-radius:11.5%/5.2%] shadow-imageShadow [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateY(180deg)]">
            <PlaceBadge
              place={place}
              translations={translations}
              topImage={{
                width: 50,
                height: 17,
                className: "self-center pb-[10px]",
              }}
              nonTopWrapperClassName="self-center pb-[10px]"
            />

            <div className="flex flex-col gap-[8px] flex-1">
              <div className="w-[41%] aspect-[4/5] overflow-hidden rounded-[16px] mx-auto">
                {posterSrc && (
                  <Image
                    className="w-full h-full object-cover object-top"
                    src={posterSrc}
                    alt="Video"
                    width={40}
                    height={50}
                  />
                )}
              </div>

              {mediaChannelCategoryName && (
                <div className="flex flex-col gap-[4px] rounded-[12px] bg-[#F3F6FA] px-[8px] py-[12px]">
                  <div className="flex items-center gap-[4px] text-[12px] font-[Inter] font-[700] text-gray400">
                    <Image
                      src="/static/icons/category-influencer.svg"
                      alt=""
                      width={13}
                      height={13}
                      className="size-[13px]"
                    />
                    <span className="whitespace-nowrap truncate">
                      {translations.contentCategory}
                    </span>
                  </div>
                  <span className="text-[12px] font-[Inter] font-[500] truncate">
                    {mediaChannelCategoryName}
                  </span>
                </div>
              )}

              {businessCategoryName && (
                <div className="flex flex-col gap-[4px] rounded-[12px] bg-[#F3F6FA] px-[8px] py-[12px]">
                  <div className="flex items-center gap-[4px] text-[12px] font-[Inter] font-[700] text-gray400">
                    <Image
                      src="/static/icons/table-gray.svg"
                      alt=""
                      width={13}
                      height={13}
                      className="size-[13px]"
                    />
                    <span className="whitespace-nowrap truncate">
                      {translations.businessCategory}
                    </span>
                  </div>
                  <span className="text-[12px] font-[Inter] font-[500] truncate">
                    {businessCategoryName}
                  </span>
                </div>
              )}

              <Link
                href={offerLink}
                className="mt-auto flex items-center justify-between gap-[4px] group bg-[#F3F6FA] rounded-[12px] px-[8px] py-[4px]"
                aria-disabled={!offerId}
              >
                <div className="flex items-center gap-[4px] min-w-[0px]">
                  <div className="rounded-full bg-gray300 relative flex-shrink-0">
                    {offerImageSrc && (
                      <Image
                        className="size-[24px] rounded-full border border-[#DFE3EA] border-solid bg-gray300"
                        src={offerImageSrc}
                        alt=""
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                  <span className="text-[12px] font-[600] text-[#7083A6] truncate">
                    {offerName}
                  </span>
                  <span className="text-[12px] font-[600] text-[#7083A6]">
                    {translations.offer}
                  </span>
                </div>

                <ArrowIcon className="text-gray350 md:size-[16px] size-[10px] rotate-[-90deg] flex-shrink-0" />
              </Link>

              <button
                onClick={handleResetFlip}
                type="button"
                className="mb-1 h-[26px] rounded-[12px] w-full flex items-center justify-center gap-[4px] text-[12px] font-[700] text-[#303948] bg-[#F3F6FA] px-[8px] py-[4px]"
              >
                <BackArrowIcon className="flex-shrink-0 stroke-[#303948]" />
                {translations.back}
              </button>
            </div>

            <div className="flex items-center justify-between gap-[4px]">
              <div className="flex items-center gap-[4px]">
                {socialPlatform && (
                  <SocialMediaIcon
                    socialPlatform={socialPlatform}
                    className="md:size-[16px] size-[14px]"
                  />
                )}
                <div className="w-[1px] h-[18px] bg-gray300" />
              </div>
              <div className="flex items-center md:gap-[6px] gap-[4px] pr-[10px] py-[6px]  mt-[4px]">
                <EyeIcon className="text-gray350 md:size-[16px] size-[10px]" />
                <span className="md:text-[12px] text-[11px] font-[700]">
                  {formattedViewCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const areVideoCardPropsEqual = (
  prev: Readonly<VideoCardProps>,
  next: Readonly<VideoCardProps>
) => {
  return (
    prev.post === next.post &&
    prev.className === next.className &&
    prev.businessCategoryMap === next.businessCategoryMap &&
    prev.mediaChannelCategoryMap === next.mediaChannelCategoryMap &&
    prev.translations === next.translations
  );
};

export const VideoCard = memo(VideoCardComponent, areVideoCardPropsEqual);

VideoCard.displayName = "VideoCard";
