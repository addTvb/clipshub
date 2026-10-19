"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import clsx from "clsx";
import Image from "next/image";
import { useAuthStore } from "src/store/auth";
import { useGetUser } from "src/queries/useGetUser";
import { usePathname } from "next/navigation";
import { setBannerClosedCookie, isBannerClosed } from "src/lib/cookieSetter";
import { FirstVideoRewardModal } from "./RewardModal";
import { RotateGear } from "./RotateGear";
import CloseIcon from "@icons/close.svg";
import { cn } from "src/lib/utils";

// Константа для управления функциональностью cookie
const BANNER_COOKIE_ENABLED = false;

const stepItem = (number: number, title: string) => {
  return (
    <div className="flex items-center gap-[10px] text-[16px] leading-[22px] font-bold text-white font-[Inter]">
      <div className="relative size-[42px] flex-shrink-0">
        <div className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full rounded-full gradient-border !absolute animate-pulse"></div>
        <div
          className={cn(
            "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[32px] rounded-full flex items-center justify-center !absolute",
            "gradient-border"
          )}
        >
          <span
            className={cn(
              "font-[Inter] text-[16px] font-[600] leading-[22px] text-[#586781]",
              "bg-purpleTextGrad bg-clip-text text-transparent"
            )}
          >
            {number}
          </span>
        </div>
        <div
          className={cn(
            "rounded-full h-[9px] w-[2px] absolute top-[43px] left-1/2 -translate-x-1/2 bg-[#303948]"
          )}
        ></div>
        <div
          className={cn(
            "rounded-full h-[9px] w-[2px] absolute top-[0px] left-1/2 -translate-x-1/2 translate-y-[-100%]",
            "bg-purpleTextGrad"
          )}
        ></div>
      </div>
      {title}
    </div>
  );
};

export const Banner = () => {
  const t = useTranslations("common.banner");
  const tSteps = useTranslations("common.rewardGuide");
  const { isAuthenticated } = useAuthStore();
  const { featureFlags, user } = useGetUser();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [finalTranslateX, setFinalTranslateX] = useState(0);
  // const bannerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const steps = {
    registered: {
      number: 2,
      title: tSteps("step2.title"),
    },
    channel_configured: {
      number: 3,
      title: tSteps("step3.title"),
    },
    post_created: {
      number: 4,
      title: tSteps("step4.title"),
    },
    post_moderating: {
      number: 5,
      title: tSteps("step5.title"),
    },
    post_approved: {
      number: 6,
      title: tSteps("step6.title"),
    },
  };

  // Логика видимости баннера
  useEffect(() => {
    if (
      !pathname.includes("/clipper") &&
      !pathname.includes("/influencers")
    ) {
      setIsBannerVisible(false);
      return;
    }

    // Проверяем, закрыт ли баннер через cookies (только если включено)
    if (BANNER_COOKIE_ENABLED && isBannerClosed()) {
      setIsBannerVisible(false);
      return;
    }

    if (!isAuthenticated) {
      setIsBannerVisible(true);
      return;
    }

    // Если пользователь авторизован, проверяем feature flags
    if (isAuthenticated) {
      // Показываем баннер только если feature flag доступен и не получен
      if (
        featureFlags?.influencer_welcome_bonus.available &&
        !featureFlags?.influencer_welcome_bonus.earned
      ) {
        setIsBannerVisible(true);
      } else {
        // Скрываем баннер во всех остальных случаях для авторизованных пользователей
        setIsBannerVisible(false);
      }
      return;
    }
  }, [isAuthenticated, featureFlags, pathname]);

  // Обработчик ховера
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Обработчики для мобильных жестов
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      setCurrentX(touch.clientX);

      const deltaX = touch.clientX - startX;
      setTranslateX(deltaX);
    },
    [isDragging, startX]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 80;

    if (Math.abs(deltaX) > threshold) {
      // Определяем направление свайпа
      const direction = deltaX > 0 ? "right" : "left";
      setSwipeDirection(direction);

      // Устанавливаем финальную позицию для анимации
      const finalX = direction === "right" ? 200 : -200;
      setFinalTranslateX(finalX);

      // Сразу запускаем анимацию закрытия
      setIsClosing(true);
      setTimeout(() => {
        setIsBannerVisible(false);
        if (BANNER_COOKIE_ENABLED) {
          setBannerClosedCookie();
        }
      }, 300);
    } else {
      // Возвращаем баннер в исходное положение только если свайп недостаточный
      setTranslateX(0);
    }

    setIsDragging(false);
    // Убираем сброс translateX при успешном свайпе
    if (Math.abs(deltaX) <= threshold) {
      setTranslateX(0);
    }
  }, [isDragging, currentX, startX]);

  // Обработчик закрытия с анимацией
  const handleClose = useCallback(() => {
    setSwipeDirection(null); // Сброс направления для кнопки
    setIsClosing(true);
    setTimeout(() => {
      setIsBannerVisible(false);
      if (BANNER_COOKIE_ENABLED) {
        setBannerClosedCookie();
      }
    }, 300); // Длительность анимации
  }, []);

  // Обработчик клика по кнопке действия
  const handleActionClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  if (!isBannerVisible || user?.type === "business") return null;

  return (
    <>
      {isModalOpen && (
        <FirstVideoRewardModal
          open={isModalOpen}
          setIsOpen={setIsModalOpen}
          currentState={featureFlags?.influencer_welcome_bonus.current_state}
        />
      )}
      <div className="fixed md:bottom-5 bottom-20 left-1/2 -translate-x-1/2 z-[11] w-max max-w-[100svw] ref={bannerRef}">
        <div
          className="md:min-w-[560px] w-fit mx-auto px-4 cursor-pointer"
          onClick={handleActionClick}
        >
          <div
            className={clsx(
              "relative rounded-[24px]",
              "transition-all duration-300 ease-out",
              isDragging && "transition-none",
              isClosing && "opacity-0",
              isClosing && !swipeDirection && "scale-95"
            )}
            style={{
              transform: isClosing
                ? `translateX(${finalTranslateX}px)`
                : `translateX(${translateX}px)`,
              touchAction: "none",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Базовый градиент (обычный фон) */}
            <div
              className="absolute inset-0 z-0 pointer-events-none rounded-[24px]"
              style={{
                background:
                  "linear-gradient(90deg, #0D3571 0%, #010D22 14.17%)",
              }}
            />
            {/* Слой с hover-градиентом, анимируем opacity */}
            <div
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 rounded-[24px]"
              style={{
                background:
                  "linear-gradient(90deg, #0D3571 0%, #010D22 44.23%)",
                opacity: isHovered ? 1 : 0,
              }}
            />
            <div className="relative w-full">
              {/* Основной контент баннера */}
              <div className="relative z-10 flex items-center h-full p-[10px]">
                {/* Иконка с подарком */}
                <div className="absolute left-0 top-0 size-full rounded-[24px] overflow-hidden">
                  <div className="flex-shrink-0 absolute left-[-13px] bottom-[-11px]">
                    <div
                      className={clsx(
                        "size-[66px] h-[68px] transition-transform duration-300 ease-out",
                        isHovered && "rotate-[-15deg]"
                      )}
                    >
                      <Image
                        src="/static/images/gift.webp"
                        alt="reward icon"
                        width={66}
                        height={68}
                        className="w-full h-full object-contain sm:block hidden"
                      />
                    </div>
                  </div>
                  <RotateGear
                    size={103}
                    className="md:translate-x-[40%] md:translate-y-[-40%] translate-x-[45%] translate-y-[-45%]"
                  />
                </div>

                {/* Текст банера */}
                {!featureFlags?.influencer_welcome_bonus.current_state ? (
                  <div className="flex-1 min-w-0 sm:ml-[63px] ml-[15px]">
                    <span className="font-[Inter] sm:text-[16px] text-[14px] leading-[22px] font-bold text-white">
                      <span className="bg-purpleTextGrad bg-clip-text text-transparent">
                        {t("earnText")}
                      </span>{" "}
                      <Image
                        className="inline-block"
                        src="/static/images/3-dollars.svg"
                        alt="reward icon"
                        width={26}
                        height={23}
                      />{" "}
                      {t("forFirstReel")}
                    </span>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0 sm:ml-[63px] ml-[15px]">
                    {stepItem(
                      steps[
                        featureFlags?.influencer_welcome_bonus.current_state
                      ].number,
                      steps[
                        featureFlags?.influencer_welcome_bonus.current_state
                      ].title
                    )}
                  </div>
                )}

                {/* Кнопка действия */}
                <div className="flex-shrink-0 ml-3 sm:ml-4">
                  <Button className="h-auto font-bold sm:text-[20px] text-[16px] sm:leading-[26px] leading-[22px] hover:text-gray-300 text-white border-white hover:border-gray-300 transition-all duration-300 border-[1px] border-solid bg-transparent hover:bg-transparent rounded-[16px] px-[10px] py-[8px]">
                    {t("button")}
                  </Button>
                </div>
                {/* Кнопка закрытия */}
                <div
                  className={clsx(
                    "absolute right-[-25px] sm:right-[-30px] top-[-25px] sm:top-[-30px] w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] flex items-center justify-center z-20",
                    "transition-all duration-200 ease-out",
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="flex items-center justify-center p-0 bg-white200 rounded-[12px] transition-all duration-150 hover:scale-90"
                  >
                    <CloseIcon className="size-[28px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
