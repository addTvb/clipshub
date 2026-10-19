import { useTranslations } from "next-intl";
import { clsx } from "clsx";

interface HowItWorksStepProps {
  stepNumber: number;
  titleKey: string;
  textKey: string;
  isActive?: boolean;
}

export default function HowItWorksStep({
  stepNumber,
  titleKey,
  textKey,
  isActive = false,
}: HowItWorksStepProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "cursor-pointer text-left p-[18px] grid grid-cols-[1fr_3fr] rounded-[24px] border-solid border-[1px] transition-all duration-300",
        isActive
          ? "bg-black900 border-black900"
          : "border-transparent hover:border-gray550"
      )}
    >
      <div className="flex items-center gap-[12px] min-w-[268px]">
        <div
          className={clsx(
            "text-[20px] font-bold",
            isActive ? "text-black400" : "opacity-[0.2] text-black900"
          )}
        >
          /{stepNumber}
        </div>
        <div
          className={clsx(
            "text-[20px] font-bold max-w-[268px]",
            isActive ? "text-white" : "text-black900"
          )}
        >
          {t(titleKey)}
        </div>
      </div>

      <div
        className={clsx(
          "font-[Inter] text-[16px] flex-1 w-full max-w-[405px]",
          isActive ? "text-white" : "text-gray400"
        )}
      >
        {t(textKey)}
      </div>
    </div>
  );
}
