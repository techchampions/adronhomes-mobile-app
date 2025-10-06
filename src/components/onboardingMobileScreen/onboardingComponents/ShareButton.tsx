import React, { useState, useRef } from "react";
import {
  FaShareAlt,
  FaTimes,
  FaCopy,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = document.title,
  text = "Check this out!",
  className = "",
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const shareOptions = [
    {
      name: "Copy Link",
      icon: <FaCopy />,
      action: () => copyToClipboard(url),
      color: "bg-gray-500 hover:bg-gray-600",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      action: () => shareToFacebook(url, title),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      action: () => shareToTwitter(url, text),
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      action: () => shareToLinkedIn(url, title, text),
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      action: () => shareToWhatsApp(url, text),
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
      setIsShareMenuOpen(false);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
      setIsShareMenuOpen(false);
    }
  };

  const shareToFacebook = (url: string, title: string) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${encodeURIComponent(title)}`,
      "_blank"
    );
    setIsShareMenuOpen(false);
  };

  const shareToTwitter = (url: string, text: string) => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
    setIsShareMenuOpen(false);
  };

  const shareToLinkedIn = (url: string, title: string, text: string) => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
    setIsShareMenuOpen(false);
  };

  const shareToWhatsApp = (url: string, text: string) => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      "_blank"
    );
    setIsShareMenuOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      setIsShareMenuOpen(true);
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsShareMenuOpen(true)}
        className={`flex items-center w-full gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors ${className}`}
      >
        <FaShareAlt />
        Share
      </button>

      {/* Share Menu Dropdown */}
      {isShareMenuOpen && (
        <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-3 min-w-[200px] z-50">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-bold text-gray-800">Share via</div>
            <button
              onClick={() => setIsShareMenuOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="flex gap-2">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className={`flex items-center gap-2 p-2 text-white rounded-full transition-colors ${option.color}`}
              >
                {option.icon}
                {/* <span className="text-xs">{option.name}</span> */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;