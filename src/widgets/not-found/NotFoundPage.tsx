"use client";

import React from "react";
import { NotFoundAnimation } from "./NotFoundAnimation";
import BackArrowIcon from "@icons/back-arrow.svg";
import { Link } from "src/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "src/i18n/routing";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const NotFoundPage = () => {
  const t = useTranslations("notFound");
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <div className="flex flex-col text-center relative min-h-screen items-center justify-center px-[10px]">
      <Image
        src="/static/images/not-found/left-top-img.svg"
        alt=""
        width={226}
        height={219}
        className="absolute z-[11] max-[900px]:w-[150px] max-[900px]:h-[150px] top-0 left-0"
      />
      <Image
        src="/static/images/not-found/right-top-img.svg"
        alt=""
        width={226}
        height={219}
        className="absolute z-[11] max-[900px]:w-[150px] max-[900px]:h-[150px] top-0 right-0"
      />
      <Image
        src="/static/images/not-found/left-bottom-img.svg"
        alt=""
        width={226}
        height={219}
        className="absolute z-[11] max-[900px]:w-[150px] max-[900px]:h-[150px] bottom-0 left-0"
      />
      <Image
        src="/static/images/not-found/right-bottom-img.svg"
        alt=""
        width={226}
        height={219}
        className="absolute z-[11] max-[900px]:w-[150px] max-[900px]:h-[150px] bottom-0 right-0"
      />

      <NotFoundAnimation />

      <h1 className="text-[40px] font-bold text-textColor mt-[8px] max-[600px]:text-[28px]">
        {t("title")}
      </h1>
      <p className={`${inter.className} text-gray400 mt-[20px]`}>{t("description")}</p>
      <div className="flex flex-col items-center justify-center gap-[12px] mt-[41px]">
        <Link
          className="text-white bg-blueGrad1 px-[12px] py-[11px] rounded-[6px]"
          href="/"
        >
          {t("mainPage")}
        </Link>
        <button 
          onClick={handleBack}
          className="text-textColor bg-transparent px-[12px] py-[11px] flex items-center gap-[6px]"
        >
          <BackArrowIcon className="w-[20px] h-[20px]" />
          <span>{t("back")}</span>
        </button>
      </div>
    </div>
  );
};
