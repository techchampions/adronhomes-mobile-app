import { FaHome, FaPlus } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";
import React from "react";
import MobileNavItem from "./MobileNavItem";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed flex bottom-0  left-0 right-0 bg-white shadow-lg shadow-black py-4 px-2 md:hidden justify-around">
      <MobileNavItem
        label="Home"
        icon={<MdDashboardCustomize size={24} />}
        path="/dashboard"
      />
      <MobileNavItem
        label="Properties"
        icon={<FaHome size={24} />}
        path="/dashboard/my-properties"
      />
      <Link
        to={"/dashboard/new-properties"}
        className="bg-adron-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg -mt-6"
        // onClick={() => setShowModal(true)}
      >
        <FaPlus size={24} />
      </Link>
      <MobileNavItem
        label="Wallet"
        icon={<RiWallet3Fill size={24} />}
        path="/dashboard/wallet"
      />
      <MobileNavItem
        label="Settings"
        icon={<IoSettingsSharp size={24} />}
        path="/dashboard/my-profile"
      />
    </nav>
  );
};

export default BottomNav;
