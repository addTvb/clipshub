import clsx from "clsx";
import { useId, useState } from "react";
import YouTubeVideoModal from "./YouTubeVideoModal";
import { useTranslations } from "next-intl";

export default function TutorialButton() {
  const circleId = useId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("business.howItWorks");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <YouTubeVideoModal
        open={isModalOpen}
        setIsOpen={setIsModalOpen}
        videoId="dQw4w9WgXcQ" // Замените на реальный ID YouTube видео
      />
      <div className="relative inline-flex size-[114px] overflow-visible">
      {/* Rotating circular text overlay */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <svg
          className="size-[98px] animate-[spin_12s_linear_infinite]"
          viewBox="0 0 144 144"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id={`circle-path-${circleId}`}
              d="M 72 72 m -64 0 a 64 64 0 1 1 128 0 a 64 64 0 1 1 -128 0"
            />
          </defs>

          <text
            fill="#090C10"
            className="text-[16px] font-bold uppercase tracking-[0.2px]"
          >
            <textPath
              href={`#circle-path-${circleId}`}
              startOffset="0%"
              textLength="402" // длина окружности (2πr ≈ 402px)
              spacing="stretch" // равномерное распределение текста
            >
              <tspan dy="5">
                {t('button')}
              </tspan>
            </textPath>
          </text>
        </svg>
      </div>

      <button
        onClick={handleClick}
        className={clsx(
          // Base size and shape
          "relative z-10 size-full rounded-full group flex items-center justify-center overflow-hidden",
          // Base surface and subtle depth
          "bg-white shadow-[0px_24px_36px_rgba(58,62,104,0.2)]",
          // Hover glow
          "transition-shadow duration-300 hover:shadow-[0px_0px_40px_rgba(208,55,54,0.4)]"
        )}
        style={{
          // Top layer: radial white cover outside center to keep bg visible only in 64px circle
          backgroundImage:
            "radial-gradient(circle 32px at center, transparent 0 32px, white 33px), url(/static/images/business/landing/how-it-works/tutorial-button-image.webp)",
          // Ensure the image layer is 64x64 and centered; gradient covers full
          backgroundSize: "100% 100%, 64px 64px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        {/* Inner ring that fades on hover */}
        <div className="pointer-events-none absolute size-[65px] rounded-full border-2 border-white transition-opacity duration-300 group-hover:opacity-0" />

        {/* Play icon */}
        <svg
          className="relative z-10 transition-transform duration-300 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
        >
          <path
            d="M18 10.5005L2.57241e-05 20.8927L2.66326e-05 0.108179L18 10.5005Z"
            fill="white"
          />
        </svg>
      </button>
      </div>
    </>
  );
}
