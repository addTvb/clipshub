"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
type LocalizationKey = string;

interface FormStep {
  number: number;
  title: LocalizationKey;
  description: LocalizationKey;
}

interface InfoMessage {
  title: LocalizationKey;
  text: LocalizationKey;
}

interface IProps {
  currentStep: number;
  steps: FormStep[];
  infoMesssage?: InfoMessage;
  baseLocalizationKey?: LocalizationKey; 
}

export const FormStepIndicator = ({currentStep, steps, infoMesssage, baseLocalizationKey}: IProps) => {
  const t = useTranslations(baseLocalizationKey || '');
  
  return (
    <div className="flex gap-[6px] lg:block lg:space-y-[6px] lg:p-[24px] lg:max-w-[297px]">
      {steps.map((step) => (
        <div
          key={step.number}
          className={clsx(
            "flex w-full items-center lg:w-auto lg:items-start gap-[16px]",
            step.number === steps.length && "w-min"
          )}
        >
          <div className="mt-1 flex flex-row w-full lg:w-auto lg:flex-col items-center gap-[6px]">
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
                  "w-full border-t h-[1px] lg:min-h-[30] lg:h-full lg:w-[1px] lg:border-l text-transparent ",
                  step.number < currentStep
                    ? "border-l-[#4DADE2]"
                    : "border-l-[#DFE3EA]"
                )}
              >
                .
              </span>
            )}
          </div>
          <div className="hidden space-y-[8px] pb-[24px] lg:block">
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

      {infoMesssage && (
        <div className="space-y-[14px] text-[#97A8C6] text-sm italic lg:block hidden">
          <p className="font-bold">{t(infoMesssage.title)}</p>
          <p className="font-medium">{t(infoMesssage.text)}</p>
        </div>
      )}
    </div>
  );
};
