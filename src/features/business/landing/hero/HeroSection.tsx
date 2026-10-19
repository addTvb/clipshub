"use client";

import { useState, useCallback } from "react";
import { Button } from "src/components/ui/button/button";
import HeroCarousel, { CarouselSlide } from "./HeroCarousel";
import ProgressIndicator from "./ProgressIndicator";
import SocialIcons from "@public/static/images/landing/social.svg";
import { useTranslations } from "next-intl";
import BannerIcon from "@public/static/images/business/landing/banner.svg";
import DedicateIcon from "@public/static/images/business/landing/dedicate.svg";
import IntegrationIcon from "@public/static/images/business/landing/integration.svg";
import HalfScreenIcon from "@public/static/images/business/landing/half-screen.svg";
import AdsIcon from "@public/static/images/business/landing/ads.svg";
import StatsSection from "./StatsSection";
import ArrowRightIcon from "@icons/arrow-right-icon.svg";
import { useWindowSize } from "usehooks-ts";
import MobileCarousel from "./MobileCarousel";
import { TrustPilotBadge } from "src/features/landing/components/TrustPilotBadge";
import DOMPurify from "isomorphic-dompurify";

export default function HeroSection() {
  const t = useTranslations("business");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const { width } = useWindowSize();

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleProgressChange = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  const handleSlideSelect = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="w-full  px-[10px] ">
      <div className="max-w-screenMaxWidth mx-auto  pt-[38px] md:pt-[70px] lg:pt-[70px] relative">
        <div className="flex flex-col lg:grid lg:grid-cols-[6fr_4fr] gap-[20px] w-full">
          <div className="flex flex-col justify-center gap-[26px] md:gap-[30px] lg:gap-[44px] text-center lg:text-left">
            <div className="flex flex-col gap-[18px]">
              <TrustPilotBadge />
              <h1 className="text-[#090C10] text-[28px] md:text-[46px] lg:text-[58px] font-bold leading-[44px] md:leading-[56px] lg:leading-[68px]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(t.raw("landing.hero.title")),
                  }}
                />
                {/* {t("landing.hero.title")} */}
                {/* {t("landing.hero.titleStart")}{" "}
                <span className="glitch" data-text={t("landing.hero.viral")}>
                  {t("landing.hero.viral")}
                </span>{" "}
                {t("landing.hero.titleEnd")}{" "} */}
                <SocialIcons
                  width={114}
                  hanging={41}
                  className="inline lg:w-[114px] lg:h-[41px] w-[98px] h-[36px] ml-[10px]"
                />
              </h1>
            </div>
            <p
              className="text-[#010D22] text-[16px] md:text-[18px] lg:text-[20px] font-[400] font-[Inter] leading-[22px] md:leading-[24px] lg:leading-[26px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t.raw("landing.hero.description")),
              }}
            />

            <div className="flex items-center gap-[28px]">
              <Button
                size="lg"
                className="w-full lg:w-fit h-[54px] p-3 font-bold text-base sm:text-xl"
                onClick={() => {
                  document
                    .getElementById("contact-us")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("landing.hero.startCampaign")}
                <ArrowRightIcon className="text-[12px]" />
              </Button>
              <Button
                variant="text"
                className="w-full lg:w-fit h-[54px] py-[11px] px-[0px] font-[600] text-base sm:text-xl"
                href="#contact-us"
              >
                {/* <Image
                  src="/static/icons/request-demo.svg"
                  alt=""
                  width={24}
                  height={24}
                /> */}
                {t("landing.hero.requestDemo")}
              </Button>
            </div>
          </div>
          <div className="2xl:w-[45%] w-[35%] max-w-[25svh] aspect-[9/15] lg:block hidden 2xl:ml-[9%] ml-[12%]">
            {width >= 1024 ? (
              <HeroCarousel
                autoPlay={true}
                autoPlayInterval={10000}
                activeIndex={currentSlide}
                onSlideChange={handleSlideChange}
                onProgressChange={handleProgressChange}
              >
                <CarouselSlide
                  videoSrc="/static/videos/landing/video1.webm"
                  textKey="business.landing.heroCarousel.banner.title"
                  icon={BannerIcon}
                />
                <CarouselSlide
                  videoSrc="/static/videos/landing/video2.webm"
                  textKey="business.landing.heroCarousel.dedicate.title"
                  icon={DedicateIcon}
                />
                <CarouselSlide
                  videoSrc="/static/videos/landing/video3.webm"
                  textKey="business.landing.heroCarousel.integration.title"
                  icon={IntegrationIcon}
                />
                <CarouselSlide
                  videoSrc="/static/videos/landing/video4.webm"
                  textKey="business.landing.heroCarousel.half_screen.title"
                  icon={HalfScreenIcon}
                />
                <CarouselSlide
                  videoSrc="/static/videos/landing/video5.webm"
                  textKey="business.landing.heroCarousel.influencer_content.title"
                  icon={AdsIcon}
                />
              </HeroCarousel>
            ) : null}
          </div>

          {width < 1024 && (
            <div className=" w-full mt-[16px]">
              <MobileCarousel autoPlay={true} autoPlayInterval={8000} />
            </div>
          )}
        </div>
        <div className="w-full hidden lg:block h-[72px] mt-[2svh]">
          {width > 1024 && (
            <ProgressIndicator
              currentSlide={currentSlide}
              progress={progress}
              onSlideSelect={handleSlideSelect}
            />
          )}
        </div>
      </div>
      <StatsSection className="md:mt-[100px] mt-[60px]" />
    </div>
  );
}
