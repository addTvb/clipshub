"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

interface StatItemProps {
  value: string;
  title: string;
  description: string;
  className?: string;
}

function StatItem({ value, title, description, className }: StatItemProps) {
  return (
    <div className={clsx(
      "flex flex-col justify-start xl:gap-[14px] gap-[8px] px-[18px] py-[28px] md:px-[32px] md:py-[36px] lg:px-[40px] lg:py-[36px] xl:px-[48px] xl:py-[48px] 2xl:px-[64px] 2xl:py-[64px] flex-1",
      className
    )}>
      <div className="text-[32px] md:text-[48px] lg:text-[44px] xl:text-[52px] 2xl:text-[64px] font-bold leading-[36px] md:leading-[54px] lg:leading-[50px] xl:leading-[58px] 2xl:leading-[72px] text-dark100 font-sans">
        {value}
      </div>
      <div className="flex flex-col gap-[8px] xl:gap-[14px]">
        <div className="text-[18px] md:text-[24px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-bold leading-[22px] md:leading-[28px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[34px] text-dark100 font-sans">
          {title}
        </div>
        <div className="text-[12px] md:text-[14px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] font-medium leading-[16px] md:leading-[18px] lg:leading-[17px] xl:leading-[18px] 2xl:leading-[22px] text-gray400">
          {description}
        </div>
      </div>
    </div>
  );
}

interface StatsSectionProps {
  className?: string;
}

export default function StatsSection({ className }: StatsSectionProps) {
  const t = useTranslations("business.landing.stats");

  return (
    <div className={clsx(
      "grid grid-cols-2 lg:flex lg:items-start w-full border-t border-gray300 border-solid",
      className
    )}>
      <StatItem
        value={t("clippers.value")}
        title={t("clippers.title")}
        description={t("clippers.description")}
        className="border-r border-gray300 border-solid border-b lg:border-b-0"
      />
      
      <StatItem
        value={t("offersLaunched.value")}
        title={t("offersLaunched.title")}
        description={t("offersLaunched.description")}
        className="border-b lg:border-b-0 lg:border-r border-gray300 border-solid"
      />
      
      <StatItem
        value={t("paidToClippers.value")}
        title={t("paidToClippers.title")}
        description={t("paidToClippers.description")}
        className="border-r border-gray300 border-solid"
      />
      
      <StatItem
        value={t("completedViews.value")}
        title={t("completedViews.title")}
        description={t("completedViews.description")}
      />
    </div>
  );
}
