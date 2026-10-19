import { useTranslations } from "next-intl";
import { CpmComparisonTable } from "./CpmComparisonTable";
import { CpmSlider } from "./CpmSlider";
import CpmChart from "./CpmChart";

export const CpmComparison = () => {
  const t = useTranslations("business");
  return (
    <div className="flex flex-col-reverse items-center lg:grid lg:grid-cols-2 gap-0 lg:gap-[32px] px-[10px] py-[50px] md:px-[34px] md:pt-[118px] md:pb-[73px] bg-textColor max-w-screenMaxWidth mx-auto z-10">
      <div className="flex flex-col gap-[24px] lg:gap-[72px]">
        <div className="hidden lg:flex flex-col gap-[22px]">
          <div className="flex flex-col gap-[8px]">
            <span className="text-gray550 text-xl font-bold">
              {t("landing.cpmComparison.matching")}
            </span>
            <h2 className="text-white text-[40px] font-bold">
              {t("landing.cpmComparison.title")}
            </h2>
          </div>

          <span className="text-gray400 text-sm font-medium">
            {t("landing.cpmComparison.subtitle")}
          </span>
        </div>

        <CpmComparisonTable />
        
        <CpmSlider />
      </div>
      <div className="w-full">
        <div className="flex lg:hidden flex-col gap-[16px] items-center text-center">
          <div className="flex flex-col items-center">
            <span className="text-gray550 text-lg font-bold">
              {t("landing.cpmComparison.matching")}
            </span>
            <h2 className="text-white text-[28px] font-bold">
              {t("landing.cpmComparison.title")}
            </h2>
          </div>

          <span className="text-gray400 text-sm font-medium text-center">
            {t("landing.cpmComparison.subtitle")}
          </span>
        </div>

        <CpmChart />
      </div>
    </div>
  );
};
