import { create } from "zustand";

type WalletIDStore = {
  walletID?: string;
  setWalletID: (id: string) => void;
};

export const useDefaultWalletIDStore = create<WalletIDStore>((set) => ({
  walletID: undefined,
  setWalletID: (id: string) => {
    set({ walletID: id });
  },
}));
