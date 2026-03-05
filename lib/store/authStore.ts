import { create } from "zustand";
import type { User } from "@/types/user";
import { logout as apiLogout } from "@/lib/api/clientApi";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  logout: () => Promise<void>;

  addSavedStory: (storyId: string) => void;
  removeSavedStory: (storyId: string) => void;
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

  addSavedStory: (storyId: string) =>
    set((state) => {
      if (!state.user) return state;

      if (state.user.savedStories?.includes(storyId)) {
        return state;
      }

      return {
        user: {
          ...state.user,
          savedStories: [...(state.user.savedStories || []), storyId],
        },
      };
    }),

  removeSavedStory: (storyId: string) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          savedStories: state.user.savedStories?.filter((id) => id !== storyId),
        },
      };
    }),
}));

export default useAuthStore;
