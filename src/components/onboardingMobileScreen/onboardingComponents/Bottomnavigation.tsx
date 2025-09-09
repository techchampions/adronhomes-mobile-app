import React, { useState } from "react";
import { BsFillHouseCheckFill, BsFillHouseFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {" "}
      {/* Change 'justify-around' to 'justify-between' for consistent spacing */}{" "}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg p-4 flex justify-between items-center">
        {/* Home */}{" "}
        <Link
          to="/"
          className={`flex flex-col items-center flex-1 ${
            isActive("/nav") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
    
          <MdDashboard className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Home</span>{" "}
        </Link>
        {/* Properties */}{" "}
        <Link
          to="/properties"
          className={`flex flex-col items-center flex-1 ${
            isActive("/properties") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <BsFillHouseCheckFill  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Properties</span>{" "}
        </Link>
        {/* Placeholder for the add button to maintain spacing */}
        <div className="flex-1"></div>{" "}
        {/* Add Button - Absolutely Positioned in the Middle */}{" "}
        <button
          onClick={openModal}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 text-white bg-[linear-gradient(180deg,#B5E67E_0%,#619B21_100%)] rounded-full shadow-md transition-colors"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />{" "}
          </svg>{" "}
        </button>
        {/* Wallet */}{" "}
        <Link
          to="/wallet"
          className={`flex flex-col items-center flex-1 ${
            isActive("/wallet") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <RiWallet3Fill  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Wallet</span>{" "}
        </Link>
        {/* Settings */}{" "}
        <Link
          to="/settings"
          className={`flex flex-col items-center flex-1 ${
            isActive("/settings") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <IoMdSettings  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Settings</span>{" "}
        </Link>{" "}
      </nav>
      {/* Modal and other components */}{" "}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {" "}
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            {" "}
            <div className="flex justify-between items-center mb-4">
              {" "}
              <h2 className="text-xl font-semibold">Add New Item</h2>{" "}
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
            <p className="text-gray-600 mb-4">What would you like to add?</p>{" "}
            <div className="flex flex-col space-y-3">
              {" "}
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-[#79B833] transition-colors">
                Add Property{" "}
              </button>{" "}
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Add Transaction{" "}
              </button>{" "}
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                onClick={closeModal}
              >
                Cancel{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="fixed bottom-0 w-full bg-white shadow-lg p-4 flex justify-around items-center relative">
//       {/* Home */}
//       <Link
//         to="/"
//         className={`flex flex-col items-center ${isActive('/') ? 'text-[#79B833]' : 'text-gray-500'}`}
//       >
//         <span className="text-2xl">🏠</span>
//         <span  className="text-[12px]  font-[325]">Home</span>
//       </Link>

//       {/* Properties */}
//       <Link
//         to="/properties"
//         className={`flex flex-col items-center ${isActive('/properties') ? 'text-[#79B833]' : 'text-gray-500'}`}
//       >
//         <span className="text-2xl">🏡</span>
//         <span  className="text-[12px]  font-[325]">Properties</span>
//       </Link>

//       {/* Add Button - Absolutely Positioned in the Middle */}
//       <Link
//         to="/add"
//         className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white bg-green-500 rounded-full w-14 h-14 justify-center shadow-md"
//       >
//         <span className="text-2xl">+</span>
//       </Link>

//       {/* Wallet */}
//       <Link
//         to="/wallet"
//         className={`flex flex-col items-center ${isActive('/wallet') ? 'text-[#79B833]' : 'text-gray-500'}`}
//       >
//         <span className="text-2xl">💼</span>
//         <span  className="text-[12px]  font-[325]">Wallet</span>
//       </Link>

//       {/* Settings */}
//       <Link
//         to="/settings"
//         className={`flex flex-col items-center ${isActive('/settings') ? 'text-[#79B833]' : 'text-gray-500'}`}
//       >
//         <span className="text-2xl">⚙️</span>
//         <span  className="text-[12px]  font-[325]">Settings</span>
//       </Link>
//     </nav>
//   );
// };
