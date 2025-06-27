// components/Pagination.tsx
import React from "react";
import Button from "./Button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrev,
  hasNext,
  className = "",
}) => {
  const handlePrev = () => {
    if (hasPrev) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNext) onPageChange(currentPage + 1);
  };

  // Calculate visible page numbers (current page + 2 neighbors)
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div
      className={`flex justify-center gap-2 items-center mt-10 ${className}`}
    >
      <Button
        label="Prev"
        icon={<IoArrowBack />}
        onClick={handlePrev}
        className="!w-fit px-3 text-xs h-8"
        disabled={!hasPrev}
      />

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-colors duration-200 ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <Button
        label="Next"
        rightIcon={<IoArrowForward />}
        onClick={handleNext}
        disabled={!hasNext}
        className="!w-fit px-3 text-xs h-8"
      />
    </div>
  );
};

export default Pagination;
