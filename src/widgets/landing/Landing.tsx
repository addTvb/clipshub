"use client";

import LandingHero from "src/features/landing/HeroSection";
import LandingHowItWorks from "src/features/landing/HowItWorksSection";
import LandingBenefits from "src/features/landing/BenefitsSection";
import LandingShowcase from "src/features/landing/ShowcaseSection";
import LandingFAQSection from "src/features/landing/FAQSection";

export const Landing = () => {
  return (
    <div className="relative bg-[#fff]">
      <LandingHero />
      <div className="flex flex-col gap-[120px] max-w-[1440px] m-auto px-[10px]">
        <LandingHowItWorks />
        <LandingBenefits />
        <LandingShowcase />
        <LandingFAQSection />
      </div>
    </div>
  );
};
