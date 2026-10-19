import { create } from "zustand";

interface BrandModalStateType {
  openModal: boolean;
  openEditModal: boolean;
  editBrandID: number | null;
  setOpen: (open: boolean) => void;
  setOpenEditModal: (open: boolean) => void;
  setEditBrandID: (id: number | null) => void;
}

export const useBrandModalState = create<BrandModalStateType>((set) => ({
  openModal: false,
  openEditModal: false,
  editBrandID: null,
  setOpen: (open) => set({ openModal: open }),
  setOpenEditModal: (open) => set({ openEditModal: open }),
  setEditBrandID: (id) => set({ editBrandID: id }),
}));
