import { MediaChannel } from "src/types/influencers";
import { create } from "zustand";

type ChannelSettingStore = {
  open: boolean;
  channel: MediaChannel | null;
  setOpen: (open: boolean) => void;
  setChannel: (channel: MediaChannel) => void;
};

export const useChannelSettingStore = create<ChannelSettingStore>((set) => ({
  open: false,
  channel: null,
  setOpen: (open) => set({ open: open }),
  setChannel: (channel) => set({ channel: channel }),
}));
