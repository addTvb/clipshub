"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCreateOfferStore } from "./model/useCreateOfferStore";

const steps = [
  {
    number: 1,
    title: "chooseSocialNetwork",
    description: "instagramTikTokYouTube",
  },
  {
    number: 2,
    title: "uploadAdContent",
    description: "uploadAdContentDesc",
  },
  {
    number: 3,
    title: "selectAdCategory",
    description: "selectAdCategoryDesc",
  },
  {
    number: 4,
    title: "setUpAd",
    description: "setUpAdDesc",
  },
  {
    number: 5,
    title: "setBudget",
    description: "setBudgetDesc",
  },
];

export const FormStepIndicator = () => {
  const t = useTranslations("business.offerForm");
  const currentStep = useCreateOfferStore((state) => state.currentStep);
  const goToStep = useCreateOfferStore((state) => state.goToStep);

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber <= currentStep) goToStep(stepNumber);
  };

  return (
    <div className="flex gap-[6px] min-[1220px]:block min-[1220px]:space-y-[6px] min-[1220px]:p-[24px] min-[1220px]:max-w-[297px]">
      {steps.map((step) => (
        <div
          key={step.number}
          className={clsx(
            "flex w-full items-center min-[1220px]:w-auto min-[1220px]:items-stretch gap-[16px]",
            step.number <= currentStep && "cursor-pointer",
            step.number === steps.length && "w-min"
          )}
          onClick={() => handleStepClick(step.number)}
        >
          <div className="mt-1 flex flex-row w-full min-[1220px]:w-auto min-[1220px]:flex-col items-center gap-[6px]">
            {step.number < currentStep ? (
              <div className="bg-primary rounded-full py-[5px] px-[6px] min-h-[32px] min-w-[32px]">
                <Image
                  src="/static/icons/tick-white.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <div
                className={clsx(
                  "flex items-center justify-center font-medium text-base min-h-[32px] min-w-[32px] rounded-full border-2",
                  currentStep === step.number
                    ? "border-[#3188AA] text-[#3188AA]"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {step.number}
              </div>
            )}
            {step.number !== steps.length && (
              <span
                className={clsx(
                  "w-full border-t h-[1px] min-[1220px]:min-h-[30] min-[1220px]:flex-1 min-[1220px]:w-[1px] min-[1220px]:border-l text-transparent ",
                  step.number < currentStep
                    ? "border-l-[#4DADE2]"
                    : "border-l-[#DFE3EA]"
                )}
              >
                .
              </span>
            )}
          </div>
          <div className="hidden space-y-[8px] pb-[24px] min-[1220px]:block">
            <p
              className={clsx(
                "font-medium",
                currentStep >= step.number ? "text-textColor" : "text-gray500"
              )}
            >
              {t(step.title)}
            </p>
            <p
              className={clsx(
                "text-sm font-[Inter]",
                currentStep >= step.number ? "text-gray400" : "text-gray500"
              )}
            >
              {t(step.description)}
            </p>
          </div>
        </div>
      ))}

      {/* <div className="space-y-[14px] text-[#97A8C6] text-sm italic">
        <p className="font-bold">{t("offerSavedAsDraft")}</p>
        <p className="font-medium">{t("offerSavedAsDraftDesc")}</p>
      </div> */}
    </div>
  );
};
