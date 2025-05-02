import React, { useState } from "react";
import NavItem from "./NavItem";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import {
  RiAppsLine,
  RiHomeHeartFill,
  RiLogoutBoxRFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import NavbarAddorder from "./NavbarAddorder";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/Auth";

function NavigationContainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img
        src="/images/logo.svg"
        alt="Wash Track"
        className="w-[60%] mx-auto"
      />
      <div className="w-full py-1.5 bg-white rounded-2xl">
        <nav className="space-y-2 p-2">
          <NavItem
            label="Dashboard"
            icon={<MdDashboardCustomize className="w-4 h-4" />}
            path="/"
          />
          <NavItem
            label="My Wallet"
            icon={<RiWallet3Fill className=" w-4 h-4" />}
            path="/wallet"
          />
          <NavItem
            label="Transactions"
            icon={<FaArrowRightArrowLeft className=" w-4 h-4" />}
            path="/transactions"
          />
          <NavItem
            label="Notifications"
            icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
            path="/notifications"
          />
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
            LISTINGS
          </h4>
          <NavItem
            label="My Properties"
            icon={<MdAddHome className=" w-4 h-4" />}
            path="/properties"
          />
          <NavItem
            label="New Properties"
            icon={<MdAddHome className=" w-4 h-4" />}
            path="/new-properties"
          />
          <NavItem
            label="Saved Properties"
            icon={<RiHomeHeartFill className=" w-4 h-4" />}
            path="/saved-properties"
          />
          {/* Profile Nav */}
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
            PROFILE
          </h4>
          <NavItem
            label="My Profile"
            icon={<FaUserAlt className=" w-4 h-4" />}
            path="/profile"
          />
          <NavItem
            label="Account Settings"
            icon={<IoSettingsSharp className=" w-4 h-4" />}
            path="/settings"
          />

          <NavItem
            label="Surport"
            icon={<MdOutlineHelp className=" w-4 h-4" />}
            path="/support"
          />
        </nav>
        <div className="px-4 py-20">
          <NavbarAddorder />
        </div>
        <nav className="space-y-2 p-2">
          <button
            onClick={() => {
              Auth.logout();
            }}
            className="flex items-center w-full px-7 py-[7px] text-[12px] text-red-500 rounded-full bg-[#FFE6E6] hover:bg-red-200"
          >
            <RiLogoutBoxRFill className="mr-2  w-4 h-4" />
            Logout
          </button>
          <a
            href=""
            className="text-adron-green text-[12px] w-full block font-bold px-7 py-[7px] text-center mx-auto"
          >
            Go Home
          </a>
        </nav>
      </div>
    </div>
  );
}

export default NavigationContainer;
