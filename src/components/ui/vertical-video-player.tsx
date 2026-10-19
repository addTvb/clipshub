"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface VerticalVideoPlayerProps {
  /** URL видео */
  src?: string;
  /** URL постера (превью изображения) */
  poster?: string;
  /** Альтернативный текст */
  alt?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Показывать ли контролы */
  controls?: boolean;
  /** Автовоспроизведение */
  autoPlay?: boolean;
  /** Зацикливание */
  loop?: boolean;
  /** Без звука */
  muted?: boolean;
  /** Плейсхолдер текст */
  placeholder?: string;
  /** Включить воспроизведение при ховере на плеер */
  playOnHover?: boolean;
}

export interface VerticalVideoPlayerRef {
  /** Запустить воспроизведение */
  play: () => Promise<void>;
  /** Поставить на паузу */
  pause: () => void;
  /** Проверить воспроизводится ли видео */
  isPlaying: () => boolean;
}

const VerticalVideoPlayer = forwardRef<VerticalVideoPlayerRef, VerticalVideoPlayerProps>(({
  src,
  poster,
  alt = "Vertical video",
  className,
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  placeholder = "Video placeholder",
  playOnHover = false,
}, ref) => {
  const [isLoading, setIsLoading] = useState(!poster); // Если есть постер, не показываем скелетон
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations("common");

  // Экспортируем методы управления через ref
  useImperativeHandle(ref, () => ({
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
    }
  }), [isPlaying]);

  const handleVideoLoaded = () => {
    setIsLoading(false);
    
    // Если автовоспроизведение отключено, сразу ставим на паузу
    //Если у <video> autoplay="false" то не отображаются preview видео у которых нет постера (на safari Iphone)
    //По этому всегда оставляем autoplay="true"
    if (!autoPlay && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleVideoClick = () => {
    // При клике на видео пытаемся его загрузить и воспроизвести
    if (videoRef.current && isLoading) {
      videoRef.current.load();
    }
  };


  const handleMouseEnter = () => {
    if (!autoPlay && playOnHover && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Игнорируем ошибки автовоспроизведения
      });
    }
  };

  const handleMouseLeave = () => {
    if (!autoPlay && playOnHover && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const containerClasses = clsx(
    "relative overflow-hidden bg-gray-200 [border-radius:11.5%/5.2%] flex items-center justify-center aspect-[157/349]",
    className
  );

  const skeletonClasses = clsx(
    "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
    "bg-[length:200%_100%] animate-shimmer"
  );

  // Если нет src, показываем плейсхолдер
  if (!src) {
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
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Скелетон загрузки - показываем только если нет постера */}
      {isLoading && !poster && <div className={skeletonClasses} />}

      {/* Ошибка загрузки */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 px-4">
          <svg
            className="w-8 h-8 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-center">{t("failedToLoadVideo")}</span>
        </div>
      )}

      {/* Видео плеер */}
      <video
        ref={videoRef}
        className={clsx(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        poster={poster}
        controls={controls}
        autoPlay={true} // Всегда включаем autoplay для загрузки превью
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        onCanPlay={handleVideoLoaded}
        onLoadedData={handleVideoLoaded}
        onLoadedMetadata={handleVideoLoaded}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        onClick={handleVideoClick}
        aria-label={alt}
        src={src}
      >
      </video>
    </div>
  );
});

VerticalVideoPlayer.displayName = "VerticalVideoPlayer";

export default VerticalVideoPlayer;
