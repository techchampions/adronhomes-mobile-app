import React, { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { useToastStore } from "../zustand/useToastStore";

type CopyButtonProps = {
  text: string;
  className?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard", "success");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${className} flex gap-1 text-[9px] items-center text-gray-400`}
    >
      <IoCopy className="h-4 w-4 text-gray-400" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
