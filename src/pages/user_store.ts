// user_store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: any;
  currentPage: string;
  setUser: (user: any) => void;
  updateUser: (updates: any) => void;
  clearUser: () => void;
  setCurrentPage: (page: string) => void;
}

export const use_UserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      currentPage: "menu",
      setUser: (user) => set({ user }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : updates,
        })),
      clearUser: () => set({ user: null }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'user-storage',
      // partialize: (state) => ({ user: state.user }), // Only persist `user`
    }
  )
);
