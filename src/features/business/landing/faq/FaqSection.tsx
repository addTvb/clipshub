import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
import LandingSectionTitle from "src/features/landing/components/SectionTitle";

export default function FaqSection() {
  const t = useTranslations("business.landing.faq");

  return (
    <div className=" mx-auto px-[10px] bg-white lg:pb-[120px] pb-[76px]">
      <div className="lg:flex gap-[32px] scroll-mt-[110px] max-w-screenMaxWidth mx-auto" id="faq">
        <LandingSectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          className="w-full lg:max-w-[455px] text-center lg:text-left"
        />
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("items.1.question")}</AccordionTrigger>
              <AccordionContent>{t("items.1.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t("items.2.question")}</AccordionTrigger>
              <AccordionContent>{t("items.2.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t("items.3.question")}</AccordionTrigger>
              <AccordionContent>{t("items.3.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{t("items.4.question")}</AccordionTrigger>
              <AccordionContent>{t("items.4.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>{t("items.5.question")}</AccordionTrigger>
              <AccordionContent>{t("items.5.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>{t("items.6.question")}</AccordionTrigger>
              <AccordionContent>{t("items.6.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>{t("items.7.question")}</AccordionTrigger>
              <AccordionContent>{t("items.7.answer")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
