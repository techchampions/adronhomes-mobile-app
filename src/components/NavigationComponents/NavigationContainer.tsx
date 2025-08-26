import NavItem from "./NavItem";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import {
  RiHomeHeartFill,
  RiLogoutBoxRFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import NavbarAddorder from "./NavbarAddorder";
import Auth from "../../utils/Auth";
import { useGetNotifications } from "../../data/hooks";

function NavigationContainer() {
  const { data: notificationData } = useGetNotifications(1);
  const unread = notificationData?.unread || 0;
  return (
    <div className="flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img
        src="/images/logo.svg"
        alt="Wash Track"
        className="w-[60%] mx-auto"
      />

      <div className="w-full flex-1 py-1.5 bg-white rounded-2xl">
        <nav className="space-y-2 p-2">
          <NavItem
            label="Dashboard"
            icon={<MdDashboardCustomize className="w-4 h-4" />}
            path="/dashboard"
          />
          <NavItem
            label="My Wallet"
            icon={<RiWallet3Fill className=" w-4 h-4" />}
            path="/dashboard/wallet"
          />
          <NavItem
            label="Payments"
            icon={<FaArrowRightArrowLeft className=" w-4 h-4" />}
            path="/dashboard/payments"
          />
          <NavItem
            label="Notifications"
            icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
            path="/dashboard/notifications"
            badge={unread}
          />
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
            LISTINGS
          </h4>
          <NavItem
            label="My Properties"
            icon={<MdAddHome className=" w-4 h-4" />}
            path="/dashboard/my-properties"
          />
          <NavItem
            label="New Properties"
            icon={<MdAddHome className=" w-4 h-4" />}
            path="/dashboard/new-properties"
          />
          <NavItem
            label="Saved Properties"
            icon={<RiHomeHeartFill className=" w-4 h-4" />}
            path="/dashboard/saved-properties"
          />
          {/* Profile Nav */}
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
            PROFILE
          </h4>
          <NavItem
            label="My Profile"
            icon={<FaUserAlt className=" w-4 h-4" />}
            path="/dashboard/my-profile"
          />
          <NavItem
            label="Account Settings"
            icon={<IoSettingsSharp className=" w-4 h-4" />}
            path="/dashboard/settings"
          />

          <NavItem
            label="Support"
            icon={<MdOutlineHelp className=" w-4 h-4" />}
            path="/dashboard/support"
          />
        </nav>
        {/* <div className="px-4 py-20">
          <NavbarAddorder />
        </div> */}
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
            href="https://adronhomes.com"
            className="text-adron-green text-[12px] w-full block font-bold px-7 py-[7px] text-center mx-auto"
          >
            Go to Website
          </a>
        </nav>
      </div>
    </div>
  );
}

export default NavigationContainer;
