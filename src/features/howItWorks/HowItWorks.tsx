"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TabsWithProgress, {
  TabItem,
} from "src/components/ui/tabs-with-progress";
import YouTubeVideo from "src/components/ui/youtube-video";
import { Breadcrumb } from "src/components/ui/bread-crumb";
import BannerIcon from "@public/static/images/business/landing/banner.svg";
import HalfScreenIcon from "@public/static/images/business/landing/half-screen.svg";
import AdsIcon from "@public/static/images/business/landing/ads.svg";
import { AdTypeTooltip } from "src/features/ad-types";
import HowItWorksContent from "./HowItWorksContent";
import { AdType } from "src/types/base";

interface HowItWorksStep {
  id: AdType;
  icon: React.ComponentType;
  titleKey: string;
  videoIds: {
    en: string;
    es: string;
    "pt-br": string;
  };
  tooltipComponent: React.ComponentType;
}

const steps: HowItWorksStep[] = [
  {
    id: "banner",
    icon: BannerIcon,
    titleKey: "howItWorks.steps.banner.title",
    videoIds: {
      en: "Hf184RES3PY",
      es: "kPPowYpasoE", // Banner video in Spanish
      "pt-br": "kPPowYpasoE", // Using Spanish video for Portuguese as requested
    },
    tooltipComponent: () => <AdTypeTooltip adType="banner" />,
  },
  {
    id: "half_screen",
    icon: HalfScreenIcon,
    titleKey: "howItWorks.steps.half_screen.title",
    videoIds: {
      en: "U29B6Qn16Xo",
      es: "DKJYa7w3z0M", // Half Screen video in Spanish
      "pt-br": "DKJYa7w3z0M", // Using Spanish video for Portuguese as requested
    },
    tooltipComponent: () => <AdTypeTooltip adType="half_screen" />,
  },
  {
    id: "influencer_content",
    icon: AdsIcon,
    titleKey: "howItWorks.steps.influencer_content.title",
    videoIds: {
      en: "w6t_vT48hQI",
      es: "EKawJGcp2FY", // Influencer Content video in Spanish
      "pt-br": "EKawJGcp2FY", // Using Spanish video for Portuguese as requested
    },
    tooltipComponent: () => <AdTypeTooltip adType="influencer_content" />,
  },
];

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations("influencer");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Effect to handle query parameter for initial ad type selection
  // Example URLs:
  // /clipper/how-it-works?adType=banner
  // /clipper/how-it-works?adType=half_screen
  // /clipper/how-it-works?adType=influencer_content
  useEffect(() => {
    const adTypeParam = searchParams.get('adType');
    if (adTypeParam) {
      const stepIndex = steps.findIndex(step => step.id === adTypeParam);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    }
  }, [searchParams]);

  // Function to handle tab change and update URL
  const handleTabChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    const selectedStep = steps[stepIndex];
    
    // Update URL with adType parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('adType', selectedStep.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Function to get the appropriate video ID based on current locale
  const getVideoId = (step: HowItWorksStep): string => {
    // For supported locales, return the specific video ID
    if (locale === "es" || locale === "pt-br") {
      return step.videoIds[locale];
    }
    // Default to English for all other locales
    return step.videoIds.en;
  };

  const tabItems: TabItem[] = steps.map((step) => ({
    id: step.id,
    icon: step.icon,
    label: t(step.titleKey),
    tooltipComponent: step.tooltipComponent,
  }));

  const currentStepData = steps[currentStep];

  // Create breadcrumb items
  const breadcrumbItems = [
    {
      label: tCommon("main"),
      href: "/",
    },
    {
      label: t("howItWorks.title"),
      href: `/${locale}/clipper/how-it-works`,
      isCurrent: true,
    },
  ];

  return (
    <div className="flex flex-col items-center  w-full max-w-screenMaxWidth mx-auto px-[10px] pt-8 pb-[100px]">
      {/* Breadcrumbs */}
      <div className="w-full mb-8 ">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="md:text-[40px] sm:text-[32px] text-[28px] font-bold  text-center text-textColor mb-[32px]">
        {t("howItWorks.title")}
      </h1>
      {/* Табы */}
      <TabsWithProgress
        items={tabItems}
        currentTab={currentStep}
        onTabSelect={handleTabChange}
        translationNamespace="influencer"
        showProgress={false}
        className="md:mb-[44px] mb-[32px] relative z-[0] sm:w-auto w-full"
        rowClassName="w-full sm:flex-row flex-col w-full whitespace-nowrap"
      />

      {/* Контент с видео */}
      <div className="flex flex-col items-center md:gap-11 gap-[32px] w-full">
        {/* Заголовок и иконка */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-6 h-6 flex items-center justify-center">
            <currentStepData.icon />
          </div>
          <h2 className="md:text-[28px] sm:text-[22px] text-[20px] font-bold leading-[1.21] text-center text-black900">
            {t(`howItWorks.steps.${currentStepData.id}.videoTitle`)}
          </h2>
        </div>

        {/* Видео */}
        <YouTubeVideo
          videoId={getVideoId(currentStepData)}
          title={t(`howItWorks.steps.${currentStepData.id}.videoTitle`)}
          className="w-full max-w-[1024px]"
        />

        <HowItWorksContent
          adType={currentStepData.id}
        />
      </div>
    </div>
  );
}
