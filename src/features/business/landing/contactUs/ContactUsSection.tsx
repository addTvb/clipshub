"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import ContactUsForm from "./ContactUsForm";

export default function ContactUsSection() {
  const t = useTranslations("business.landing.contactUs");

  return (
    <div className="bg-white px-[10px] py-[76px]" id="contact-us">
      <div className={clsx(
        "relative w-full max-w-screenMaxWidth mx-auto rounded-[32px] overflow-hidden md:p-[25px] lg:pl-[80px] p-[10px] pt-[20px]",
        "flex justify-between lg:flex-row flex-col gap-[20px]"
      )}>
        {/* Видео фон */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="/static/images/business/landing/Bg-Contact-Us300.mp4"
            type="video/mp4"
          />
        </video>

        {/* Оверлей для улучшения читаемости */}
        <div className="absolute inset-0 bg-black/40 z-[2]" />

        {/* Левая часть - заголовок */}
        <div className="relative z-[4] flex items-center justify-start">
          <h2 className="text-white font-bold leading-tight lg:text-left text-center lg:max-w-[498px] mx-auto lg:mx-0">
            <span className="block text-[28px] lg:text-[54px]">
              {t("titlePart1")}
            </span>
            <span className="block text-[20px] lg:text-[54px]">
              {t("titlePart2")}
            </span>
          </h2>
        </div>

        {/* Правая часть - форма */}
        <div className="relative z-[4] flex items-center justify-center ">
          <ContactUsForm />
        </div>

        {/* Контактный email внизу слева */}
        <a href={`mailto:${t("partnerEmail")}`} className="lg:absolute lg:left-[80px] lg:bottom-[25px] text-white/80 text-[14px] font-medium z-[4] lg:mx-auto text-center">
          {t("partnerEmail")}
        </a>
      </div>
    </div>
  );
}
