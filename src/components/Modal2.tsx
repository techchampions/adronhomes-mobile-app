import { X } from "lucide-react";
import { useEffect } from "react";
import { useModalStore } from "../zustand/useModalStore";
const Modal = () => {
  const { isOpen, content, closeModal, isCloseable, isTransModal } =
    useModalStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isCloseable) {
      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, isCloseable, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      // onClick={close}
    >
      <div className="p-2">
        <div
          className={`${
            isTransModal ? "bg-transparent" : "bg-white shadow-lg"
          } p-10 rounded-4xl w-fit md:max-w-200 relative`}
          onClick={(e) => e.stopPropagation()}
        >
          {isCloseable && (
            <button
              className="bg-white rounded-full p-1 absolute top-4 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              <X size={24} />
            </button>
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
