// zustand/useNotificationStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationStoreState {
  allNotifications: string[];
  readNotifications: string[];
  setAllNotifications: (ids: string[]) => void;
  markAsRead: (id: string) => void;
  isRead: (id: string) => boolean;
  setreadNotifications: (ids: string[]) => void;
}

export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set, get) => ({
      allNotifications: [],
      readNotifications: [],

      setAllNotifications: (ids: string[]) => {
        set({ allNotifications: [...new Set(ids)] });
      },
      setreadNotifications: (ids: string[]) => {
        set({
            readNotifications:[...new Set(ids)]
        })
      },
      markAsRead: (id: string) => {
        const { readNotifications } = get();
        if (!readNotifications.includes(id)) {
          set({ readNotifications: [...readNotifications, id] });
        }
      },

      isRead: (id: string) => {
        return get().readNotifications.includes(id);
      },
    }),
    {
      name: "notification-store",
    }
  )
);
