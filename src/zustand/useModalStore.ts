// stores/modalStore.ts
import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isCloseable: boolean;
  isTransModal: boolean;
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  openStrong: (content: ReactNode) => void;
  openTransModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCloseable: true,
  isTransModal: false,
  isOpen: false,
  content: null,
  openModal: (content) =>
    set({ isOpen: true, content, isCloseable: true, isTransModal: false }),
  openStrong: (content) => set({ isOpen: true, isCloseable: false, content }),
  openTransModal: (content) =>
    set({ isOpen: true, isTransModal: true, content }),
  closeModal: () => set({ isOpen: false, isCloseable: true, content: null }),
}));
