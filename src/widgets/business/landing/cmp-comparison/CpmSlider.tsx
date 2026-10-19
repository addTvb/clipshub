"use client";

import { useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCpmSliderStore } from "./model/useCpmSliderStore";

interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  mozUserSelect?: string;
  msUserSelect?: string;
}
export const CpmSlider = () => {
  const t = useTranslations("business.landing.cpmComparison");
  const {
    value,
    setValue,
    isHovering,
    setIsHovering,
    isDragging,
    setIsDragging,
    changeHeight,
    changeSocialHeight,
  } = useCpmSliderStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const min = 100;
  const max = 10000;
  const step = 100;

  // Вычисляем позицию ползунка в процентах
  const percentage = ((value - min) / (max - min)) * 100;
  // Маппинг значения слайдера (100..10000) в диапазон мультипликатора (0.4..1.6)
  const mapValueToMultiplier = (val: number) => {
    const ratio = (val - min) / (max - min);
    const minM = 0.4;
    const maxM = 1.6;
    // Линейная интерполяция
    return minM + ratio * (maxM - minM);
  };

  // Вспомогательная функция для обновления обеих анимаций
  const updateAnimations = useCallback(
    (multiplier: number) => {
      if (changeHeight) {
        changeHeight(multiplier);
      }
      if (changeSocialHeight) {
        changeSocialHeight(multiplier);
      }
    },
    [changeHeight, changeSocialHeight]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newPercentage = Math.max(
        0,
        Math.min(100, (offsetX / rect.width) * 100)
      );
      const newValue = Math.round((newPercentage / 100) * (max - min) + min);

      // Округляем до ближайшего шага
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      setValue(clampedValue);
      updateAnimations(mapValueToMultiplier(clampedValue));
    },
    [isDragging, min, max, step, setValue, updateAnimations]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  // Touch handlers
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();
      const rect = sliderRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const offsetX = touch.clientX - rect.left;
      const newPercentage = Math.max(
        0,
        Math.min(100, (offsetX / rect.width) * 100)
      );
      const newValue = Math.round((newPercentage / 100) * (max - min) + min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      setValue(clampedValue);
      updateAnimations(mapValueToMultiplier(clampedValue));
    },
    [isDragging, min, max, step, setValue, updateAnimations]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleSliderClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newPercentage = Math.max(
        0,
        Math.min(100, (offsetX / rect.width) * 100)
      );
      const newValue = Math.round((newPercentage / 100) * (max - min) + min);

      // Округляем до ближайшего шага
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      setValue(clampedValue);
      updateAnimations(mapValueToMultiplier(clampedValue));
    },
    [min, max, step, setValue, updateAnimations]
  );

  useEffect(() => {
    if (isDragging) {
      // Предотвращаем выделение текста на уровне документа
      const bodyStyle = document.body.style as ExtendedCSSStyleDeclaration;
      bodyStyle.userSelect = "none";
      bodyStyle.webkitUserSelect = "none";
      bodyStyle.mozUserSelect = "none";
      bodyStyle.msUserSelect = "none";

      // Добавляем обработчики событий
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      // Предотвращаем drag событие по умолчанию
      document.addEventListener("dragstart", (e) => e.preventDefault());
      document.addEventListener("selectstart", (e) => e.preventDefault());

      return () => {
        // Восстанавливаем выделение текста
        const bodyStyle = document.body.style as ExtendedCSSStyleDeclaration;
        bodyStyle.userSelect = "";
        bodyStyle.webkitUserSelect = "";
        bodyStyle.mozUserSelect = "";
        bodyStyle.msUserSelect = "";

        // Удаляем обработчики событий
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener("dragstart", (e) => e.preventDefault());
        document.removeEventListener("selectstart", (e) => e.preventDefault());
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className="w-full max-w-[744px] mt-8">
      <div className="flex flex-col">
        {/* Ползунок */}
        <div className="flex items-center gap-6 sm:px-0 pl-2">
          <div
            className="relative select-none flex-1"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              WebkitTouchCallout: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div
              ref={sliderRef}
              className="relative h-2 bg-[#12162D] rounded-full cursor-pointer"
              onClick={handleSliderClick}
              onMouseDown={(e) => {
                // Начинаем drag при клике по треку
                e.preventDefault();
                handleSliderClick(e);
                setIsDragging(true);
              }}
              onDragStart={(e) => e.preventDefault()}
              onTouchStart={(e) => {
                if (!sliderRef.current) return;
                setIsDragging(true);
                const rect = sliderRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const offsetX = touch.clientX - rect.left;
                const newPercentage = Math.max(
                  0,
                  Math.min(100, (offsetX / rect.width) * 100)
                );
                const newValue = Math.round(
                  (newPercentage / 100) * (max - min) + min
                );
                const steppedValue = Math.round(newValue / step) * step;
                const clampedValue = Math.max(min, Math.min(max, steppedValue));
                setValue(clampedValue);
                updateAnimations(mapValueToMultiplier(clampedValue));
              }}
            >
              {/* Заполненная часть */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#CDCCFF] to-[#8D8BED] rounded-full"
                style={{ width: `${percentage}%` }}
              />

              {/* Ползунок */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#CDCCFF] rounded-full cursor-grab active:cursor-grabbing border-4 border-textColor shadow-sliderShadow transition-transform hover:scale-110 z-10"
                style={{ left: `calc(${percentage}%)` }}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onTouchStart={() => setIsDragging(true)}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
              />

              {/* Всплывающий блок с текущим значением */}
              {(isHovering || isDragging) && (
                <div
                  ref={tooltipRef}
                  className="absolute -top-[65px] bg-[#222936]  px-[12px] py-[6px] rounded-lg shadow-cardShadow whitespace-nowrap transition-opacity z-20 "
                  style={{
                    left: `calc(${percentage}%)`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-gray350 text-sm font-medium min-[420px]:hidden block">
                      {t("slider.setBudget")}
                    </div>
                    <div className="text-white font-bold text-base min-[420px]:text-xl">
                      ${value.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-l border-[#222936] h-[46px] ml-[13px] hidden min-[420px]:block" />

          <div
            className="flex-col gap-[2px] select-none hidden min-[420px]:flex"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
          >
            <div className="text-[#CED8E1] text-sm font-medium">
              {t("slider.setBudget")}
            </div>
            <div className="text-white font-bold">
              ${value.toLocaleString()}
            </div>
          </div>
        </div>
        <div
          className="flex text-base text-white font-bold mt-[29px] select-none text-center min-[420px]:text-left"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            WebkitTouchCallout: "none",
          }}
        >
          {t("slider.subtitle")}
        </div>
      </div>
    </div>
  );
};
