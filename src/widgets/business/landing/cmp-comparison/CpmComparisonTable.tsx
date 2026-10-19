"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment } from "react";
import { useCpmSliderStore } from "./model/useCpmSliderStore";

export const CpmComparisonTable = () => {
  const t = useTranslations("business.landing.cpmComparison");
  const { value } = useCpmSliderStore();

  // Функция для парсинга avgCpm из строки в число
  const parseAvgCpm = (avgCpmString: string): number => {
    // Убираем символ $ и извлекаем число
    const numericValue = parseFloat(avgCpmString.replace("$", ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // Функция для вычисления viewsFor100 по формуле (value / cpm_price) * 1000
  const calculateViewsFor100 = (avgCpmString: string): string => {
    const cpmPrice = parseAvgCpm(avgCpmString);
    if (cpmPrice <= 0) {
      return `~0 ${t("views")}`;
    }
    const views = Math.round((value / cpmPrice) * 1000);
    return `~${views.toLocaleString()} ${t("views")}`;
  };

  const tableData = [
    {
      platform: t("platforms.instagram"),
      icon: "/static/icons/instagram-white.svg",
      avgCpm: "$8.17",
      linkTitle: "guptamedia.com",
      link: "https://www.guptamedia.com/social-media-ads-cost",
      viewsFor100: "~12,250 views",
    },
    {
      platform: t("platforms.youtube"),
      icon: "/static/icons/youtube-white.svg",
      avgCpm: "$3.53",
      linkTitle: "awisee.com",
      link: "https://awisee.com/blog/youtube-ad-benchmarks/",
      viewsFor100: "~28,300 views",
    },
    {
      platform: t("platforms.tiktok"),
      icon: "/static/icons/tiktok-white.svg",
      avgCpm: "$3.21",
      linkTitle: "lebesgue.io",
      link: "https://lebesgue.io/tiktok-ads/tiktok-ads-benchmarks-for-ctr-cr-and-cpm",
      viewsFor100: "~31,100 views",
    },
    {
      platform: t("platforms.clipsHub"),
      avgCpm: "$0.20",
      viewsFor100: "500,000 views (approx.)",
    },
  ];

  const headers = {
    platform: t("table.platform"),
    avgCpm: t("table.avgCpm"),
    viewsFor100: t("table.viewsFor100"),
  };

  return (
    <div className="w-full max-w-[744px] z-10">
      {/* Grid Container */}
      <div className="grid grid-cols-[1fr_1fr_2fr] sm:grid-cols-[1fr_2fr_2fr] overflow-hidden w-full gap-0">
        {/* Header Row */}
        <div className="bg-[#12162D] px-[5px] min-[500px]:px-[15px] py-[13px] font-semibold text-gray550 text-[13px] md:text-base rounded-tl-[8px]">
          {headers.platform}
        </div>
        <div className="bg-[#12162D] px-[5px] min-[500px]:px-[15px] py-[13px] font-semibold text-gray550 text-[13px] md:text-base">
          {headers.avgCpm}
        </div>
        <div className="bg-[#12162D] px-[5px] min-[500px]:px-[15px] py-[13px] font-semibold text-gray550 text-[13px] md:text-base rounded-tr-[8px]">
          {headers.viewsFor100}
        </div>

        {/* Data Rows */}
        {tableData.map((row, index) => {
          const isLastRow = index + 1 === tableData.length;

          if (isLastRow) {
            return (
              <div
                key={`row-${index}`}
                className="col-span-3 grid grid-cols-[1fr_1fr_2fr] sm:grid-cols-[1fr_2fr_2fr] bg-cpmComparisonTableGrad rounded-[8px] relative items-center"
              >
                <Image
                  src="/static/icons/radial-gradient-cpm-table.svg"
                  alt=""
                  width={561}
                  height={561}
                  className="absolute top-0 h-full left-0"
                />
                <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-white text-[13px] md:text-base font-medium z-10">
                  {row.platform}
                </div>
                <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-[13px] md:text-base font-medium text-white z-10">
                  {row.avgCpm}
                </div>
                <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-[13px] md:text-base font-medium text-white z-10">
                  {calculateViewsFor100(row.avgCpm)}
                </div>
              </div>
            );
          }

          // Обычные строки
          return (
            <Fragment key={`row-${index}`}>
              <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-white text-[13px] md:text-base font-medium bg-transparent flex items-center">
                <Image
                  src={row.icon ?? ""}
                  alt=""
                  width={24}
                  height={24}
                  className="md:hidden"
                />
                <span className="hidden md:inline">{row.platform}</span>
              </div>
              <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-[13px] md:text-base font-medium text-white bg-transparent flex items-center gap-[13px]">
                <span>{row.avgCpm}</span>
                <a
                  href={row.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[12px] bg-[#12162D] text-blue300 font-semibold text-xs px-[8px] py-[2px] items-center gap-[4px] w-fit hidden sm:flex"
                >
                  <span>{row.linkTitle}</span>
                  <Image
                    src="/static/icons/link.svg"
                    alt=""
                    width={10}
                    height={10}
                  />
                </a>
              </div>
              <div className="px-[5px] min-[500px]:px-[15px] py-[23px] text-[13px] md:text-base font-medium text-white bg-transparent">
                {calculateViewsFor100(row.avgCpm)}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
