"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import StarsImage from "@public/static/images/leaderboard/stars.svg";
import LazyHoverVideo from "src/components/ui/lazy-hover-video";
import EyeIcon from "@icons/eye-icon.svg";
import TiktokIcon from "@icons/social-tiktok.svg";
import ShortsIcon from "@icons/social-shorts.svg";
import ReelsIcon from "@icons/social-reels.svg";
import Place1Icon from "@public/static/images/leaderboard/grade1.svg";
import Place2Icon from "@public/static/images/leaderboard/grade2.svg";
import Place3Icon from "@public/static/images/leaderboard/grade3.svg";
import EllipseIcon from "@public/static/images/leaderboard/Ellipse.svg";
import ArrowDownIcon from "@icons/arrow-down-icon.svg";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";
import { Link } from "src/i18n/routing";
import ArrowIcon from "@icons/arrow-down-icon.svg";
import { PostDetailsModal } from "../PostDetailsModal";
import { LeaderboardPost } from "src/types/leadeerboard";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useTranslations } from "next-intl";

interface PedestalCardProps {
  post: LeaderboardPost;
}

export const PedestalCard = ({ post }: PedestalCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("leaderboard");
  const { businessCategories } = useBusinessCategory();
  const { mediaChannelCategories } = useMediaChannelCategory();

  const place = post.place;

  return (
    <>
      <PostDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        place={Number(place)}
        platform={post?.media_channel_post?.media_channel_type || "youtube"}
        totalViews={post?.media_channel_post?.view_count || 0}
        videoSrc={post?.media_channel_post?.video_file?.link || ""}
        posterSrc={post?.media_channel_post?.video_file?.preview_file || ""}
        contentCategory={
          mediaChannelCategories?.find(
            (category) => category.id === post?.post?.media_channel_category_id
          )?.name || ""
        }
        businessCategory={
          businessCategories?.find(
            (category) =>
              category.id ===
              post?.ad_offer_campaign_detail?.business_category_ids?.[0]
          )?.name || ""
        }
        offerName={post?.ad_offer?.ad_offer?.name || ""}
        offerImage={post?.ad_offer_campaign_detail?.log_file?.link || ""}
        offerLink={`/influencers/offers/${post?.ad_offer?.ad_offer?.id || ""}`}
      />

      <div className="w-full relative flex flex-col items-center">
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full",
            place === 1 && "md:aspect-[467/496] aspect-[1/2]",
            place === 2 && "md:aspect-[467/400] aspect-[1/2]",
            place === 3 && "md:aspect-[467/400] aspect-[1/2]"
          )}
        >
          <StarsImage
            className={clsx(
              "absolute md:top-[19px] md:left-[17px] md:w-[31%] left-[-6px] top-[14px] w-[60%] z-[2] fill-current",
              place === 1 && "text-[#B17A3D]",
              place === 2 && "text-[#5C5E61]",
              place === 3 && "text-[#BA5335]"
            )}
          />

          {/* Desktop контейнер с формой */}
          <div
            className="absolute inset-0 backdrop-blur-[9px] hidden md:block"
            style={{
              clipPath: "url(#pedestalClip)",
              background: `linear-gradient(180deg, ${
                place === 1 ? "#FFD581" : place === 2 ? "#BFBFBF" : "#FFB484"
              } 0%, #FFFFFF 46.49%)`,
            }}
          />

          {/* Mobile версия с другим clip-path */}
          <div
            className="absolute inset-0 backdrop-blur-[9px] md:hidden"
            style={{
              clipPath: "url(#pedestalClipMobile)",
              background: `linear-gradient(180deg, ${
                place === 1 ? "#FFD581" : place === 2 ? "#FFB484" : "#BFBFBF "
              } 0%, #FFFFFF 46.49%)`,
            }}
          />
        </div>

        <div className=" w-full h-full flex flex-col justify-end items-center md:gap-[min(2.5vw,30px)]">
          <div
            className={clsx(
              "relative  w-1/2 z-[2]",
              place === 1 && "md:w-[52%] w-[75%]",
              place === 2 && "md:w-[49%] w-[75%]",
              place === 3 && "md:w-[44%] w-[75%]"
            )}
          >
            <LazyHoverVideo
              src={post?.media_channel_post?.video_file?.link || ""}
              poster={post?.media_channel_post?.preview_image?.link || ""}
              alt="Leaderboard video preview"
              showControls={true}
              className="w-full object-cover relative"
            />
            {place && (
              <Image
                src={`/static/images/leaderboard/crown-${place}.webp`}
                alt="Pedestal"
                width={110}
                height={110}
                className="hidden md:block absolute top-0 right-0 translate-x-[30%] translate-y-[-58%] w-[65%] aspect-[1/1] object-contain  z-[3]"
              />
            )}
          </div>
          {place === 1 && (
            <Place1Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
          )}
          {place === 2 && (
            <Place2Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
          )}
          {place === 3 && (
            <Place3Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
          )}
          <div className=" flex w-full relative z-[2] md:border-t border-t-0 border-gray300 border-solid md:flex-row flex-col">
            <div className="flex flex-1 flex-col items-center gap-[6px] md:px-[2.5%] md:py-[5%] py-4 md:border-r md:border-b-0 border-b border-gray300 border-solid">
              <div className="items-center gap-[2px] text-gray350 font-[Inter] text-[14px] font-[600] hidden md:flex">
                {t("platform")}
              </div>
              <div>
                {post?.media_channel_post?.media_channel_type ===
                  "instagram" && <ReelsIcon className="md:h-[24px] h-[16px]" />}
                {post?.media_channel_post?.media_channel_type === "tiktok" && (
                  <TiktokIcon className="md:h-[24px] h-[16px]" />
                )}
                {post?.media_channel_post?.media_channel_type === "youtube" && (
                  <ShortsIcon className="md:h-[24px] h-[16px]" />
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center md:gap-[6px] gap-[0px] md:px-[2.5%] md:py-[5%] py-4 md:border-b-0 border-b border-gray300 border-solid">
              <div className="flex items-center gap-[2px] text-gray350 font-[Inter] md:text-[14px] text-[11px] font-[600]">
                <EyeIcon className="md:w-[16px] w-[13px] md:h-[16px] h-[13px]" />{" "}
                {t("totalViews")}
              </div>
              <div className="md:text-[20px] text-[12px] font-[700]">
                {formatNumberWithCommas(
                  post?.media_channel_post?.view_count || 0
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center relative w-full pt-4 pb-2 md:hidden z-[2] text-[#97A8C6]"
          >
            <ArrowDownIcon className="w-[18px] h-[18px]" />
          </button>

          <Link
            href={`/influencers/offers/${post?.ad_offer?.ad_offer?.id || ""}`}
            className="max-w-[100%] w-full justify-center md:flex hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+16px)] items-center gap-[4px] group"
          >
            <div className="rounded-full size-[28px] bg-gray300 relative flex-shrink-0">
              {post?.ad_offer_campaign_detail?.log_file?.link && (
                <Image
                  className="rounded-full border border-[#303948] border-solid bg-gray300"
                  src={post?.ad_offer_campaign_detail?.log_file?.link || ""}
                  alt=""
                  width={28}
                  height={28}
                />
              )}
              <div className="absolute bottom-0 left-0 w-full h-full bg-[#0a0a15] opacity-60 group-hover:opacity-0 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="flex items-center gap-[4px] min-w-[0px]">
              <span className="truncate text-[12px] font-[600] group-hover:text-white text-[#7083A6] transition-colors duration-300">
                {post?.ad_offer_campaign_detail?.ad_campaign?.business_name || ""}
              </span>
              <span className="text-[12px] font-[600] group-hover:text-white text-[#7083A6] transition-colors duration-300">
                {t("offer")}
              </span>
            </div>
            <ArrowIcon className="group-hover:text-white text-gray350 transition-colors duration-300 md:size-[16px] size-[10px] rotate-[-90deg] flex-shrink-0" />
          </Link>

          <EllipseIcon className="absolute md:bottom-1/2 bottom-[60%] left-1/2 -translate-x-1/2 translate-y-1/2 md:w-[70%] w-[100%]" />
        </div>
      </div>
    </>
  );
};
