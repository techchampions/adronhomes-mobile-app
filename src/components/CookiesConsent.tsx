import React, { useState } from "react";
import { useUserStore } from "../zustand/UserStore";

const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { setAcceptCookies } = useUserStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-4 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Content */}
          <p className="text-gray-700 text-sm mb-4 p-4 text-justify">
            Adron Homes uses cookies and similar technologies as strictly
            necessary to make our site work. We and our partners would also like
            to set additional cookies to analyze your use of our site, to
            personalize and enhance your visit to our site and to show you more
            relevant content and advertising. For more information, please read
            our{" "}
            <a
              href="https://adronhomes.com/privacy-policies/"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Privacy Statement
            </a>
            .
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setAcceptCookies(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
