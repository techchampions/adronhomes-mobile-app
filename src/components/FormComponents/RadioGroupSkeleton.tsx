import React from "react";

interface RadioGroupSkeletonProps {
  label?: boolean;
  optionsCount?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const RadioGroupSkeleton: React.FC<RadioGroupSkeletonProps> = ({
  label = true,
  optionsCount = 3,
  orientation = "vertical",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Label Skeleton */}
      {label && (
        <div className="mb-2 h-5 w-32 bg-gray-200 rounded animate-pulse" />
      )}

      {/* Options Container */}
      <div
        className={`flex gap-2 ${
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        }`}
      >
        {Array.from({ length: optionsCount }).map((_, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between border rounded-xl p-3 
              bg-gray-50 border-gray-200
              ${orientation === "horizontal" ? "min-w-[150px]" : "w-full"}
            `}
          >
            <div className="flex items-center gap-3">
              {/* Radio Circle Skeleton */}
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-100 animate-pulse" />

              {/* Label Text Skeleton */}
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Error Message Skeleton (optional - usually not shown in loading state) */}
      {/* <div className="mt-1 h-4 w-40 bg-red-100 rounded animate-pulse" /> */}
    </div>
  );
};

export default RadioGroupSkeleton;
