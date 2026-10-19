"use client";

import { useState, useEffect, useRef, ReactNode, Children } from "react";
import { useTranslations } from "next-intl";
import { cn } from "src/lib/utils";

export interface HeroCarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
  onProgressChange?: (progress: number) => void;
  activeIndex?: number;
}

export interface CarouselSlideProps {
  videoSrc: string;
  textKey: string;
  icon: React.ComponentType;
  className?: string;
}

export function CarouselSlide({
  videoSrc,
  textKey,
  icon: IconComponent,
  className,
}: CarouselSlideProps) {
  const t = useTranslations();

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative aspect-[9/20] rounded-3xl overflow-hidden w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-3xl"
        >
          <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
          <source src={videoSrc} type="video/webm" />
        </video>

        {/* Overlay для неактивных видео */}
        <div className="absolute inset-0 bg-black/5 transition-opacity duration-300 hover:bg-black/2 rounded-3xl" />
      </div>

      <div className="flex items-center justify-center gap-1 text-center text-textColor text-[16px] font-bold ">
        <IconComponent />
        {t(textKey)}
      </div>
    </div>
  );
}

export default function HeroCarousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
  onSlideChange,
  onProgressChange,
  activeIndex,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
  const progressRef = useRef(0);
  const lastProgressRef = useRef(0);
  const onProgressChangeRef = useRef(onProgressChange);
  const slidesArray = Children.toArray(children);
  const slidesCount = slidesArray.length;

  // Обновляем ref при изменении onProgressChange
  useEffect(() => {
    onProgressChangeRef.current = onProgressChange;
  }, [onProgressChange]);

  // Синхронизируем внешний activeIndex с внутренним состоянием
  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== currentIndex) {
      setCurrentIndex(activeIndex);
      // Сбрасываем прогресс при внешнем изменении activeIndex
      progressRef.current = 0;
      lastProgressRef.current = 0;
      if (onProgressChangeRef.current) {
        onProgressChangeRef.current(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]); // currentIndex намеренно исключен, чтобы избежать бесконечного цикла

  // Уведомляем о смене слайда только при изменении currentIndex
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]); // onSlideChange намеренно исключен, чтобы избежать лишних перерендеров

  // Объединенный интервал для автопромотки и прогресса
  useEffect(() => {
    if (!autoPlay || slidesCount <= 1) return;

    // Сброс прогресса при старте/перезапуске
    progressRef.current = 0;
    lastProgressRef.current = 0;
    if (onProgressChangeRef.current) {
      onProgressChangeRef.current(0);
    }

    // Интервал для обновления прогресса (каждые 100мс для плавности без избыточных ререндеров)
    const progressInterval = setInterval(() => {
      // Расчет: 100% / (autoPlayInterval / 100мс) = шаг прогресса за 100мс
      const progressStep = 100 / (autoPlayInterval / 100);
      progressRef.current += progressStep;
      const newProgress = Math.min(progressRef.current, 100);
      
      // Вызываем callback только если прогресс изменился на значительную величину (минимум 0.5%)
      if (onProgressChangeRef.current && Math.abs(newProgress - lastProgressRef.current) >= 0.5) {
        onProgressChangeRef.current(newProgress);
        lastProgressRef.current = newProgress;
      }
    }, 100); // 100мс = 10fps для плавной анимации без избыточных ререндеров

    // Интервал для смены слайдов
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesCount);
      // Сбрасываем прогресс при автоматической смене слайдов
      progressRef.current = 0;
      lastProgressRef.current = 0;
      if (onProgressChangeRef.current) {
        onProgressChangeRef.current(0);
      }
    }, autoPlayInterval);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [autoPlay, autoPlayInterval, slidesCount, currentIndex]); // currentIndex добавлен для перезапуска таймера при ручном переключении

  if (!slidesCount) {
    return null;
  }

  return (
    <div className={cn("w-full relative", className)}>
      <div className="relative w-full aspect-[9/20] flex items-center justify-center">
        {slidesArray.map((slide: ReactNode, index: number) => {
          const isActive = index === currentIndex;
          const distanceFromActive = Math.abs(index - currentIndex);
          const scale = isActive ? 1 : 1 - distanceFromActive * 0.15;
          // Равномерный отступ с учетом масштабирования предыдущих слайдов

          const offsetX = (index - currentIndex / 1.8 ) * (70 * scale) + (Math.pow(distanceFromActive, 2.6))  ;
          const offsetY = isActive ? 0 : -3 * (1 / scale);
          const rotationY = 0;
          const rotationX = 0;
          const rotationZ = 0;

          // Skew эффекты
          const skewX = 8; // Горизонтальный skew
          const skewY = -3; // Вертикальный skew

          // Простые эффекты
          const opacity = 1;
          const zIndex = isActive
            ? slidesCount + 1
            : slidesCount - distanceFromActive;

          return (
            <div
              key={index}
              className="absolute transition-all duration-500 cursor-pointer"
              style={{
                transform: `translateX(${offsetX}%) translateY(${offsetY}%) scale(${scale}) rotateY(${rotationY}deg) rotateX(${rotationX}deg) rotateZ(${rotationZ}deg) skewX(${skewX}deg) skewY(${skewY}deg)`,
                filter: isActive
                  ? "none"
                  : `blur(${2 + distanceFromActive * 2}px)`,
                zIndex: zIndex,
                opacity: opacity,
                transitionTimingFunction:
                  "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
              onClick={() => {
                setCurrentIndex(index);
                // Сброс прогресса
                progressRef.current = 0;
                lastProgressRef.current = 0;
                if (onProgressChangeRef.current) {
                  onProgressChangeRef.current(0);
                }
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>

      {/* Индикаторы карусели */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slidesArray.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              // Сброс прогресса
              progressRef.current = 0;
              lastProgressRef.current = 0;
              if (onProgressChangeRef.current) {
                onProgressChangeRef.current(0);
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  );
}
