import { create } from "zustand";
import type { User } from "@/types/user";
import { logout as apiLogout } from "@/lib/api/clientApi";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  logout: async () => {
    try {
      await apiLogout();
    } catch (event) {
      console.error("Logout failed", event);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
