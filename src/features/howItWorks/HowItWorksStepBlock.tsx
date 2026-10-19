/* eslint-disable i18next/no-literal-string */
import { ReactNode, memo } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { UiLink } from "src/components/ui/link/link";

type ContentPosition = "right" | "bottom";
type BackgroundType = "default" | "light";
type AlignContent = "start" | "center" | "end";

export interface HowItWorksStepBlockProps {
  /** Номер шага */
  stepNumber: number;
  /** Заголовок шага */
  title: string;
  /** Описание шага */
  description?: string | ReactNode;
  /** Положение блока с контентом: 'right' - справа, 'bottom' - снизу */
  contentPosition?: ContentPosition;
  /** Фон блока */
  background?: BackgroundType;
  /** Дополнительные CSS классы */
  className?: string;
  /** Контент (изображения, видео и т.д.) */
  children?: ReactNode;
  /** Выравнивание контента */
  alignContent?: AlignContent;
  /** перенос номера шага */
  stepNumberWrapping?: boolean;
}

const HowItWorksStepBlock = memo(function HowItWorksStepBlock({
  stepNumber,
  title,
  description,
  contentPosition = "right",
  background = "default",
  className,
  children,
  alignContent = "start",
  stepNumberWrapping = false,
}: HowItWorksStepBlockProps) {
  const t = useTranslations("influencer.howItWorks");

  const backgroundClasses = {
    default: "bg-white",
    light: "bg-white/50",
  };

  // Определяем классы для выравнивания в зависимости от позиции контента
  const getAlignmentClasses = () => {
    if (contentPosition === "bottom") {
      // Для вертикального расположения используем justify-*
      return {
        "justify-start": alignContent === "start",
        "justify-center": alignContent === "center",
        "justify-end": alignContent === "end",
      };
    } else {
      // Для горизонтального расположения используем items-*
      return {
        "items-start": alignContent === "start",
        "items-center": alignContent === "center",
        "items-end": alignContent === "end",
      };
    }
  };

  const containerClasses = clsx(
    "md:p-9 sm:p-6 p-3 transition-all",
    backgroundClasses[background],
    contentPosition === "bottom"
      ? "flex flex-col md:gap-[56px] sm:gap-[32px] gap-[24px]"
      : "flex flex-row",
    getAlignmentClasses(),
    className
  );

  return (
    <div className={containerClasses}>
      {/* Текстовый блок */}
      <div
        className={clsx(
          "flex gap-3",
          stepNumberWrapping && "sm:flex-row flex-col"
        )}
      >
        {/* Номер шага */}
        <div className="md:text-[28px] sm:text-[20px] text-[16px] font-bold leading-[1.21] text-textColor opacity-20 shrink-0">
          /{stepNumber}
        </div>

        {/* Контент */}
        <div className="flex flex-col gap-3">
          <h3 className="md:text-[28px] sm:text-[20px] text-[16px] font-bold leading-[1.21] text-[#090C10]">
            {title}
          </h3>
          {description && (
            <div className="md:text-[16px] sm:text-[14px] text-[13px] font-medium leading-[1.375] text-[#303948] font-[Inter]">
              <div className="whitespace-pre-line">{description}</div>

              {stepNumber === 8 && (
                <div className="flex items-center gap-[12px] mt-[12px]">
                  <div className="text-gray350 font-medium text-sm">
                    {t("steps.editVideo.youCanDoAllThisInTheApp")}
                  </div>
                  <Image
                    src="/static/icons/capcut.svg"
                    alt="Capcut"
                    width={68}
                    height={13}
                  />
                  <UiLink
                    href="https://play.google.com/store/apps/details?id=com.lemon.lvoverseas&hl=ru"
                    target="_blank"
                    className="flex items-center gap-[2px] text-sm font-bold"
                    underlineColor="blue"
                  >
                    <span className="text-blue300">Google Play</span>
                    <Image
                      src="/static/icons/link.svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </UiLink>
                  <UiLink
                    href="https://apps.apple.com/ru/app/capcut-photo-video-editor/id1500855883?l=en-GB"
                    target="_blank"
                    className="flex items-center gap-[2px] text-sm font-bold"
                    underlineColor="blue"
                  >
                    <span className="text-blue300">App Store</span>
                    <Image
                      src="/static/icons/link.svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </UiLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Контент (изображения/видео) */}
      {children && (
        <div
          className={clsx(
            "shrink-0",
            contentPosition === "bottom" ? "w-full" : "w-auto"
          )}
        >
          <div
            className={clsx({
              "flex justify-center": contentPosition === "bottom",
              "ml-auto": contentPosition !== "bottom",
            })}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
});

export default HowItWorksStepBlock;
