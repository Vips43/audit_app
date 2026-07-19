import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (userData) => {
        set({ user: userData });
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "user", // This is the key Zustand will use in localStorage
    },
  ),
);
