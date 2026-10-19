import { create } from "zustand";

type OpenMobileFiltersStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useOpenMobileFilters = create<OpenMobileFiltersStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open: open });
  },
}));
