import React, { useEffect, FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  closeButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  show,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  closeButton = true,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-10 rounded-[25px] shadow-lg w-full max-w-md relative transition-transform transform ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {closeButton && (
          <button
            className="absolute top-4 right-3 text-gray-600 hover:text-gray-900"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <IoClose size={24} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
