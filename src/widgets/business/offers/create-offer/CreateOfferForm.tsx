"use client";

import { useTranslations } from "next-intl";
import { FormStepIndicator } from "./FormStepIndicator";
import { useCreateOfferStore } from "./model/useCreateOfferStore";
import { FirstStepOfferNameSocial } from "./form-steps/FirstStepOfferNameSocial";
import { SecondStepAdContent } from "./form-steps/second-step/SecondStepAdContent";
import { ThirdStepAdCategory } from "./form-steps/ThirdStepAdCategory";
import { FourthStepChannelViews } from "./form-steps/FourthStepChannelViews";
import { FifthStepBudget } from "./form-steps/fifth-step/FifthStepBudget";

interface IProps {
  title?: string;
  isEditMode?: boolean;
}

export default function CreateOfferForm({ title, isEditMode = false }: IProps) {
  const t = useTranslations("business");
  const currentStep = useCreateOfferStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FirstStepOfferNameSocial />;
      case 2:
        return <SecondStepAdContent />;
      case 3:
        return <ThirdStepAdCategory />;
      case 4:
        return <FourthStepChannelViews />;
      case 5:
        return <FifthStepBudget isEditMode={isEditMode} />;
      default:
        return <FirstStepOfferNameSocial />;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-screenMaxWidth mx-auto gap-[24px] min-[1220px]:gap-[40px]">
      <h1 className="text-[28px] md:text-[40px] font-bold text-textColor">
        {title || t("makeOffer")}
      </h1>

      <div className="flex gap-[32px] flex-col-reverse min-[1220px]:gap-[44px] min-[1220px]:flex-row">
        <div className="relative bg-white p-[12px] min-[1220px]:p-[24px] pt-[32px] rounded-[8px] w-full h-fit">
          <div className="absolute -top-[8px] rounded-[8px] bg-primary py-[4px] px-[6px] text-base font-bold text-white">
            {t("stepNumber", { number: currentStep })}
          </div>
          {renderStep()}
        </div>

        <FormStepIndicator />
      </div>
    </div>
  );
}
