import { OFFER_FORM_STORAGE_NAME } from "src/config/storages";
import { AdPosition } from "src/features/business/offers/model/useAdPositionSelectorState";
import { AdType } from "src/types/base";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SocialPlatform = "youtube" | "tiktok" | "instagram";
export type SocialPlatformFilter = "youtube" | "tiktok" | "instagram" | "all";
export type AvgChannelViewsType = "any" | "5k" | "50k" | "200k" | "500k";
export type AdFileType = "image" | "video" | "";

interface FormState {
  currentStep: number;
  offerName: string;
  socialPlatform: SocialPlatform | null;
  scrollTimeoutId: number | null;
  adPosition: AdPosition;
  adDuration: string;
  adFileID: number | null;
  adFileType: AdFileType;
  adFileLink: string;
  adFileName: string;
  descriptionBio: string;
  linkBio: string;
  descriptionPost: string;
  pinnedComment?: string;
  adType: AdType;
  dynamicLinks: Array<{ title: string; link: string }>;
  mediaChannelCategoryIDs: number[];
  language: string;
  contentBrief: string;
  avgChannelViews: AvgChannelViewsType;
  payoutAmount: number;
  lifetimePost: number;
  maxPayoutPerPost: number;
  view_bonuses: Array<{
    views_count: number;
    bonus_sum: number;
  }>;
  clipperAvatarFileID: number | null;
  clipperAvatarFileLink: string;
  clipperAvatarFileName: string;

  // Actions
  setAdPosition: (value: AdPosition) => void;
  setAdDuration: (value: string) => void;
  setAdFileID: (value: number) => void;
  setAdFileType: (value: AdFileType) => void;
  setAdFileLink: (value: string) => void;
  setAdFileName: (value: string) => void;
  setDescriptionBio: (value: string) => void;
  setDescriptionPost: (value: string) => void;
  setLinkBio: (value: string) => void;
  setPinnedComment: (value: string) => void;
  setAdType: (value: AdType) => void;
  setDynamicLinks: (value: Array<{ title: string; link: string }>) => void;
  setMediaChannelCategories: (value: number[]) => void;
  setLanguage: (value: string) => void;
  setContentBrief: (value: string) => void;
  setAvgChannelViews: (value: AvgChannelViewsType) => void;
  setPayoutAmount: (value: number) => void;
  setLifetimePost: (value: number) => void;
  setMaxPayoutPerPost: (value: number) => void;
  setViewBonuses: (
    value: Array<{ views_count: number; bonus_sum: number }>
  ) => void;
  addViewBonus: (bonus: { views_count: number; bonus_sum: number }) => void;
  removeViewBonus: (index: number) => void;
  updateViewBonus: (
    index: number,
    bonus: { views_count: number; bonus_sum: number }
  ) => void;
  setOfferName: (name: string) => void;
  setSocialPlatform: (platform: SocialPlatform) => void;
  setClipperAvatarFileID: (fileID: number) => void;
  setClipperAvatarFileLink: (link: string) => void;
  setClipperAvatarFileName: (name: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  clearStorage: () => void;
}

const initialState = {
  currentStep: 1,
  offerName: "",
  socialPlatform: null,
  scrollTimeoutId: null,
  adPosition: "left-top" as AdPosition,
  adDuration: "",
  adFileID: null,
  adFileType: "" as AdFileType,
  adFileLink: "",
  adFileName: "",
  descriptionBio: "",
  linkBio: "",
  descriptionPost: "",
  pinnedComment: "",
  adType: "banner" as AdType,
  dynamicLinks: [] as Array<{ title: string; link: string }>,
  mediaChannelCategoryIDs: [] as number[],
  language: "",
  contentBrief: "",
  avgChannelViews: "any" as AvgChannelViewsType,
  payoutAmount: 0,
  lifetimePost: 0,
  maxPayoutPerPost: 0,
  view_bonuses: [] as Array<{ views_count: number; bonus_sum: number }>,
  clipperAvatarFileID: null,
  clipperAvatarFileLink: "",
  clipperAvatarFileName: "",
};

export const useCreateOfferStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setAdPosition: (value) => set({ adPosition: value }),
      setAdDuration: (value) => set({ adDuration: value }),
      setAdFileID: (value) => set({ adFileID: value }),
      setAdFileType: (value) => set({ adFileType: value }),
      setAdFileLink: (value) => set({ adFileLink: value }),
      setAdFileName: (value) => set({ adFileName: value }),
      setDescriptionBio: (value) => set({ descriptionBio: value }),
      setDescriptionPost: (value) => set({ descriptionPost: value }),
      setLinkBio: (value) => set({ linkBio: value }),
      setPinnedComment: (value) => set({ pinnedComment: value }),
      setAdType: (value) => set({ adType: value }),
      setDynamicLinks: (value) => set({ dynamicLinks: value }),

      setMediaChannelCategories: (value) =>
        set({ mediaChannelCategoryIDs: value }),
      setLanguage: (value) => set({ language: value }),
      setContentBrief: (value) => set({ contentBrief: value }),

      setAvgChannelViews: (value) => set({ avgChannelViews: value }),
      setPayoutAmount: (value) => set({ payoutAmount: value }),
      setLifetimePost: (value) => set({ lifetimePost: value }),
      setMaxPayoutPerPost: (value) => set({ maxPayoutPerPost: value }),
      setViewBonuses: (value) => set({ view_bonuses: value }),
      addViewBonus: (bonus) =>
        set((state) => ({ view_bonuses: [...state.view_bonuses, bonus] })),
      removeViewBonus: (index) =>
        set((state) => ({
          view_bonuses: state.view_bonuses.filter((_, i) => i !== index),
        })),
      updateViewBonus: (index, bonus) =>
        set((state) => ({
          view_bonuses: state.view_bonuses.map((b, i) =>
            i === index ? bonus : b
          ),
        })),

      setOfferName: (name) => set({ offerName: name }),
      setSocialPlatform: (platform) => set({ socialPlatform: platform }),
      setClipperAvatarFileID: (fileID) => set({ clipperAvatarFileID: fileID }),
      setClipperAvatarFileLink: (link) => set({ clipperAvatarFileLink: link }),
      setClipperAvatarFileName: (name) => set({ clipperAvatarFileName: name }),
      nextStep: () => {
        set((state) => {
          if (state.scrollTimeoutId !== null) {
            clearTimeout(state.scrollTimeoutId);
          }
          const timeoutId = window.setTimeout(() => {
            window.scroll({ top: -1, left: 0, behavior: "smooth" });
          }, 10);
          return {
            currentStep: Math.min(state.currentStep + 1, 5),
            scrollTimeoutId: timeoutId,
          };
        });
      },
      prevStep: () => {
        set((state) => {
          if (state.scrollTimeoutId !== null) {
            clearTimeout(state.scrollTimeoutId);
          }
          const timeoutId = window.setTimeout(() => {
            window.scroll({ top: -1, left: 0, behavior: "smooth" });
          }, 10);
          return {
            currentStep: Math.max(state.currentStep - 1, 1),
            scrollTimeoutId: timeoutId,
          };
        });
      },
      goToStep: (step) => {
        set((state) => {
          if (state.scrollTimeoutId !== null) {
            clearTimeout(state.scrollTimeoutId);
          }
          const timeoutId = window.setTimeout(() => {
            window.scroll({ top: -1, left: 0, behavior: "smooth" });
          }, 10);
          return {
            currentStep: step,
            scrollTimeoutId: timeoutId,
          };
        });
      },
      resetForm: () => {
        set((state) => {
          if (state.scrollTimeoutId !== null) {
            clearTimeout(state.scrollTimeoutId);
          }
          return initialState;
        });
      },
      clearStorage: () => {
        set((state) => {
          if (state.scrollTimeoutId !== null) {
            clearTimeout(state.scrollTimeoutId);
          }
          return initialState;
        });
        try {
          localStorage.removeItem("offer-form-storage");
        } catch (error) {
          console.error("Failed to clear localStorage:", error);
        }
      },
    }),
    {
      name: OFFER_FORM_STORAGE_NAME,
    }
  )
);
