import { cn } from "src/lib/utils";
import { Link } from "src/i18n/routing";
import SocialsIcon from "@public/static/images/landing/social.svg";
import CheckIcon from "@icons/check-icon.svg";
import { RewardState } from "src/types/base";
import { useTranslations } from "next-intl";

interface GuideStepProps {
  step: number;
  title: string;
  description: string;
  variant?: "default" | "success" | "active";
  isLast?: boolean;
  url?: string;
  titleIcon?: React.ReactNode;
  onLinkClick?: () => void;
}

const GuideStep = ({
  step,
  title,
  description,
  variant = "default",
  isLast = false,
  url,
  titleIcon,
  onLinkClick,
}: GuideStepProps) => {
  const content = (
    <>
      <div className="relative ">
        <div className="relative size-[42px] flex-shrink-0">
          {variant === "active" && (
            <div className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full rounded-full gradient-border !absolute animate-pulse"></div>
          )}
          {(variant === "active" || variant === "default") && (
            <div
              className={cn(
                "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[32px] rounded-full flex items-center justify-center !absolute",
                variant === "active" && "gradient-border",
                variant === "default" &&
                  "border-[2px] border-solid border-[#586781]"
              )}
            >
              <span
                className={cn(
                  "font-[Inter] text-[16px] font-[600] leading-[22px] text-[#586781]",
                  variant === "active" &&
                    "bg-purpleTextGrad bg-clip-text text-transparent"
                )}
              >
                {step}
              </span>
            </div>
          )}
          {variant === "success" && (
            <div className="!absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] rounded-full bg-purpleTextGrad">
              <CheckIcon height={20} width={20} />
            </div>
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "rounded-full h-[calc(100%-11px)] w-[2px] absolute top-[43px] left-1/2 -translate-x-1/2 bg-[#303948]",
              variant === "success" && "bg-purpleTextGrad"
            )}
          ></div>
        )}
      </div>

      <div className="flex flex-col gap-[8px] md:min-h-[70px] min-h-none">
        <div className="font-[Inter] md:text-[16px] text-[14px] font-[600] leading-[22px] bg-purpleTextGrad bg-clip-text text-transparent flex items-center gap-[8px]">
          {title}
          {titleIcon}
        </div>
        <div className="font-[Inter] md:text-[14px] text-[13px] font-[400] leading-[20px] text-white200 ">
          {description}
        </div>
      </div>
      {url && variant === "active" && (
        <div className="md:block hidden !absolute left-[-11px] top-[-14px] w-[calc(100%+27px)] h-[calc(100%+32px)] border-[1px] border-solid border-[#222936] rounded-[24px] z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </>
  );
  if (url && variant === "active") {
    return (
      <Link
        href={url}
        onClick={onLinkClick}
        className="flex gap-[16px] relative group"
      >
        {content}
      </Link>
    );
  }
  return <div className="flex gap-[16px] relative group">{content}</div>;
};

interface IProps {
  currentState?: RewardState;
  onClose?: () => void;
}

export const RewardGuide = ({ currentState, onClose }: IProps) => {
  const t = useTranslations("common.rewardGuide");

  // Функция для определения состояния шага в зависимости от currentState
  const getStepVariant = (
    stepNumber: number
  ): "default" | "success" | "active" => {
    switch (currentState) {
      case null:
      case undefined:
        return stepNumber === 1 ? "active" : "default";
      case "registered":
        if (stepNumber === 1) return "success";
        if (stepNumber === 2) return "active";
        return "default";
      case "channel_configured":
        if (stepNumber <= 2) return "success";
        if (stepNumber === 3) return "active";
        return "default";
      case "post_created":
        if (stepNumber <= 3) return "success";
        if (stepNumber === 4) return "active";
        return "default";
      case "post_moderating":
        if (stepNumber <= 4) return "success";
        if (stepNumber === 5) return "active";
        return "default";
      case "post_approved":
        if (stepNumber <= 5) return "success";
        if (stepNumber === 6) return "active";
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="flex flex-col gap-[32px] relative z-10 md:overflow-y-visible md:max-h-auto overflow-y-auto max-h-[80%] ">
      <GuideStep
        step={1}
        title={t("step1.title")}
        description={t("step1.description")}
        url={"/auth/register"}
        variant={getStepVariant(1)}
        onLinkClick={onClose}
      />
      <GuideStep
        step={2}
        title={t("step2.title")}
        description={t("step2.description")}
        variant={getStepVariant(2)}
        url={"/influencers"}
        titleIcon={<SocialsIcon height={20} />}
        onLinkClick={onClose}
      />
      <GuideStep
        step={3}
        title={t("step3.title")}
        description={t("step3.description")}
        variant={getStepVariant(3)}
        url={"/offers"}
        onLinkClick={onClose}
      />
      <GuideStep
        step={4}
        title={t("step4.title")}
        description={t("step4.description")}
        variant={getStepVariant(4)}
      />
      <GuideStep
        step={5}
        title={t("step5.title")}
        description={t("step5.description")}
        variant={getStepVariant(5)}
      />
      <GuideStep
        step={6}
        title={t("step6.title")}
        description={t("step6.description")}
        variant={getStepVariant(6)}
        isLast
      />
    </div>
  );
};
