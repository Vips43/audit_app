import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,

  setUser: () => {
    set({ user: JSON.parse(localStorage.getItem("user")) });
  },
}));
