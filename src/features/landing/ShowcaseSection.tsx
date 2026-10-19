import Image from "next/image";
import ShowcaseListItem from "./components/ShowcaseListItem";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import LandingSectionTitle from "./components/SectionTitle";

const marketAdvantages = [
  "landing.showcase.items.newMarketModel",
  "landing.showcase.items.preReservedBudgets",
  "landing.showcase.items.offerModeration",
  "landing.showcase.items.clearPayouts",
  "landing.showcase.items.support",
];

const LandingShowcase = () => {
  const t = useTranslations();

  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      box2Ref.current,
      { y: 50 },
      {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: box2Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      boxRef.current,
      { y: 400 },
      {
        y: 300,
        ease: "none",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      box3Ref.current,
      { y: 400 },
      {
        y: 600,
        ease: "none",
        scrollTrigger: {
          trigger: box3Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  const formatBoldText = (key: string) => {
    return t.rich(key, {
      bold: (chunks) => <b>{chunks}</b>,
    });
  };

  return (
    <div className="w-full">
      <div className="2xl:pt-[144px] 2xl:pr-[123px] lg:pt-[70px] pt-[65px] lg:pr-[60px] px-[10px] pb-[248px] flex lg:flex-row flex-col lg:items-start items-center w-full lg:h-[768px] bg-blueGrad1 rounded-[8px] relative lg:overflow-hidden">
        <div className="hidden lg:flex gap-[14px] items-start absolute left-[-45px] top-[-14px]">
          <Image
            ref={box2Ref}
            className="object-contain"
            alt=""
            src="/static/images/landing/сollage-1.webp"
            width={176}
            height={1000}
          />
          <Image
            ref={boxRef}
            className="object-contain  translate-y-[400px]"
            alt=""
            src="/static/images/landing/сollage-2.webp"
            width={176}
            height={650}
          />
          <Image
            ref={box3Ref}
            className="object-contain translate-y-[400px]"
            alt=""
            src="/static/images/landing/сollage-3.webp"
            width={176}
            height={650}
          />
        </div>

        <LandingSectionTitle
          title={t("landing.showcase.title")}
          subtitle={t("landing.showcase.subtitle")}
          className="text-white 2xl:ml-[243px] lg:ml-[163px] 2xl:mt-[84px] lg:mt-[144px] [&>span]:text-[#6BCDFF] lg:text-left text-center"
        />
        <ul className="flex flex-col gap-[20px] xl:w-full lg:w-auto w-full max-w-[587px] lg:ml-auto">
          {marketAdvantages.map((item, index) => (
            <ShowcaseListItem key={index} text={formatBoldText(item)} />
          ))}
        </ul>
        <div className="lg:hidden absolute bottom-0 left-0 w-full h-[15%] bg-[linear-gradient(180deg,rgba(243,246,250,0.00)_0%,#FFFFFF_85%)] z-1"></div>
      </div>
      <div className="lg:hidden relative p-[10px] mt-[-220px]">
        <Image
          src={"/static/images/landing/сollage-mobile.webp"}
          className="w-full"
          alt=""
          width={370}
          height={660}
        />
        <div className="lg:hidden absolute bottom-0 left-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(243,246,250,0.00)_0%,#FFFFFF_86.25%)] z-1"></div>
      </div>
    </div>
  );
};

export default LandingShowcase;
