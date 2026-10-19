/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useTranslations } from "next-intl";
import { useLanguages } from "./model/useLanguages";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArrowIcon from "@icons/arrow-2.svg";
import clsx from "clsx";
import { useAvailableLocales } from "src/features/lang/model/useAvailableLocales";

export const MobileLangSelect = () => {
  const t = useTranslations("languages");
  const { locale, handleChangeLang } = useLanguages();
  const locales = useAvailableLocales();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animClass, setAnimClass] = useState("lang-select-anim--close");
  const openTimeout = useRef<NodeJS.Timeout | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnimClass("lang-select-anim--close");
      openTimeout.current = setTimeout(() => {
        setAnimClass("lang-select-anim--open");
      }, 20); // Дать браузеру применить класс закрытия
    } else if (mounted) {
      setAnimClass("lang-select-anim--close");
      closeTimeout.current = setTimeout(() => {
        setMounted(false);
      }, 300); // Длительность анимации
    }
    return () => {
      if (openTimeout.current) clearTimeout(openTimeout.current);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, [open]);

  const toggleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const handleSelectLang = (locale: string) => {
    handleChangeLang(locale);
    handleClose();
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between p-[10px] gap-[12px] w-full transition-colors rounded-[8px] hover:bg-white50"
      >
        <span className="flex items-center gap-[8px]">
          <Image
            src={`/static/icons/lang/circle/${locale}.svg`}
            alt="en"
            width={20}
            height={20}
          />
          <span>{t(`long.${locale}`)}</span>
        </span>

        <ArrowIcon
          className={clsx(
            "w-[16px] h-[16px] transition-transform",
            open && "rotate-90"
          )}
        />
      </button>

      {mounted && (
        <div
          className={clsx(
            "flex flex-col gap-[6px] w-full lang-select-anim",
            animClass
          )}
          style={{ overflow: "hidden" }}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSelectLang(locale)}
              className="flex items-center gap-[8px] p-[10px] w-full transition-colors rounded-[8px] hover:bg-white50"
            >
              <Image
                src={`/static/icons/lang/circle/${locale}.svg`}
                alt={locale}
                width={20}
                height={20}
              />
              {t(`long.${locale}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
