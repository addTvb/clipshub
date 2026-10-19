"use client";

import PlatformsIcon from "@public/static/images/business/landing/platforms.svg";
import TrendIcon from "@public/static/images/business/landing/trend.svg";
import LinkIcon from "@public/static/images/business/landing/link.svg";
import { Button } from "src/components/ui/button/button";
import ArrowRightIcon from "@icons/arrow-right-icon.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CrossareaIcon from "@public/static/images/business/landing/makeBrand/crossarea.svg";
import WinnexIcon from "@public/static/images/business/landing/makeBrand/winnex.svg";
import TheDailyProIcon from "@public/static/images/business/landing/makeBrand/the-daily-pro.svg";

export default function MakeBrandSection() {
  const t = useTranslations("business");

  return (
    <div className="px-[10px] pb-[36px] bg-white">
      <div className="bg-blueGrad2 rounded-[32px] w-full max-w-[1440px] lg:h-[768px] h-auto translate-y-[-30px] mx-auto">
        <div className="flex lg:flex-row flex-col-reverse lg:items-start items-center h-full lg:pl-[80px] lg:pt-[64px] pl-[44px] pr-[44px] pt-[34px] lg:pb-[60px] pb-[17px] relative">
          <div className="flex flex-col justify-between lg:items-start items-center h-full">
            <PlatformsIcon className="lg:mb-0 lg:mt-0 mt-[34px] mb-[53px]" />
            <div className="lg:text-left text-center">
              <h3 className="lg:text-[54px] md:text-[48px] sm:text-[40px] text-[28px] text-white font-bold mb-[24px]">
                {t("landing.makeBrand.title")}{" "}
                <span className="glitch" data-text={t("landing.hero.viral")}>
                  {t("landing.hero.viral")}
                </span>{" "}
              </h3>
              <p className="lg:text-[20px] md:text-[18px] text-[16px] text-white font-[Inter] mb-[48px]">
                {t("landing.makeBrand.description")}
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-fit h-[54px] p-3 font-bold text-[20px] lg:mb-0 mb-[34px]"
                onClick={() => {
                  document
                    .getElementById("contact-us")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("landing.hero.startCampaign")}
                <ArrowRightIcon className="text-[12px]" />
              </Button>
            </div>
            <p className="lg:block flex items-center text-[14px] text-white400 font-[500] font-[Inter] bg-white/10 rounded-[24px] py-1 w-fit lg:px-1 px-[12px]">
              <TrendIcon className="lg:inline lg:mr-0 mr-[12px] flex-shrink-0" />{" "}
               <div className="inline">
                 <span className="font-bold inline">82%</span> {t("landing.makeBrand.trafficStat")}
               </div>
               {" "}
              <LinkIcon className="lg:inline lg:ml-0 ml-[4px] flex-shrink-0" />
            </p>
          </div>
          <div className="lg:w-[37%] sm:w-[60%] w-full lg:absolute relative lg:right-[9%] lg:top-[50%] lg:translate-y-[-50%]">
            <Image
              className="w-full h-full"
              src="/static/images/business/landing/clipshub-area.webp"
              alt="Clipshub logo"
              width={1024}
              height={1024}
            />
            <div className="absolute lg:left-[-10%] left-[-5%] lg:bottom-[10%] bottom-[5%] w-[45%]">
              <Image
                className="w-full"
                src="/static/images/business/landing/makeBrand/iPhone-15.webp"
                alt=""
                width={560}
                height={657}
              />
              <div className="absolute left-[6%] top-[66%] w-[48%] flex flex-col gap-[4px] text-gray550 font-[Inter] font-[500] text-[14px]">
                <CrossareaIcon className="w-full h-full" />
                {t("landing.makeBrand.brandLabel")}
              </div>
            </div>

            <div className="absolute lg:right-[-10%] right-[-5%] lg:top-[-12%] top-[-5%] w-[55%]">
              <Image
                className="w-full"
                src="/static/images/business/landing/makeBrand/iPhone-16.webp"
                alt=""
                width={560}
                height={657}
              />
              <div className="absolute left-[0%] top-[15%] w-[48%] flex flex-col gap-[4px] text-gray550 font-[Inter] font-[500] text-[14px]">
                {t("landing.makeBrand.brandLabel")}
                <WinnexIcon className="w-full h-full" />
              </div>
            </div>

            <div className="absolute lg:right-[0%] right-[5%] lg:bottom-[-10%] bottom-[-5%] w-[45%]">
              <Image
                className="w-full"
                src="/static/images/business/landing/makeBrand/iPhone-18.webp"
                alt=""
                width={560}
                height={657}
              />
              <div className="absolute right-[-2%] top-[58%] w-[48%] flex flex-col gap-[4px] text-gray550 font-[Inter] font-[500] text-[14px] items-end">
                {t("landing.makeBrand.brandLabel")}
                <TheDailyProIcon className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
