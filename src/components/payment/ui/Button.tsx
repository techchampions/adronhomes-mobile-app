import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: `text-white shadow-lg hover:shadow-xl`,
    secondary: `border transition-colors`,
    ghost: `transition-colors`,
    danger: `text-white transition-colors`,
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-adron-green) 0%, #5a8c1a 100%)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--color-adron-gray-50)',
      borderColor: 'var(--color-adron-gray-200)',
      color: 'var(--color-adron-black)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-adron-gray-500)'
    },
    danger: {
      backgroundColor: 'var(--color-adron-red)',
      color: 'white'
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const currentVariantStyle = variantStyles[variant];

  return (
    <button
      disabled={disabled || isLoading}
      style={currentVariantStyle}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <div 
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          style={{ borderColor: `currentColor transparent transparent transparent` }}
        />
      )}
      {children}
    </button>
  );
}