import { FaHome, FaStore, FaPlus } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import MobileNavItem from "./MobileNavItem";
import { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const BottomNav = () => {
  return (
    <nav className="fixed flex bottom-0  left-0 right-0 bg-white shadow-lg shadow-black py-4 px-2 md:hidden justify-around">
      <MobileNavItem label="Home" icon={<FaHome size={24} />} path="/" />
      <MobileNavItem
        label="Transactions"
        icon={<FaArrowRightArrowLeft size={24} />}
        path="/transactions"
      />
      <button className="bg-adron-green text-white rounded-full w-15 h-15 flex items-center justify-center shadow-lg -mt-8">
        <FaPlus size={24} />
      </button>
      <MobileNavItem
        label="E-store"
        icon={<FaStore size={24} />}
        path="/dashboard/my-store"
        badgeCount={4} // Example badge for notifications
      />
      <MobileNavItem
        label="More"
        icon={<RiAppsLine size={24} />}
        path="/dashboard/more"
      />
    </nav>
  );
};

export default BottomNav;
