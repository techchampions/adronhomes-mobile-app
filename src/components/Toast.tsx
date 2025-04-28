import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamation, FaTimes } from "react-icons/fa";

const Toast = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Ensure onClose is called
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    // <div className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white  rounded-lg shadow-lg transition-transform transform animate-slideInRight">
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg transition-transform animate-slideInRight">
      <div
        className={`inline-flex items-center justify-center w-8 rounded-full p-2 ${
          type === "success"
            ? "text-green-500 bg-green-100"
            : "text-red-500 bg-red-100"
        }`}
      >
        {type === "success" ? <FaCheckCircle /> : <FaExclamation />}
      </div>
      <div className="ml-3 text-sm font-medium text-left">{message}</div>
      <button
        type="button"
        className="ml-auto bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        aria-label="Close"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
