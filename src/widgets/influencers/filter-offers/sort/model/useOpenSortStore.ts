import { create } from "zustand";

type OpenSortStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useOpenSortStore = create<OpenSortStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open: open });
  },
}));
