import { create } from "zustand";

type Roles = "influencer" | "business";

interface RoleState {
  role: Roles;
  changeRole: (role: Roles) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: "influencer",
  changeRole: (role) => set({ role: role }),
}));
