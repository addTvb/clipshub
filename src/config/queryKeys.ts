import {
  GetLeaderboardMediaChannelsRequest,
  liderboardGroupType,
  liderboardPeriodType,
} from "src/types/leadeerboard";
import { PostStatusType } from "src/types/posts";

export const queryKeys = {
  user: {
    me: ["user", "me"] as const,
    socials: ["user", "socials"] as const,
    wallet: {
      getUserWallet: ["user", "wallet"],
      getDeposits: ["influencers", "deposits"] as const,
    },
  },
  offers: {
    getOffers: (filters: Array<number | string | undefined>) =>
      ["offers", "get", ...filters] as const,
  },
  business: {
    brands: {
      getAll: ["brands", "getAll"] as const,
    },
    campaigns: {
      getAllCampaigns: ["campaigns", "getAll"] as const,
      getCampaignByID: (id: number) => ["campaign", "getByID", id] as const,
    },
    offers: {
      getOfferByCampaignID: (id: number) =>
        ["campaign", "offers", "getByID", id] as const,
      getOfferByID: (id: number) => ["offer", "getByID", id] as const,
      getPaymentHistoryByOfferID: (id: number) =>
        ["offer", "payment-history", id] as const,
    },
    stats: {
      getStatsByCampaignID: (id: number) =>
        ["campaign", "stats", "getByID", id] as const,
      getPaymentStatsByCampaignID: (id: number) =>
        ["campaign", "stats", "payment", "getByID", id] as const,
    },
    dictionaries: {
      businessCategory: ["dictionary", "category", "business"] as const,
      mediaChannelCategories: [
        "dictionary",
        "category",
        "media-channel",
      ] as const,
      languages: ["dictionary", "languages"] as const,
    },
    posts: {
      getPostsByOfferID: (offerID: number, page: number) => [
        "offer",
        "posts",
        offerID,
        page,
      ],
    },
  },
  influencers: {
    channels: {
      getChannelVerificationCode: [
        "influencers",
        "channels",
        "verificationCode",
      ] as const,
    },
    statistics: {
      getMediaChannelStatistics: (mediaChannelId: number) =>
        ["influencers", "mediaChannels", "statistics", mediaChannelId] as const,
    },
    getMediaChannels: ["influencers", "mediaChannels"] as const,
    offers: {
      getOffers: (filters: Array<number | string | undefined>) =>
        ["influencers", "offers", "get", ...filters] as const,
      getOfferById: (offerId: number) => [
        "influencers",
        "offers",
        "getById",
        offerId,
      ],
    },
    posts: {
      getPostById: (postId: number) => [
        "influencers",
        "posts",
        "getById",
        postId,
      ],
      getPostsByMediaChannel: (
        mediaChannelId: number,
        status: PostStatusType,
        page?: number,
        per_page?: number
      ) =>
        [
          "influencers",
          "posts",
          "getByMediaChannel",
          mediaChannelId,
          status,
          page,
          per_page,
        ] as const,
    },
    wallet: {
      getInfluencerWallet: ["user", "wallet"],
      getWithdrawMethods: ["dictionaries", "wallet-withdraw-methods"] as const,
      getWithdrawRequests: ["influencers", "withdraw-requests"] as const,
    },
    referrals: {
      getInvitedUsers: ["influencers", "referrals", "getInvitedUsers"] as const,
    },
    brands: {
      getBrandsWithOffers: (filters: Array<number | string | undefined>) =>
        ["influencers", "brands", "withOffers", ...filters] as const,
      getBrandsWithOffersUnAuth: (filters: Array<number | string | undefined>) =>
        ["unauth", "brands", "withOffers", ...filters] as const,
    },
  },
  notifications: {
    getNotificationsCount: ["notifications", "count"] as const,
    getNotificationsList: ["notifications", "list"] as const,
  },
  referrals: {
    getReferralsInfo: (locale: string) =>
      ["referrals", "list", locale] as const,
  },
  leaderboard: {
    getPosts: (period: liderboardPeriodType, page: number, per_page: number) =>
      ["leaderboard", "posts", period, page, per_page] as const,
    getRows: (group: liderboardGroupType, period: liderboardPeriodType) =>
      ["leaderboard", "rows", group, period] as const,
    getPostsByGroup: (
      group: liderboardGroupType,
      entity: number,
      period: liderboardPeriodType,
      page: number,
      per_page: number
    ) =>
      [
        "leaderboard",
        "postsByGroup",
        group,
        entity,
        period,
        page,
        per_page,
      ] as const,
    getMediaChannels: (params: GetLeaderboardMediaChannelsRequest) =>
      [
        "leaderboard",
        "mediaChannelsByGroup",
        params.group,
        params.entity_id,
        params.period,
        params.page,
        params.per_page,
      ] as const,
  },
} as const;
