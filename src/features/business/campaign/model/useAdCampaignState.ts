import { create } from "zustand";

interface AdCampaignStateType {
  openModal: boolean;
  setOpen: (open: boolean) => void;
}

export const useAdCampaignState = create<AdCampaignStateType>((set) => ({
  openModal: false,
  setOpen: (open) => set({ openModal: open }),
}));
