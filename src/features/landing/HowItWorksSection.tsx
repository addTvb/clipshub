import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import LandingSectionTitle from "./components/SectionTitle";
import HowItWorksCard from "./components/HowItWorksCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "src/components/ui/carousel/carousel";

gsap.registerPlugin(ScrollTrigger);

const LandingHowItWorks = () => {
  const t = useTranslations("landing.howItWorks");
  const boxRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
        },
        duration: 1,
      }
    );
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
        },
        duration: 1,
      }
    );
  }, []);

  return (
    <div className="text-center scroll-mt-[110px]" id="how-it-works">
      <LandingSectionTitle title={t("title")} subtitle={t("subtitle")} />

      {/* Мобильная версия (карусель) */}
      <div className="md:hidden" ref={carouselRef}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            <CarouselItem>
              <HowItWorksCard step={1} />
            </CarouselItem>
            <CarouselItem>
              <HowItWorksCard step={2} />
            </CarouselItem>
            <CarouselItem>
              <HowItWorksCard step={3} isFullWidth />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Десктопная версия (грид) */}
      <div ref={boxRef} className="hidden md:grid lg:grid-cols-2 gap-[44px]">
        <HowItWorksCard step={1} />
        <HowItWorksCard step={2} />
        <HowItWorksCard step={3} isFullWidth />
      </div>
    </div>
  );
};

export default LandingHowItWorks;
