import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MyPropertyTab = {
  activetab: string;
  setTab: (activeTab: MyPropertyTab["activetab"]) => void;
  reset: () => void;
};

// Persist step state in localStorage
export const useMyPropertyTab = create<MyPropertyTab>()(
  persist(
    (set) => ({
      activetab: "Pending", // Default step
      setTab: (activeTab) => set({ activetab: activeTab }),

      reset: () =>
        set({
          activetab: "Pending",
        }),
    }),
    { name: "my-property-activeTab-state" } // Key for localStorage
  )
);
