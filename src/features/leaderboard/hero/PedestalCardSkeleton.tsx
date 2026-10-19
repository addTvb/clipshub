"use client";
import clsx from "clsx";
import Image from "next/image";
import StarsImage from "@public/static/images/leaderboard/stars.svg";
import Place1Icon from "@public/static/images/leaderboard/grade1.svg";
import Place2Icon from "@public/static/images/leaderboard/grade2.svg";
import Place3Icon from "@public/static/images/leaderboard/grade3.svg";
import EllipseIcon from "@public/static/images/leaderboard/Ellipse.svg";
import EyeIcon from "@icons/eye-icon.svg";
import ArrowDownIcon from "@icons/arrow-down-icon.svg";
import { useTranslations } from "next-intl";


interface PedestalCardSkeletonProps {
  place: "1" | "2" | "3";
}

export const PedestalCardSkeleton = ({ place }: PedestalCardSkeletonProps) => {
  const t = useTranslations("leaderboard");
  
  return (
    <div className="w-full relative flex flex-col items-center">
      <div
        className={clsx(
          "absolute bottom-0 left-0 w-full",
          place === "1" && "md:aspect-[467/496] aspect-[1/2]",
          place === "2" && "md:aspect-[467/400] aspect-[1/2]",
          place === "3" && "md:aspect-[467/400] aspect-[1/2]"
        )}
      >
        <StarsImage
          className={clsx(
            "absolute md:top-[19px] md:left-[17px] md:w-[31%] left-[-6px] top-[14px] w-[60%] z-[2]",
            place === "3" && "text-[#5C5E61]",
            place === "1" && "text-[#B17A3D]",
            place === "2" && "text-[#BA5335]"
          )}
        />
        
        {/* Desktop контейнер с формой */}
        <div
          className="absolute inset-0 backdrop-blur-[9px] hidden md:block"
          style={{
            clipPath: "url(#pedestalClip)",
            background: `linear-gradient(180deg, ${
              place === "1" ? "#FFD581" : place === "2" ? "#FFB484" : "#BFBFBF"
            } 0%, #FFFFFF 46.49%)`,
          }}
        />

        {/* Mobile версия */}
        <div
          className="absolute inset-0 backdrop-blur-[9px] md:hidden"
          style={{
            clipPath: "url(#pedestalClipMobile)",
            background: `linear-gradient(180deg, ${
              place === "1" ? "#FFD581" : place === "2" ? "#FFB484" : "#BFBFBF"
            } 0%, #FFFFFF 46.49%)`,
          }}
        />
      </div>

      <div className="w-full h-full flex flex-col justify-end items-center md:gap-[min(2.5vw,30px)]">
        {/* Video skeleton */}
        <div
          className={clsx(
            "relative w-1/2 z-[2]",
            place === "1" && "md:w-[52%] w-[75%]",
            place === "2" && "md:w-[49%] w-[75%]",
            place === "3" && "md:w-[44%] w-[75%]"
          )}
        >
          <div className="w-full bg-gray200 [border-radius:11.5%/5.2%] aspect-[157/349] overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          
          {/* Crown image */}
          <Image
            src={`/static/images/leaderboard/crown-${place}.webp`}
            alt="Crown"
            width={110}
            height={110}
            className="hidden md:block absolute top-0 right-0 translate-x-[30%] translate-y-[-58%] w-[65%] aspect-[1/1] object-contain z-[3]"
          />
        </div>

        {/* Place icon */}
        {place === "1" && (
          <Place1Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
        )}
        {place === "2" && (
          <Place2Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
        )}
        {place === "3" && (
          <Place3Icon className="relative z-[2] md:w-[25%] w-[30%] flex-shrink-0 md:mt-0 mt-[10px]" />
        )}

        {/* Info section */}
        <div className="flex w-full relative z-[2] md:border-t border-t-0 border-gray300 border-solid md:flex-row flex-col">
          {/* Platform skeleton */}
          <div className="flex flex-1 flex-col items-center gap-[6px] md:px-[2.5%] md:py-[5%] py-4 md:border-r md:border-b-0 border-b border-gray300 border-solid">
            <div className="items-center gap-[2px] text-gray350 font-[Inter] text-[14px] font-[600] hidden md:flex">
              {t("platform")}
            </div>
            <div className="md:h-[30px] md:w-[80px] h-[16px] w-[55px] bg-gray200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
          
          {/* Total Views skeleton */}
          <div className="flex flex-1 flex-col items-center md:gap-[6px] gap-[0px] md:px-[2.5%] md:py-[5%] py-4 md:border-b-0 border-b border-gray300 border-solid">
            <div className="flex items-center gap-[2px] text-gray350 font-[Inter] md:text-[14px] text-[11px] font-[600]">
           <EyeIcon className="md:w-[16px] w-[13px] md:h-[16px] h-[13px]" />
              {t("totalViews")}
            </div>
            <div className="md:h-[30px] md:w-[80px] h-[18px] w-[55px] bg-gray200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
        <button 
       
          className="flex justify-center items-center relative w-full pt-4 pb-2 md:hidden z-[2] text-[#97A8C6]"
        >
          <ArrowDownIcon className="w-[18px] h-[18px]" />
        </button>

        {/* Offer link skeleton (desktop only) */}
        <div className="max-w-[100%] md:flex hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+16px)] items-center gap-[4px]">
          <div className="size-[28px] bg-gray200 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="h-[12px] w-[120px] bg-gray200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        <EllipseIcon className="absolute md:bottom-1/2 bottom-[60%] left-1/2 -translate-x-1/2 translate-y-1/2 md:w-[70%] w-[100%]" />
      </div>
    </div>
  );
};

