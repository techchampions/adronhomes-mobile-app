import React from "react";

interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}
const InlineLoading: React.FC<Props> = ({
  size = "sm",
  className = "",
  text = "Loading...",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${size === "sm" && "w-3 h-3"} ${
          size === "lg" && "w-10 h-10"
        } ${
          size === "md" && "w-5 h-5"
        } border-b-2 border-r-2 rounded-full animate-spin `}
      ></div>
      <div className={`text-${size}`}>{text}</div>
    </div>
  );
};

export default InlineLoading;
