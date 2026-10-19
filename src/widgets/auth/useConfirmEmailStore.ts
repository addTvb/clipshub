import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfirmEmailState {
  email: string;
  setEmail: (email: string) => void;
  cleanEmail: () => void;
}

export const useConfirmEmailStore = create<ConfirmEmailState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email: email }),
      cleanEmail: () => set({ email: "" }),
    }),
    { name: "ch-email" }
  )
);
