import { create } from "zustand";

interface EditCampaignStateType {
  openModal: boolean;
  selectedCampaignID: number | null;
  setOpen: (open: boolean) => void;
  openWithCampaign: (campaignID: number) => void;
}

export const useEditCampaignState = create<EditCampaignStateType>((set) => ({
  openModal: false,
  selectedCampaignID: null,
  openWithCampaign: (campaignID) =>
    set({
      openModal: true,
      selectedCampaignID: campaignID,
    }),
  setOpen: (open) =>
    set((state) => ({
      openModal: open,
      selectedCampaignID: open ? state.selectedCampaignID : null,
    })),
}));


