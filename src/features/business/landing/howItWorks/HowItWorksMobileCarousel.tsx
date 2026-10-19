"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "src/components/ui/carousel/carousel";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

interface Slide {
  src: string;
  alt: string;
  titleKey: string;
  textKey: string;
}

const slides: Slide[] = [
  {
    src: "/static/images/business/landing/how-it-works/register-screen.webp",
    alt: "Register screen",
    titleKey: "business.howItWorks.steps.register.title",
    textKey: "business.howItWorks.steps.register.text",
  },
  {
    src: "/static/images/business/landing/how-it-works/create-campaign-screen.webp",
    alt: "Create campaign screen",
    titleKey: "business.howItWorks.steps.createCampaign.title",
    textKey: "business.howItWorks.steps.createCampaign.text",
  },
  {
    src: "/static/images/business/landing/how-it-works/make-offer-screen.webp",
    alt: "Make offer screen",
    titleKey: "business.howItWorks.steps.makeOffer.title",
    textKey: "business.howItWorks.steps.makeOffer.text",
  },
  {
    src: "/static/images/business/landing/how-it-works/fund-campaign-screen.webp",
    alt: "Fund campaign screen",
    titleKey: "business.howItWorks.steps.fundCampaign.title",
    textKey: "business.howItWorks.steps.fundCampaign.text",
  },
  {
    src: "/static/images/business/landing/how-it-works/get-views-screen.webp",
    alt: "Get views screen",
    titleKey: "business.howItWorks.steps.getViews.title",
    textKey: "business.howItWorks.steps.getViews.text",
  },
];

interface Props {
  currentStep: number; // 1-indexed
  onStepChange: (step: number) => void;
}

export default function HowItWorksMobileCarousel({ currentStep, onStepChange }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { width } = useWindowSize();

  // Параметры отступов/peek
  const numericPeek = 26; // должен совпадать с prop peek ниже
  const showTwoPerView = width >= 640; // >= sm: показываем по 2 слайда

  const itemFlex = useMemo(() => {
    if (showTwoPerView) {
      return `0 0 calc(50% - ${numericPeek}px)`; // две карточки во вьюпорте c учётом peek
    }
    return `0 0 calc(100% - ${numericPeek * 2}px)`; // одна карточка во вьюпорте
  }, [showTwoPerView, numericPeek]);

  // Синхронизируем карусель с текущим шагом из родителя
  useEffect(() => {
    if (!api) return;
    const targetIndex = Math.min(Math.max(currentStep - 1, 0), slides.length - 1);
    // Прокрутка к целевому индексу при изменении шага
    api.scrollTo(targetIndex);
  }, [api, currentStep]);

  // Отслеживаем смену слайда свайпом и синхронизируем наверх
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const index = api.selectedScrollSnap();
      onStepChange(index + 1);
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    // Вызовем один раз на инициализации
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onStepChange]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Carousel
        opts={{
          loop: false,
          align: "start",
          containScroll: "trimSnaps",
        }}
        peek={numericPeek}
        setApi={setApi}
      >
        <CarouselContent className="-ml-7">
          {slides.map((slide, idx) => (
            <CarouselItem
              key={idx}
              className="basis-full pl-2"
              style={{ flex: itemFlex }}
            >
              <div className="flex flex-col gap-3">
                <div className={`rounded-[12px] overflow-hidden w-full`}>
                  {/* Browser Header */}
                  <div className="bg-gray300 px-[14px] py-[8px] flex items-center gap-[4px]">
                    <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                    <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                    <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                  </div>

                  {/* Content Area */}
                  <div className="bg-white200 p-[8px] w-full aspect-[7/5] flex flex-col gap-[10px] relative">
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover rounded-[8px]"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}


