export const FILTER_CONFIG = {
  // integration_types: {
  //   title: "common.adType.titleMany",
  //   icon: "/static/icons/settings-blue.svg",
  //   placeholder: "common.adType.searchAdTypes",
  // },
  business_category_ids: {
    title: "influencer.offers.businessCategories",
    icon: "/static/icons/table-blue.svg",
    placeholder: "business.offer.searchCategories",
  },
  media_channel_category_ids: {
    title: "influencer.offers.influencerCategories",
    icon: "/static/icons/category-influencer-blue.svg",
    placeholder: "business.offer.searchCategories",
  },
  media_channel_type: {
    title: "influencer.offers.social",
    icon: "/static/icons/web-blue.svg",
    placeholder: "Select platforms...",
  },
  language_ids: {
    title: "influencer.offers.language",
    icon: "/static/icons/language-blue.svg",
    placeholder: "Language",
  },
} as const;
