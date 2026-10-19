import { create } from "zustand";

type CpmSliderStore = {
  value: number;
  setValue: (value: number) => void;
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  changeHeight: ((multiplier: number) => void) | null;
  setChangeHeight: (fn: (multiplier: number) => void) => void;
  changeSocialHeight: ((multiplier: number) => void) | null;
  setChangeSocialHeight: (fn: (multiplier: number) => void) => void;
};

export const useCpmSliderStore = create<CpmSliderStore>((set) => ({
  value: 100,
  setValue: (value) => set({ value }),
  isHovering: false,
  setIsHovering: (isHovering) => set({ isHovering }),
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
  changeHeight: null,
  setChangeHeight: (fn) => set({ changeHeight: fn }),
  changeSocialHeight: null,
  setChangeSocialHeight: (fn) => set({ changeSocialHeight: fn }),
}));
