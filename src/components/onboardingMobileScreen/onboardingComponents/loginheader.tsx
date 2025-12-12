import React from "react";
import { Link, Outlet } from "react-router-dom";

export const LoginHeader = () => {
  return (
    <>
      <nav className="sticky top-0 w-full bg-white py-3 md:py-4 flex justify-between items-center z-50 px-4">
        {/* Company Logo */}
        <div className="flex items-center min-w-0">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-10 md:h-10 mr-1 md:mr-2 flex-shrink-0"
          />
        </div>

        {/* Login and Register Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link
            to="/login"
            className="px-3 py-1 md:px-4 md:py-2 text-gray-700 hover:text-[#79B833] font-medium text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 md:px-4 md:py-2 bg-[linear-gradient(180deg,#B5E67E_0%,#619B21_100%)] text-white rounded-md shadow-md hover:brightness-110 text-sm md:text-base"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* This is where the child routes render */}
      <Outlet />
    </>
  );
};