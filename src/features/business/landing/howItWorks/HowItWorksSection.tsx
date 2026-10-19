"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import LandingSectionTitle from "src/features/landing/components/SectionTitle";
import HowItWorksStep from "./HowItWorksStep";
import HowItWorksCarousel from "./HowItWorksCarousel";
import HowItWorksMobileCarousel from "./HowItWorksMobileCarousel";
import BackArrowIcon from "@icons/back-arrow-icon.svg";
// import TutorialButton from "./TutorialButton";
import { useWindowSize } from "usehooks-ts";

const steps = [
  {
    key: "register",
    titleKey: "business.howItWorks.steps.register.title",
    textKey: "business.howItWorks.steps.register.text",
  },
  {
    key: "createCampaign",
    titleKey: "business.howItWorks.steps.createCampaign.title",
    textKey: "business.howItWorks.steps.createCampaign.text",
  },
  {
    key: "makeOffer",
    titleKey: "business.howItWorks.steps.makeOffer.title",
    textKey: "business.howItWorks.steps.makeOffer.text",
  },
  {
    key: "fundCampaign",
    titleKey: "business.howItWorks.steps.fundCampaign.title",
    textKey: "business.howItWorks.steps.fundCampaign.text",
  },
  {
    key: "getViews",
    titleKey: "business.howItWorks.steps.getViews.title",
    textKey: "business.howItWorks.steps.getViews.text",
  },
];

export default function HowItWorksSection() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(1); // 1-indexed для отображения
  const { width } = useWindowSize();

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : steps.length));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < steps.length ? prev + 1 : 1));
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="border-solid border-[1px] border-gray550 rounded-t-[24px] mt-[120px] relative scroll-mt-[110px]" id="how-it-works">
      <div className="p-[24px] flex justify-between items-end border-b-solid border-b-[1px] border-gray550">
        <LandingSectionTitle
          title={t("business.howItWorks.subtitle")}
          subtitle={t("business.howItWorks.title")}
          className="text-left 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 mb-0"
        />
        <div className="flex gap-2">
          <Button
            variant="text"
            size="sm"
            onClick={handlePrevStep}
            className="group"
          >
            <BackArrowIcon className="stroke-gray550 group-hover:stroke-textColor transition-stroke duration-300" />
          </Button>
          <Button
            variant="text"
            size="sm"
            onClick={handleNextStep}
            className="group"
          >
            <BackArrowIcon className=" size-[30px] rotate-180 stroke-gray550 group-hover:stroke-textColor transition-stroke duration-300" />
          </Button>
        </div>
      </div>
    {/*   {width > 768 && (
        <div className="absolute 3xl:right-0  3xl:bottom-0 3xl:translate-x-1/2 3xl:translate-y-1/2 right-[15px] bottom-[15px] translate-x-0 translate-y-0 z-10 w-fit">
          <TutorialButton />
        </div>
      )} */}
      {width > 1440 && (
        <div className="p-[36px] pt-[72px] grid 3xl:grid-cols-[3fr_2fr] grid-cols-[1fr_1fr] gap-[80px] ">
          <div className="flex flex-col gap-[18px]">
            {steps.map((step, index) => (
              <div key={step.key} onClick={() => handleStepClick(index + 1)}>
                <HowItWorksStep
                  stepNumber={index + 1}
                  titleKey={step.titleKey}
                  textKey={step.textKey}
                  isActive={currentStep === index + 1}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-start 3xl:w-[150%] mt-[-20px] relative">
            <div className={`rounded-[12px] overflow-hidden w-full`}>
              {/* Browser Header */}
              <div className="bg-gray300 px-[14px] py-[8px] flex items-center gap-[4px]">
                <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
              </div>

              {/* Content Area */}
              <div className="bg-white200 p-[14px] w-full aspect-[7/5] flex flex-col gap-[10px] relative">
                <HowItWorksCarousel currentStep={currentStep} />
              </div>
            </div>
          </div>
        </div>
      )}
      {width <= 1440 && (
        <div className="p-[12px] pt-[24px] flex flex-col gap-[24px] items-start">
          {/* Индикатор шага и заголовок/описание над каруселью */}
          <div className="flex flex-col items-start gap-[8px] max-w-[640px] w-full px-2 text-left">
            <div className="text-[18px] font-bold text-textColor flex items-center gap-[12px]">
              <div className="text-black900/20 font-bold">/{currentStep}</div>
              {t(steps[currentStep - 1].titleKey)}
            </div>
            <div className="text-[14px] text-gray400 leading-[20px]">
              {t(steps[currentStep - 1].textKey)}
            </div>
          </div>

          {/* Карусель скринов */}
          <div className="w-[100svw] ">
            <HowItWorksMobileCarousel
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </div>
      )}
    </div>
  );
}
