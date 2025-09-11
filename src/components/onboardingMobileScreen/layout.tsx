import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavItem from "../NavigationComponents/NavItem";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import {
  RiHomeHeartFill,
  RiLogoutBoxRFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import { useGetUser } from "../../data/hooks";
import { Navbar } from "./onboardingComponents/Bottomnavigation";
import { useUserStore } from "../../zustand/UserStore";
import Auth from "../../utils/Auth";
// Placeholder for external hooks and utilities to make the file runnable
// In a real project, these would be separate files.

const useGetNotifications = () => ({ data: { unread: 3 } });
// const Auth = { logout: () => console.log("User logged out.") };

// const Navbar = () => <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent text-center z-50">Bottom Navigation Bar</div>;

// --- Helper Components (defined in the same file) ---

const CopyButton = ({ text }: { text: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for browsers that do not support navigator.clipboard
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button onClick={handleCopy} className="text-[10px] text-gray-400">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

// --- New Sidebar Component ---
const Sidebar = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { data: notificationData } = useGetNotifications();
  const unReadCount = notificationData?.unread || 0;
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        event.target instanceof Node &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isOpen]);

  const goTpProfile = () => {
    navigate("/dashboard/my-profile");
    onClose();
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-[60] transition-transform duration-300 h-screen  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex`}
      >
        {/* Transparent dark overlay to close the sidebar */}
        <div className="flex-1 bg-black" onClick={() => onClose()} />

        {/* Side drawer menu */}
        <div className="w-64 bg-white h-screen p-6 shadow-lg flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Link to="/" onClick={onClose}>
                <img src="/logo.png" alt="logo" className=" w-[60%]" />
              </Link>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <div className="border border-gray-300 rounded-xl px-4 py-1 gap-1 flex flex-col">
              <div className="flex justify-between w-full gap-4">
                <p className="text-[10px] text-gray-400">Customer ID</p>
                <CopyButton text={user?.unique_customer_id} />
              </div>
              <p className="text-xs truncate">
                {user?.unique_customer_id || "No Customer ID"}
              </p>
            </div>

            <input
              placeholder="Search..."
              className="px-6 bg-gray-100 rounded-full py-2 text-xs"
            />
          </div>

          {/* Main navigation container */}
          <div className="flex-grow overflow-y-auto scrollbar-hide py-1.5 bg-white rounded-2xl mt-4">
            <nav className="space-y-2 p-2">
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Dashboard"
                icon={<MdDashboardCustomize className="w-4 h-4" />}
                path="/dashboard/"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="My Wallet"
                icon={<RiWallet3Fill className=" w-4 h-4" />}
                path="/dashboard/wallet"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Payments"
                icon={<FaArrowRightArrowLeft className=" w-4 h-4" />}
                path="/dashboard/payments"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Notifications"
                icon={<RiNotificationBadgeFill className=" w-4 h-4" />}
                path="/dashboard/notifications"
                badge={unReadCount || 0}
              />
              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                LISTINGS
              </h4>
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="My Properties"
                icon={<MdAddHome className=" w-4 h-4" />}
                path="/dashboard/my-properties"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="New Properties"
                icon={<MdAddHome className=" w-4 h-4" />}
                path="/dashboard/new-properties"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Saved Properties"
                icon={<RiHomeHeartFill className=" w-4 h-4" />}
                path="/dashboard/saved-properties"
              />
              {/* Profile Nav */}
              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                PROFILE
              </h4>
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="My Profile"
                icon={<FaUserAlt className=" w-4 h-4" />}
                path="/dashboard/my-profile"
              />
              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Account Settings"
                icon={<IoSettingsSharp className=" w-4 h-4" />}
                path="/dashboard/settings"
              />

              <NavItem
                onSlideBack={() => {
                  onClose();
                }}
                label="Support"
                icon={<MdOutlineHelp className=" w-4 h-4" />}
                path="/dashboard/support"
              />
            </nav>
            <nav className="space-y-2 p-2 mt-auto">
              <button
                onClick={() => {
                  Auth.logout();
                  onClose();
                }}
                className="flex items-center w-full px-7 py-2 text-[15px] text-red-500 rounded-full bg-[#FFE6E6] hover:bg-red-200 transition-colors duration-200"
              >
                <RiLogoutBoxRFill className="mr-2 w-4 h-4" />
                Logout
              </button>
              <a
                href="https://adronhomes.com/"
                className="text-green-500 text-[15px] w-full block font-bold px-7 py-2 text-center mx-auto"
              >
                Go to Website
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export const Layout = ({ children }: { children: any }) => {
  const { data, isLoading } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userData = data?.user;

  // New state for header visibility
  const [headerVisible, setHeaderVisible] = useState(true);

  // useEffect to handle the header visibility on scroll
  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      // Hide the header as soon as scrolling starts
      setHeaderVisible(false);

      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout to show the header after a brief pause
      scrollTimeout = setTimeout(() => {
        setHeaderVisible(true);
      }, 500); // Adjust this delay as needed
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getRandomBgColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const userHasProfilePicture = userData?.profile_picture;
  const initials =
    (userData?.first_name?.[0] || "") + (userData?.last_name?.[0] || "");
  const backgroundColor = getRandomBgColor();

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showBoundary, setShowBoundary] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setShowBoundary(width >= 525 && width <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 px-4 pt-4 pb-16 md:pb-16 z-20 transition-transform duration-300
        ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div
          className={`absolute md:-right-72 bottom-1 md:bottom-0 rounded-full z-0 bg-[#55A555]
            ${
              showBoundary
                ? "w-[1500px] h-[1500px] -right-60"
                : "w-[600px] h-[600px] -right-4"
            }
            md:w-[1700px] md:h-[1700px] lg:w-[2500px] lg:h-[2500px] xl:w-[3500px] xl:h-[3500px]`}
        ></div>

        <div className="flex justify-between items-start relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Open navigation menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-white rounded"></span>
                <span className="block w-6 h-0.5 bg-white rounded"></span>
                <span className="block w-6 h-0.5 bg-white rounded"></span>
              </div>
            </button>

            <div className="text-white">
              <div className="text-sm font-normal opacity-90">Welcome,</div>
              <div
                className="text-lg md:text-xl font-bold mt-1 max-w-[200px] md:max-w-[300px] truncate"
                title={userData?.first_name || ""}
              >
                {userData?.first_name || ""}
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white hover:border-gray-200 transition-colors duration-200">
            {userHasProfilePicture ? (
              <img
                src={userData.profile_picture!}
                alt="User profile picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: backgroundColor }}
              >
                {initials.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* The Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Add padding-bottom to account for the fixed navbar */}
      <main className="flex-1 overflow-auto pt-36 md:pt-44 pb-32 overflow-y-auto">
        {children}
      </main>

      <Navbar />
    </div>
  );
};
