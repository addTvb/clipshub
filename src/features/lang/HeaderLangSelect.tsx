"use client";

import { useTranslations } from "next-intl";
import { useAvailableLocales } from "src/features/lang/model/useAvailableLocales";
import { useLanguages } from "./model/useLanguages";
import Image from "next/image";
import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import clsx from "clsx";
import ArrowRightIcon from "@icons/arrow-right-icon.svg";

export const HeaderLangSelect = () => {
  const t = useTranslations("languages");
  const { locale, handleChangeLang } = useLanguages();
  const locales = useAvailableLocales();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  

  // Обработчик клика по кнопке
  const handleToggle = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setOpen(!open);
    
    // Сбрасываем флаг анимации после завершения
    setTimeout(() => setIsAnimating(false), 300);
  }, [open, isAnimating]);

  // Обработчик выбора языка
  const handleLanguageSelect = useCallback((localeOption: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    handleChangeLang(localeOption);
    setOpen(false);
    
    // Сбрасываем флаг анимации после завершения
    setTimeout(() => setIsAnimating(false), 300);
  }, [handleChangeLang, isAnimating]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (open && !isAnimating) {
          setIsAnimating(true);
          setOpen(false);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, isAnimating]);

  const localeOptions = useMemo(() => {
    return locales.filter((localeOption) => localeOption !== locale);
  }, [locale, locales]);

  return (
    <div ref={containerRef} className="w-full">
      <button 
        onClick={handleToggle}
        className="flex items-center justify-between gap-[12px] p-[10px] rounded-[8px] w-full hover:bg-white50 transition-colors duration-200"
      >
        <span className="flex items-center gap-[8px]">
          <Image
            src={`/static/icons/lang/circle/${locale}.svg`}
            alt=""
            width={20}
            height={20}
          />
          <span>{t(`short.${locale}`)}</span>
        </span>
        <ArrowRightIcon className={clsx(
          "text-[10px] text-gray550 transition-transform duration-300 ease-in-out", 
          open && "rotate-90"
        )} />
      </button>
      
      {/* Анимированный список языков с расширением высоты */}
      <div className={clsx(
        "overflow-hidden transition-all duration-300 ease-in-out ",
        open 
          ? "max-h-[200px] opacity-100 overflow-y-scroll pr-[5px]" 
          : "max-h-0 opacity-0"
      )}>
        <div className="py-1">
          {localeOptions.map((localeOption, index) => (
            <button
              key={localeOption}
              onClick={() => handleLanguageSelect(localeOption)}
              className={clsx(
                "flex items-center gap-[8px] p-[10px] w-full transition-all duration-200 hover:bg-white50",
                "hover:bg-gray-50 active:bg-gray-100 rounded-[8px]"
              )}
              style={{
                animationDelay: open ? `${index * 50}ms` : '0ms',
                animation: open ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
              }}
            >
              <Image
                src={`/static/icons/lang/circle/${localeOption}.svg`}
                alt={localeOption}
                width={20}
                height={20}
              />
              <span className="text-sm">{t(`short.${localeOption}`)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
