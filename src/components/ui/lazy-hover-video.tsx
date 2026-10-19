"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import VolumeIcon from "@icons/volume-icon.svg";
import VolumeMuteIcon from "@icons/volume-mute-icon.svg";
import PlayIcon from "@icons/play-icon.svg";
import Image from "next/image";

interface LazyHoverVideoProps {
  /** URL видео */
  src?: string | null;
  /** URL постера (превью изображения) */
  poster?: string | null;
  /** Альтернативный текст */
  alt?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Зацикливание */
  loop?: boolean;
  /** Без звука */
  muted?: boolean;
  /** Плейсхолдер текст если нет видео */
  placeholder?: string;
  /** Показывать skeleton для постера */
  showPosterSkeleton?: boolean;
  /** Коллбек при клике на "Show Details" */
  onShowDetails?: () => void;
  /** Показывать кнопки управления */
  showControls?: boolean;
  /** Внешнее управление активным состоянием (например, наведением родителя) */
  isActive?: boolean;
}

export interface LazyHoverVideoRef {
  /** Запустить воспроизведение */
  play: () => Promise<void>;
  /** Поставить на паузу */
  pause: () => void;
  /** Проверить воспроизводится ли видео */
  isPlaying: () => boolean;
}

const LazyHoverVideo = forwardRef<LazyHoverVideoRef, LazyHoverVideoProps>(
  (
    {
      src,
      poster,
      alt = "Video preview",
      className,
      loop = true,
      muted = true,
      placeholder = "Video placeholder",
      showPosterSkeleton = true,
      onShowDetails,
      showControls = false,
      isActive,
    },
    ref
  ) => {
    const [isInViewport, setIsInViewport] = useState(false);
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const t = useTranslations("common");

    // Экспортируем методы управления через ref
    useImperativeHandle(
      ref,
      () => ({
        play: async () => {
          if (videoRef.current) {
            try {
              await videoRef.current.play();
              setIsPlaying(true);
            } catch (error) {
              console.warn("Failed to play video:", error);
            }
          }
        },
        pause: () => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        },
        isPlaying: () => {
          return isPlaying;
        },
      }),
      [isPlaying]
    );

    // Intersection Observer для определения видимости элемента
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInViewport(true);
              // После того как элемент попал в viewport, больше не наблюдаем за ним
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "100px", // Начинаем загрузку за 100px до попадания в viewport
          threshold: 0.1,
        }
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, []);

    // Управление воспроизведением при hover и внешнем управлении
    useEffect(() => {
      const video = videoRef.current;
      if (!video || !isInViewport) return;

      const shouldPlay = (isHovering || isActive) && isInViewport;

      if (shouldPlay) {
        video.play().catch((error) => {
          console.warn("Failed to play video on hover:", error);
        });
      } else {
        video.pause();
        // Возвращаем к началу при уходе курсора
        video.currentTime = 0;
      }
    }, [isActive, isHovering, isInViewport]);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handlePosterLoad = () => {
      setIsPosterLoaded(true);
    };

    const handlePosterError = () => {
      setHasError(true);
      setIsPosterLoaded(true);
    };

    const handleVideoError = () => {
      setHasError(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleShowDetails = (e: React.MouseEvent) => {
      e.stopPropagation();
      onShowDetails?.();
    };

    const containerClasses = clsx(
      "relative overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer",
      "[border-radius:11.5%/5.2%] aspect-[157/349]",
      className
    );

    const skeletonClasses = clsx(
      "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
      "bg-[length:200%_100%] animate-shimmer"
    );

    // Если нет src и poster, показываем плейсхолдер
    if (!src && !poster) {
      return (
        <div className={containerClasses}>
          <span className="text-gray-500 text-sm font-medium text-center px-4">
            {placeholder}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Skeleton для постера - показываем пока постер загружается */}
        {showPosterSkeleton && poster && !isPosterLoaded && !hasError && (
          <div className={skeletonClasses} />
        )}

        {/* Ошибка загрузки или нет постера - показываем play icon */}
        {(hasError || !poster) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 px-4 z-0">
            <PlayIcon className="size-[50%] text-white opacity-80" />
          </div>
        )}

        {/* Постер - всегда показываем если он есть */}
        {poster && !hasError && (
          <Image
            width={157}
            height={349}
            src={poster}
            alt={alt}
            className={clsx(
              "w-full h-full object-cover absolute inset-0",
              "transition-opacity duration-300",
              isPosterLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handlePosterLoad}
            onError={handlePosterError}
            loading="lazy"
          />
        )}

        {/* Видео - рендерим только когда элемент в viewport */}
        {isInViewport && src && (
          <video
            ref={videoRef}
            className={clsx(
              "w-full h-full object-cover absolute inset-0 z-[1]",
              "transition-opacity duration-300"
            )}
            loop={loop}
            muted={isMuted}
            playsInline
            preload="none"
            onPlay={handlePlay}
            onPause={handlePause}
            onError={handleVideoError}
            aria-label={alt}
            src={src}
          />
        )}

        {/* Кнопки управления - показываем только при hover */}
        {showControls && isHovering && (
          <div className="absolute bottom-0 right-0 flex items-center gap-[4px] justify-between w-full p-[7%] z-[3] bg-gradient-to-t from-black via-black/90 to-transparent">
            <button
              onClick={toggleMute}
              className="group text-[#97A8C6] hover:text-white transition-all duration-300"
              aria-label={t(isMuted ? "unmute" : "mute")}
            >
              {isMuted ? (
                <VolumeMuteIcon className="size-[18px]" />
              ) : (
                <VolumeIcon className="size-[18px]" />
              )}
            </button>
            {onShowDetails && (
              <button onClick={handleShowDetails} className="group">
                <span className="text-[12px] font-[700] text-[#97A8C6] group-hover:text-white transition-all duration-300">
                  {t("showDetails")}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

LazyHoverVideo.displayName = "LazyHoverVideo";

export default LazyHoverVideo;
