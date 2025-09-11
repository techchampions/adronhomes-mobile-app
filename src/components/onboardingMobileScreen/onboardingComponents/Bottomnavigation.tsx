import React, { useState } from "react";
import { BsFillHouseCheckFill, BsFillHouseFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import AddFundAmount from "../../DashboardHomeComponents/AddFundAmount";
import { useModalStore } from "../../../zustand/useModalStore";

export const Navbar = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  
    // const openModal = useModalStore((state) => state.openModal);
    // const startFundWallet = () => {
    // openModal(<AddFundAmount goBack={startFundWallet} />);
  // };
 
  const navigate =useNavigate()

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-white shadow-lg p-4 flex justify-between items-center z-50">
        {/* Home */}{" "}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center flex-1 ${
            isActive("/dashboard") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
    
          <MdDashboard className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Home</span>{" "}
        </Link>
        {/* Properties */}{" "}
        <Link
          to="/dashboard/my-properties"
          className={`flex flex-col items-center flex-1 ${
            isActive("/dashboard/my-properties") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <BsFillHouseCheckFill  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Properties</span>{" "}
        </Link>
        <div className="flex-1"></div>{" "}
        <button
    onClick={()=>navigate('/dashboard/new-properties')}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 text-white bg-[linear-gradient(180deg,#B5E67E_0%,#619B21_100%)] rounded-full shadow-md transition-colors"
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
          to="/dashboard/wallet"
          className={`flex flex-col items-center flex-1 ${
            isActive("/dashboard/wallet") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <RiWallet3Fill  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Wallet</span>{" "}
        </Link>
        {/* Settings */}{" "}
        <Link
          to="/dashboard/settings"
          className={`flex flex-col items-center flex-1 ${
            isActive("/dashboard/settings") ? "text-[#79B833]" : "text-gray-500"
          }`}
        >
          <IoMdSettings  className="w-6 h-6" />{" "}
          <span  className="text-[12px]  font-[325]">Settings</span>{" "}
        </Link>{" "}
      </nav>
      
    </>
  );
};


