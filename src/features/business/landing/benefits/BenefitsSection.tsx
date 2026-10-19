"use client";

import LandingBenefitsItem from "src/features/landing/components/BenefitsItem";
import { useTranslations } from "next-intl";
import LandingSectionTitle from "src/features/landing/components/SectionTitle";
import HowItWorksSection from "../howItWorks/HowItWorksSection";

const benefitsList = [
  {
    title: "business.benefits.items.automation.title",
    text: "business.benefits.items.automation.text",
    icon: "/static/images/business/landing/benefits/bot.svg",
  },
  {
    title: "business.benefits.items.smartOfferBuilder.title",
    text: "business.benefits.items.smartOfferBuilder.text",
    icon: "/static/images/business/landing/benefits/edit.svg",
  },
  {
    title: "business.benefits.items.ultraFastScaling.title",
    text: "business.benefits.items.ultraFastScaling.text",
    icon: "/static/images/business/landing/benefits/fast.svg",
  },
  {
    title: "business.benefits.items.noFakeViews.title",
    text: "business.benefits.items.noFakeViews.text",
    icon: "/static/images/business/landing/benefits/fake.svg",
  },
  {
    title: "business.benefits.items.noUpfrontPayments.title",
    text: "business.benefits.items.noUpfrontPayments.text",
    icon: "/static/images/business/landing/benefits/dollar.svg",
  },
  {
    title: "business.benefits.items.securePayments.title",
    text: "business.benefits.items.securePayments.text",
    icon: "/static/images/business/landing/benefits/password.svg",
  },
  {
    title: "business.benefits.items.realTimeDashboard.title",
    text: "business.benefits.items.realTimeDashboard.text",
    icon: "/static/images/business/landing/benefits/table.svg",
  },
  {
    title: "business.benefits.items.communitySupport.title",
    text: "business.benefits.items.communitySupport.text",
    icon: "/static/images/business/landing/benefits/support.svg",
  },
];

export default function BenefitsSection() {
  const t = useTranslations();

  return (
    <div className="px-[10px] bg-white lg:pt-[120px] md:pt-[64px] pt-[38px]">
      <div className="text-center max-w-screenMaxWidth mx-auto w-full">
        <LandingSectionTitle
          title={t("business.benefits.title")}
          subtitle={t("business.benefits.subtitle")}
        />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-[20px] gap-[12px] text-left">
          {benefitsList.map((benefit, index) => (
            <LandingBenefitsItem
              key={index}
              title={benefit.title}
              text={benefit.text}
              icon={benefit.icon}
              bgColor={"#090C10"}
            />
          ))}
        </div>

         <HowItWorksSection />
      </div>
    </div>
  );
}
