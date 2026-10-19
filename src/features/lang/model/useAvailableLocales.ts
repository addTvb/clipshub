"use client";

import { useMemo } from "react";
import Cookies from "js-cookie";
import { LOCALES } from "src/i18n/routing";
import { RU_AVAILABLE_COOKIE } from "src/config/cookies";
import { useLocale } from "next-intl";

export const useAvailableLocales = () => {
  const currentLocale = useLocale();

  return useMemo(() => {
    const ruCookie = Cookies.get(RU_AVAILABLE_COOKIE);
    const ruEnabled = ruCookie === "1" || ruCookie === "true";
    const baseList = ruEnabled ? LOCALES : LOCALES.filter((l) => l !== "ru");
    // Гарантируем наличие текущей локали, даже если RU ещё не открыт явно
    if (!baseList.includes(currentLocale as never)) {
      return [currentLocale, ...baseList];
    }
    return baseList;
  }, [currentLocale]);
};


