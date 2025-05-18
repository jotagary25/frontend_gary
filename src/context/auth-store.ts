import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  authChecked: boolean;
  setAuthenticated: (value: boolean) => void;
  setAuthChecked: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  authChecked: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setAuthChecked: (value) => set({ authChecked: value }),
}));
