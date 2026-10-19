"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { AdType } from "src/types/base";
import BannerIcon from "@public/static/images/business/landing/banner.svg";
import DedicateIcon from "@public/static/images/business/landing/dedicate.svg";
import IntegrationIcon from "@public/static/images/business/landing/integration.svg";
import HalfScreenIcon from "@public/static/images/business/landing/half-screen.svg";
import AdsIcon from "@public/static/images/business/landing/ads.svg";

interface MobileCarouselSlide {
  icon: React.ComponentType;
  textKey: string;
  videoSrc: string;
  adType: AdType;
}

const slides: MobileCarouselSlide[] = [
  {
    icon: BannerIcon,
    textKey: "landing.heroCarousel.banner.title",
    videoSrc: "/static/videos/landing/video1.webm",
    adType: "banner",
  },
  {
    icon: DedicateIcon,
    textKey: "landing.heroCarousel.dedicate.title",
    videoSrc: "/static/videos/landing/video2.webm",
    adType: "dedicate",
  },
  {
    icon: IntegrationIcon,
    textKey: "landing.heroCarousel.integration.title",
    videoSrc: "/static/videos/landing/video3.webm",
    adType: "integration",
  },
  {
    icon: HalfScreenIcon,
    textKey: "landing.heroCarousel.half_screen.title",
    videoSrc: "/static/videos/landing/video4.webm",
    adType: "half_screen",
  },
  {
    icon: AdsIcon,
    textKey: "landing.heroCarousel.influencer_content.title",
    videoSrc: "/static/videos/landing/video5.webm",
    adType: "influencer_content",
  },
];

interface MobileCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function MobileCarousel({ 
  autoPlay = false, 
  autoPlayInterval = 5000 
}: MobileCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));
  const t = useTranslations("business");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Автоплей
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, activeIndex]); // При смене activeIndex интервал перезапускается

  // Обработчик загрузки видео
  const handleVideoLoaded = (index: number) => {
    setVideosLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Управление воспроизведением видео
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && videosLoaded[index]) {
        if (index === activeIndex) {
          video.play().catch(() => {
            // Игнорируем ошибки автовоспроизведения
          });
        } else {
          video.pause();
          video.currentTime = 0; // Сбрасываем к началу
        }
      }
    });
  }, [activeIndex, videosLoaded]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Горизонтальная карусель видео */}
      <div
        className="flex items-end w-full justify-center gap-[6px]"
        style={{
          height: `calc(30svw * (20/9))`,
        }}
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-[8px] cursor-pointer transition-all duration-300"
              style={{
                width: isActive ? "30%" : "24%",
              }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Иконка */}
              <div className="w-6 h-6 flex items-center justify-center">
                <Icon />
              </div>

              {/* Видео */}
              <div
                className={clsx(
                  "rounded-[13px] overflow-hidden transition-all duration-300 w-full aspect-[9/20] relative",
                  isActive ? "opacity-100" : "opacity-30"
                )}
              >
                {/* Скелетон */}
                {!videosLoaded[index] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-[13px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className={clsx(
                    "w-full h-full object-cover rounded-[13px] transition-opacity duration-300",
                    videosLoaded[index] ? "opacity-100" : "opacity-0"
                  )}
                  onLoadedData={() => handleVideoLoaded(index)}
                  onCanPlay={() => handleVideoLoaded(index)}
                >
                  <source src={slide.videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
                  <source src={slide.videoSrc} type="video/webm" />
                </video>
              </div>
            </div>
          );
        })}
      </div>

      {/* Информация о текущем слайде */}
      <div className="flex flex-col items-center gap-2 w-full max-w-[369px] px-4">
        {/* Заголовок */}
        <span className="text-[#97A8C6] text-xs font-semibold font-[Inter] tracking-[0.96px] uppercase">
          {t("landing.hero.viewAdType")}:
        </span>

        {/* Активный тип рекламы */}
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            {React.createElement(slides[activeIndex].icon)}
          </div>
          <span className="text-[#090C10] text-base font-bold">
            {t(slides[activeIndex].textKey)}
          </span>
        </div>

        {/* Описание */}
        <p className="text-[#586781] text-xs font-medium font-[Inter] leading-[18px] text-center min-h-[54px]">
          {t(
            `${slides[activeIndex].textKey.replace(
              ".title",
              ".tooltip.description"
            )}`
          )}
        </p>
      </div>
    </div>
  );
}
