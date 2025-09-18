// components/Modal.tsx
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useModalStore } from "../zustand/useModalStore";

const Modal = () => {
  const { isOpen, content, closeModal } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-10 rounded-[25px] shadow-lg w-[98%] md:w-[400px] md:max-w-[800px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-3 text-gray-600 hover:text-gray-900"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <IoClose size={24} />
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
