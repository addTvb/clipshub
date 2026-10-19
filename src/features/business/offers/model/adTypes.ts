export const AD_TYPES = [
  {
    value: "banner",
    icon: "/static/icons/banner-type.svg",
    title: "common.adType.banner",
    level: "easy",
  },
  {
    value: "half_screen",
    icon: "/static/icons/half-screen.svg",
    title: "common.adType.half_screen",
    level: "easy",
  },
  {
    value: "influencer_content",
    icon: "/static/icons/categories/influencer.svg",
    title: "common.adType.influencer_content",
    level: "hard",
  },
  {
    value: "challenge",
    icon: "/static/icons/challenge-icon.svg",
    title: "common.adType.challenge",
    level: "hard",
  },
  {
    value: "dedicate",
    icon: "/static/icons/dedicate-type.svg",
    title: "common.adType.dedicate",
    level: "hard",
  },
] as const;

export const AD_TYPES_OBJ = {
  banner: {
    value: "banner",
    icon: "/static/icons/banner-type.svg",
    title: "common.adType.banner",
    level: "easy",
  },
  half_screen: {
    value: "half_screen",
    icon: "/static/icons/half-screen.svg",
    title: "common.adType.half_screen",
    level: "easy",
  },
  influencer_content: {
    value: "influencer_content",
    icon: "/static/icons/categories/influencer.svg",
    title: "common.adType.influencer_content",
    level: "hard",
  },
  dedicate: {
    value: "dedicate",
    icon: "/static/icons/dedicate-type.svg",
    title: "common.adType.dedicate",
    level: "hard",
  },
  integration: {
    value: "integration",
    icon: "/static/icons/integration-type.svg",
    title: "common.adType.integration",
    level: "medium",
  },
  challenge: {
    value: "challenge",
    icon: "/static/icons/challenge-icon.svg",
    title: "common.adType.challenge",
    level: "medium",
  },
};

export const AD_TYPES_HINTS = {
  banner: "business.offerForm.bannerTypeHintForClipper",
  half_screen: "business.offerForm.halfScreenTypeHintForClipper",
  influencer_content: "business.offerForm.influencerContentTypeHintForClipper",
  challenge: "business.offerForm.challengeTypeHintForClipper",
  dedicate: "business.offerForm.dedicateTypeHintForClipper",
  integration: "business.offerForm.integrationTypeHintForClipper",
};