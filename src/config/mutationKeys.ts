import { Currency } from "src/types/base";

export const mutationKeys = {
  auth: {
    signUpPassword: ["auth", "signUp", "password"] as const,
    signUpGoogle: ["auth", "signUp", "google"] as const,
    signUpTikTok: ["auth", "signUp", "tiktok"] as const,
    signUpInstagram: ["auth", "signUp", "instagram"] as const,
    confirmEmail: (code: string) => ["auth", "confirmEmail", code] as const,
    resendEmail: ["auth", "resendEmail"] as const,
    signIn: ["auth", "signIn"] as const,
    sendRestoreLink: ["auth", "sendRestoreLink"] as const,
    setNewPassword: ["auth", "setNewPassword"] as const,
    setupProfile: ["auth", "setupProfile"] as const,
    deleteSocialAuthentication: ["auth", "deleteSocialAuthentication"] as const,
    linkSocialAuthentication: ["auth", "linkSocialAuthentication"] as const,
  },
  business: {
    brands: {
      create: ["brands", "create"] as const,
      delete: ["brands", "delete"] as const,
      update: ["brands", "update"] as const,
    },
    campaigns: {
      createCampaign: ["campaigns", "create"] as const,
      updateCampaign: ["campaigns", "update"] as const,
      archive: ['campaigns', 'archive'] as const
    },
    offers: {
      createOffer: ["offers", "create"] as const,
      setStatusOffer: ["offers", "setStatus"] as const,
      setVersionStatusOffer: ["offers", "setVersionStatus"] as const,
    },
    contactUs: {
      submit: ["business", "contactUs", "submit"] as const,
    },
  },
  files: { create: ["files", "create"] as const },
  wallet: {
    transfer: ["wallet", "transfer"] as const,
    refill: (transactionId: string, currency: Currency) =>
      ["wallet", "refill", transactionId, currency] as const,
  },
  influencers: {
    posts: {
      appendMediaPost: ["influencers", "posts", "appendMediaPost"],
      createPostOnOffer: ["influencers", "posts", "create"],
    },
    channels: {
      archiveMediaChannel: ["influencers", "channels", "archive"] as const,
      addMediaChannelByUrl: ["influencers", "channels", "addByUrl"] as const,
    },
    offers: {
      cancelOffer: (offerId: number) =>
        ["influencers", "offers", "cancel", offerId] as const,
    },
  },
  user: {
    updateUser: ["user", "update"] as const,
  },
  withdraw: {
    createWithdraw: ["withdraw", "create"] as const,
    createWithdrawCreditial: ["withdraw", "createCreditial"] as const,
    updateWithdrawCreditial: ["withdraw", "updateCreditial"] as const,
    deleteWithdrawCreditial: ["withdraw", "deleteCreditial"] as const,
  },
  notifications: {
    readNotifications: ["notifications", "read"] as const,
    readAllNotifications: ["notifications", "readAll"] as const,
  },
} as const;
