"use client";

import Image from "next/image";

interface HowItWorksCarouselProps {
  currentStep: number;
}

const stepImages = [
  {
    src: "/static/images/business/landing/how-it-works/register-screen.webp",
    alt: "Register screen",
    step: 1
  },
  {
    src: "/static/images/business/landing/how-it-works/create-campaign-screen.webp", 
    alt: "Create campaign screen",
    step: 2
  },
  {
    src: "/static/images/business/landing/how-it-works/make-offer-screen.webp",
    alt: "Make offer screen", 
    step: 3
  },
  {
    src: "/static/images/business/landing/how-it-works/fund-campaign-screen.webp",
    alt: "Fund campaign screen",
    step: 4
  },
  {
    src: "/static/images/business/landing/how-it-works/get-views-screen.webp",
    alt: "Get views screen",
    step: 5
  }
];

export default function HowItWorksCarousel({ currentStep }: HowItWorksCarouselProps) {
  // Находим текущее изображение по шагу
  const currentImage = stepImages.find(img => img.step === currentStep) || stepImages[0];

  return (
    <div className="w-full h-full relative">
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        fill
        className="object-cover rounded-[8px]"
        sizes="(max-width: 768px) 100vw, 400px"
        priority={currentStep === 1}
      />
    </div>
  );
}
