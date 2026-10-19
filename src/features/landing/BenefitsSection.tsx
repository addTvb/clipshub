import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingBenefitsItem from "./components/BenefitsItem";
import { useTranslations } from "next-intl";
import LandingSectionTitle from "./components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const benefitsList = [
  {
    title: 'landing.benefits.items.newWayToEarn.title',
    text: 'landing.benefits.items.newWayToEarn.text',
    icon: '/static/images/landing/dollar.svg'
  },
  {
    title: 'landing.benefits.items.startToday.title',
    text: 'landing.benefits.items.startToday.text',
    icon: '/static/images/landing/fast.svg'
  },
  {
    title: 'landing.benefits.items.readyMadeAds.title',
    text: 'landing.benefits.items.readyMadeAds.text',
    icon: '/static/images/landing/video.svg'
  },
  {
    title: 'landing.benefits.items.reservedBudget.title',
    text: 'landing.benefits.items.reservedBudget.text',
    icon: '/static/images/landing/reserved.svg'
  },
  {
    title: 'landing.benefits.items.bonusesForBigReach.title',
    text: 'landing.benefits.items.bonusesForBigReach.text',
    icon: '/static/images/landing/withdraw.svg'
  },
  {
    title: 'landing.benefits.items.perfectForShortCreators.title',
    text: 'landing.benefits.items.perfectForShortCreators.text',
    icon: 'social'
  },
  {
    title: 'landing.benefits.items.offersMatchNiche.title',
    text: 'landing.benefits.items.offersMatchNiche.text',
    icon: '/static/images/landing/category-influencer.svg'
  },
  {
    title: 'landing.benefits.items.communityAndSupport.title',
    text: 'landing.benefits.items.communityAndSupport.text',
    icon: '/static/images/landing/support.svg'
  }
]

const LandingBenefits = () => {
  const t = useTranslations();

  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
        },
        duration: 1,
      }
    );
  }, []);
  
  return (
    <div className="text-center">

      <LandingSectionTitle title={t('landing.benefits.title')} subtitle={t('landing.benefits.subtitle')}/>

      <div ref={boxRef} className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-[20px] gap-[12px] text-left">
        {benefitsList.map((benefit, index) => (
          <LandingBenefitsItem
            key={index}
            title={benefit.title}
            text={benefit.text}
            icon={benefit.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingBenefits;
