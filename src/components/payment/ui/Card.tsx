import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  isClickable?: boolean;
}

export function Card({
  children,
  isSelected = false,
  isClickable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl p-4 transition-all duration-200 ${
        isSelected
          ? 'shadow-lg'
          : 'hover:shadow-md'
      } ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: isSelected ? 'rgba(121, 184, 51, 0.1)' : 'var(--color-adron-gray-50)',
        border: isSelected 
          ? `2px solid var(--color-adron-green)`
          : `1px solid var(--color-adron-gray-200)`,
        boxShadow: isSelected ? `0 0 20px rgba(121, 184, 51, 0.2)` : 'none'
      }}
      {...props}
    >
      {children}
    </div>
  );
}