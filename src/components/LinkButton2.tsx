"use client";

import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  label: string;
  link?: string;
  className?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  link = "/",
  className = "",
  icon,
  rightIcon,
}) => {
  return (
    <Link
      to={link}
      className={`w-full bg-adron-green flex items-center justify-center py-2 rounded-full transition duration-300 text-white hover:underline underline-offset-3 ${className}
        `}
    >
      <div className="flex items-center justify-center w-full">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </Link>
  );
};

export default LinkButton;
