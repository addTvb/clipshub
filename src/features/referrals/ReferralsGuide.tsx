import { useTranslations } from "next-intl";

export const Guide = () => {
  const t = useTranslations("influencer.referralProgram");

  return (
    <div className="flex flex-col gap-[6px] p-[24px] ">
      <div className="flex gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <div className="size-[32px] rounded-full flex items-center justify-center border border-blue300 border-solid text-blue300 flex-shrink-0">
            1
          </div>
          <div className="w-[2px] h-full mx-auto bg-blueGrad1 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[16px] font-[600] font-[inter] text-textColor">
            {t("referralGuide.step1.title")}
          </div>
          <div className="text-[14px] font-[400] font-[inter] text-gray400 mb-[24px]">
            {t("referralGuide.step1.description")}
          </div>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <div className="size-[32px] rounded-full flex items-center justify-center border border-blue300 border-solid text-blue300 flex-shrink-0">
            2
          </div>
          <div className="w-[2px] h-full mx-auto bg-blueGrad1 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[16px] font-[600] font-[inter] text-textColor">
            {t("referralGuide.step2.title")}
          </div>
          <div className="text-[14px] font-[400] font-[inter] text-gray400 mb-[24px]">
            {t("referralGuide.step2.description")}
          </div>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <div className="size-[32px] rounded-full flex items-center justify-center border border-blue300 border-solid text-blue300 flex-shrink-0">
            3
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[16px] font-[600] font-[inter] text-textColor">
            {t("referralGuide.step3.title")}
          </div>
          <div className="text-[14px] font-[400] font-[inter] text-gray400 mb-[24px]">
            {t("referralGuide.step3.description")}
          </div>
        </div>
      </div>
    </div>
  );
};
