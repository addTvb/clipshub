import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import LandingSectionTitle from "./components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const LandingFAQSection = () => {
  const t = useTranslations("landing.faq");
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
          start: "top 80%",
        },
        duration: 1,
      }
    );
  }, []);

  return (
    <div className="lg:flex gap-[32px] mb-[120px] scroll-mt-[110px]" id="faq">
      <LandingSectionTitle
        title={t("title")}
        subtitle={t("subtitle")}
        className="w-full lg:max-w-[455px] text-center lg:text-left"
      />
      <div className="w-full" ref={boxRef}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("items.1.question")}</AccordionTrigger>
            <AccordionContent>
              {t("items.1.answer")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("items.2.question")}</AccordionTrigger>
            <AccordionContent>
              {t("items.2.answer")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              {t("items.3.question")}
            </AccordionTrigger>
            <AccordionContent>
              {t("items.3.answer")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{t("items.4.question")}</AccordionTrigger>
            <AccordionContent>
              {t("items.4.answer")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              {t("items.5.question")}
            </AccordionTrigger>
            <AccordionContent>
              {t("items.5.answer")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              {t("items.6.question")}
            </AccordionTrigger>
            <AccordionContent>
              {t("items.6.answer")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingFAQSection;
