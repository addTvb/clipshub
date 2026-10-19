import { create } from "zustand";

type TransferModalStore = {
  open: boolean;
  setOpen: (open: boolean) => void
};

export const useTransferModalStore = create<TransferModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open: open });
  },
}));
