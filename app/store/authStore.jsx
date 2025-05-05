import { create } from "zustand";
import * as Global from "../constants/global";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  location: null,

  setLocation: (location) => set({ location }),

  login: async () => {
    window.open(`${Global.default.BACKEND_URL}/auth/google`, "_self");
  },

  logout: async () => {
    try {
      await fetch(`${Global.default.BACKEND_URL}/auth/logout`, {
        credentials: "include",
      });
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        `${Global.default.BACKEND_URL}/auth/current_user`,
        {
          credentials: "include",
        }
      );
      const user = await res.json();
      set({ user, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
}));
