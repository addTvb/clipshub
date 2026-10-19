import { create } from "zustand";

export type AdPosition =
  | "top"
  | "left-top"
  | "right-top"
  | "center"
  | "left-center"
  | "right-center"
  | "bottom"
  | "left-bottom"
  | "right-bottom";

interface AdPositionState {
  position: AdPosition;
  changePosition: (position: AdPosition) => void;
}

export const useAdPositionSelectorState = create<AdPositionState>((set) => ({
  position: "left-top",
  changePosition: (position) => set({ position: position }),
}));
