"use client";

import { useTranslations } from "next-intl";
import BannerIcon from "@public/static/images/business/landing/banner.svg";
import DedicateIcon from "@public/static/images/business/landing/dedicate.svg";
import IntegrationIcon from "@public/static/images/business/landing/integration.svg";
import HalfScreenIcon from "@public/static/images/business/landing/half-screen.svg";
import AdsIcon from "@public/static/images/business/landing/ads.svg";
import TabsWithProgress, { TabItem } from "src/components/ui/tabs-with-progress";
import { AdTypeTooltip } from "src/features/ad-types";


interface ProgressIndicatorProps {
  currentSlide: number;
  progress: number;
  onSlideSelect: (index: number) => void;
  className?: string;
}

const slideConfigs: TabItem[] = [
  { 
    id: "banner",
    icon: BannerIcon, 
    label: "", // Будет заполнено через переводы
    tooltipComponent: () => <AdTypeTooltip adType="banner" />
  },
  { 
    id: "dedicate",
    icon: DedicateIcon, 
    label: "",
    tooltipComponent: () => <AdTypeTooltip adType="dedicate" />
  },
  { 
    id: "integration",
    icon: IntegrationIcon, 
    label: "",
    tooltipComponent: () => <AdTypeTooltip adType="integration" />
  },
  { 
    id: "half_screen",
    icon: HalfScreenIcon, 
    label: "",
    tooltipComponent: () => <AdTypeTooltip adType="half_screen" />
  },
  { 
    id: "influencer_content",
    icon: AdsIcon, 
    label: "",
    tooltipComponent: () => <AdTypeTooltip adType="influencer_content" />
  },
];

export default function ProgressIndicator({ 
  currentSlide, 
  progress, 
  onSlideSelect,
  className
}: ProgressIndicatorProps) {
  const t = useTranslations("business");

  // Заполняем labels через переводы
  const tabItems: TabItem[] = slideConfigs.map(config => ({
    ...config,
    label: t(`landing.heroCarousel.${config.id}.title`)
  }));

  return (
    <TabsWithProgress
      items={tabItems}
      currentTab={currentSlide}
      progress={progress}
      onTabSelect={onSlideSelect}
      titleKey="landing.hero.viewAdType"
      className={className}
      translationNamespace="business"
      showProgress={true} // Явно указываем что нужен прогресс-бар
    />
  );
}
