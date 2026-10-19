import BenefitsSection from "src/features/business/landing/benefits/BenefitsSection";
import HeroSection from "src/features/business/landing/hero/HeroSection";
import MakeBrandSection from "src/features/business/landing/makeBrand/MakeBrandSection";
import FaqSection from "src/features/business/landing/faq/FaqSection";
import { CpmComparison } from "src/widgets/business/landing/cmp-comparison/CpmComparison";
import { KeyChallenges } from "src/widgets/business/landing/KeyChallenges";
import { TrustedBy } from "src/widgets/business/landing/TrustedBy";
import ContactUsSection from "src/features/business/landing/contactUs/ContactUsSection";
import ShowcaseSection from "src/features/business/landing/showcase/ShowcaseSection";

export default function BusinessLanding() {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="w-[80svw] aspect-[2/1] bg-radialBlue2 rounded-[50%] absolute left-0 top-0 translate-x-[-10%] translate-y-[-40%] z-[-1]"></div>
      <div className="w-[80svw] aspect-[2/1] bg-radialBlue rounded-[50%] absolute right-0 top-0 translate-x-[15%] translate-y-[-40%] z-[-1]"></div>
      <div className="w-full">
        <HeroSection />
        <div className="bg-textColor">
          <TrustedBy />
          <CpmComparison />
          <KeyChallenges />
        </div>
        <MakeBrandSection />
        <ShowcaseSection />
        <BenefitsSection />
        <ContactUsSection />
        <FaqSection />
      </div>
    </div>
  );
}
