import BannerIcon from "@public/static/images/business/landing/banner.svg";
import DedicateIcon from "@public/static/images/business/landing/dedicate.svg";
import IntegrationIcon from "@public/static/images/business/landing/integration.svg";
import HalfScreenIcon from "@public/static/images/business/landing/half-screen.svg";
import AdsIcon from "@public/static/images/business/landing/ads.svg";
import ChallengeIcon from "@public/static/icons/challenge-icon.svg";

import BannerMockup from "@public/static/images/business/landing/tooltips/banner.svg";
import DedicateMockup from "@public/static/images/business/landing/tooltips/dedicate.svg";
import IntegrationMockup from "@public/static/images/business/landing/tooltips/integration.svg";
import HalfScreenMockup from "@public/static/images/business/landing/tooltips/half.svg";
import InfluencerContentMockup from "@public/static/images/business/landing/tooltips/influencer-content.svg";
import ChallengeMockup from "@public/static/images/business/landing/tooltips/challenges.svg";

import { AdType } from "src/types/base";

export interface AdTypeConfig {
  id: AdType;
  icon: React.ComponentType;
  titleKey: string;
  descriptionKey: string;
  exampleKey: string;
  mockupComponent: React.ComponentType;
}

export const AD_TYPE_CONFIGS: Record<AdType, AdTypeConfig> = {
  banner: {
    id: "banner",
    icon: BannerIcon,
    titleKey: "landing.heroCarousel.banner.title",
    descriptionKey: "landing.heroCarousel.banner.tooltip.description",
    exampleKey: "landing.heroCarousel.banner.tooltip.example",
    mockupComponent: BannerMockup,
  },
  dedicate: {
    id: "dedicate",
    icon: DedicateIcon,
    titleKey: "landing.heroCarousel.dedicate.title",
    descriptionKey: "landing.heroCarousel.dedicate.tooltip.description",
    exampleKey: "landing.heroCarousel.dedicate.tooltip.example",
    mockupComponent: DedicateMockup,
  },
  integration: {
    id: "integration",
    icon: IntegrationIcon,
    titleKey: "landing.heroCarousel.integration.title",
    descriptionKey: "landing.heroCarousel.integration.tooltip.description",
    exampleKey: "landing.heroCarousel.integration.tooltip.example",
    mockupComponent: IntegrationMockup,
  },
  half_screen: {
    id: "half_screen",
    icon: HalfScreenIcon,
    titleKey: "landing.heroCarousel.half_screen.title",
    descriptionKey: "landing.heroCarousel.half_screen.tooltip.description",
    exampleKey: "landing.heroCarousel.half_screen.tooltip.example",
    mockupComponent: HalfScreenMockup,
  },
  influencer_content: {
    id: "influencer_content",
    icon: AdsIcon,
    titleKey: "landing.heroCarousel.influencer_content.title",
    descriptionKey:
      "landing.heroCarousel.influencer_content.tooltip.description",
    exampleKey: "landing.heroCarousel.influencer_content.tooltip.example",
    mockupComponent: InfluencerContentMockup,
  },
  challenge: {
    id: "challenge",
    icon: ChallengeIcon,
    titleKey: "landing.heroCarousel.challenge.title",
    descriptionKey: "landing.heroCarousel.challenge.tooltip.description",
    exampleKey: "landing.heroCarousel.challenge.tooltip.example",
    mockupComponent: ChallengeMockup,
  },
};

// Утилиты для получения конфигурации
export const getAdTypeConfig = (adType: AdType): AdTypeConfig | undefined => {
  return AD_TYPE_CONFIGS[adType];
};
