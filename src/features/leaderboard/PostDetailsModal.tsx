"use client";

import Image from "next/image";
import { Modal } from "src/components/ui/dialog";
import LazyHoverVideo from "src/components/ui/lazy-hover-video";
import EyeIcon from "@icons/eye-icon.svg";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";
import WreathLeftIcon from "@public/static/images/leaderboard/wreath-left.svg";
import WreathRightIcon from "@public/static/images/leaderboard/wreath-right.svg";
import ArrowIcon from "@icons/arrow-down-icon.svg";
import { Link } from "src/i18n/routing";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import Place1Icon from "@public/static/images/leaderboard/grade1.svg";
import Place2Icon from "@public/static/images/leaderboard/grade2.svg";
import Place3Icon from "@public/static/images/leaderboard/grade3.svg";
import TiktokIcon from "@icons/social-tiktok.svg";
import ShortsIcon from "@icons/social-shorts.svg";
import ReelsIcon from "@icons/social-reels.svg";
import { useTranslations } from "next-intl";

interface PostDetailsModalProps {
  open: boolean;
  onClose: () => void;
  // Данные поста
  place: number;
  platform: SocialPlatform;
  totalViews: number;
  videoSrc: string;
  posterSrc: string | null;
  contentCategory: string;
  businessCategory: string;
  offerName: string;
  offerImage: string;
  offerLink: string;
}

export const PostDetailsModal = ({
  open,
  onClose,
  place,
  platform,
  totalViews,
  videoSrc,
  posterSrc,
  contentCategory,
  businessCategory,
  offerName,
  offerImage,
  offerLink,
}: PostDetailsModalProps) => {
  const t = useTranslations("leaderboard");
  const renderPlaceIcon = () => {
    if (place === 1) return <Place1Icon className="w-[48px]" />;
    if (place === 2) return <Place2Icon className="w-[48px]" />;
    if (place === 3) return <Place3Icon className="w-[48px]" />;
    return null;
  };

  return (
    <Modal
      open={open}
      setIsOpen={onClose}
      mobileClassName="p-0 pt-[14px] pb-safe"
      className="p-0 max-h-[90vh]"
      withCross
      title={" "}
      mobileBreakpoint={768}
    >
      <div className="flex flex-col gap-[10px] pb-[0px]">
        {/* Видео с информацией */}
        <div className="relative w-[168px] mx-auto">
          <div className="relative rounded-[12px] overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)]">
            <LazyHoverVideo
              src={videoSrc}
              poster={posterSrc}
              alt="Video"
              className="w-full h-[376px] object-cover"
              showControls={true}
            />
          </div>
        </div>

        {/* Место в лидерборде */}
        {place <= 3 ? (
          <div className="flex items-center justify-center py-[4px]">
            {renderPlaceIcon()}
          </div>
        ) : (
          <div className="flex items-center justify-center text-gray350 text-[14px] font-[700] py-[4px]">
            <WreathLeftIcon />
            <span>
              {place}
              {t("placeSuffix")}
            </span>
            <WreathRightIcon />
          </div>
        )}
        <div className="flex gap-[10px] w-full px-[10px]">
          {/* Content Category */}
          {contentCategory && (
            <div className="flex flex-col gap-[2px] rounded-[12px] bg-[#F3F6FA] px-[8px] py-[12px] flex-1">
              <div className="flex items-center gap-[4px] text-[12px] font-[Inter] font-[600] text-gray400">
                <Image
                  src="/static/icons/category-influencer.svg"
                  alt={t("contentCategory")}
                  width={16}
                  height={16}
                  className="size-[16px]"
                />
                <span className="whitespace-nowrap">
                  {t("contentCategory")}
                </span>
              </div>
              <span className="text-[12px] font-[Inter] font-[500] text-black1000">
                {contentCategory}
              </span>
            </div>
          )}
          {/* Business Category */}
          {businessCategory && (
            <div className="flex flex-col gap-[2px] rounded-[12px] bg-[#F3F6FA] px-[8px] py-[12px] flex-1">
              <div className="flex items-center gap-[4px] text-[12px] font-[Inter] font-[600] text-gray400">
                <Image
                  src="/static/icons/table-gray.svg"
                  alt={t("businessCategory")}
                  width={16}
                  height={16}
                  className="size-[16px]"
                />
                <span className="whitespace-nowrap">
                  {t("businessCategory")}
                </span>
              </div>
              <span className="text-[12px] font-[Inter] font-[500] text-black1000">
                {businessCategory}
              </span>
            </div>
          )}
        </div>
        {/* Platform и Total Views */}
        <div className="flex items-stretch gap-[12px] border-y border-[#DDDFE4] pt-0 mt-[2px]">
          <div className="flex-1 flex flex-col items-center justify-center gap-[6px] py-[16px]">
            <div className="flex items-center gap-[2px] text-gray350 font-[Inter] text-[11px] font-[600]">
              {t("platform")}
            </div>
            <div>
              {platform === "instagram" && (
                <ReelsIcon className="md:h-[24px] h-[16px]" />
              )}
              {platform === "tiktok" && (
                <TiktokIcon className="md:h-[24px] h-[16px]" />
              )}
              {platform === "youtube" && (
                <ShortsIcon className="md:h-[24px] h-[16px]" />
              )}
            </div>
          </div>
          <div className="w-[1px] bg-[#DDDFE4] self-stretch" />
          <div className="flex-1 flex flex-col items-center justify-center gap-[4px] py-[16px]">
            <div className="flex items-center gap-[2px] text-gray350 font-[Inter] text-[11px] font-[600]">
              <EyeIcon className="w-[13px] h-[13px]" /> {t("totalViews")}
            </div>
            <div className="text-[14px] font-[700] text-black1000">
              {formatNumberWithCommas(totalViews)}
            </div>
          </div>
        </div>

        {/* Ссылка на оффер */}
        <div className="flex items-center justify-center pt-[4px] pb-[28px]">
          <Link
            href={offerLink}
            className="flex items-center gap-[8px] group"
            onClick={onClose}
          >
            <div className="rounded-full bg-gray300 relative flex-shrink-0">
              <Image
                className="size-[28px] rounded-full border border-black1000 border-solid bg-gray300"
                src={offerImage}
                alt=""
                width={28}
                height={28}
              />
            </div>
            <div className="flex items-center gap-[4px] min-w-[0px]">
              <span className="flex text-[14px] gap-[4px] font-[700] text-gray350 group-hover:text-black1000 transition-colors duration-300 truncate max-w-[200px] min-w-[0px]">
                <span className="truncate">{offerName}</span>
                <span className="whitespace-nowrap flex-shrink-0">
                  {t("offer")}
                </span>
              </span>
              <ArrowIcon className="group-hover:text-black1000 text-gray350 transition-colors duration-300 size-[14px] rotate-[-90deg] flex-shrink-0" />
            </div>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
