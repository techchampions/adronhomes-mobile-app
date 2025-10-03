import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavItem from "../NavigationComponents/NavItem";
import { FaSpinner, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import {
  RiHomeHeartFill,
  RiLogoutBoxRFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import { useGetNotifications, useGetUser } from "../../data/hooks";
import { Navbar } from "./onboardingComponents/Bottomnavigation";
import { useUserStore } from "../../zustand/UserStore";
import Auth from "../../utils/Auth";



const CopyButton = ({ text }: { text: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
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

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { data: notificationData } = useGetNotifications(1);
  const unReadCount = notificationData?.unread || 0;
  const noNfx=unReadCount===0
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        event.target instanceof Node &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isOpen]);

  // Handle logout
  const handleLogout = () => {
    Auth.logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-[59]"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-[60] transition-transform duration-300 h-screen w-64 bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Link to="/" onClick={onClose}>
                <img src="/logo.png" alt="logo" className="w-[60%]" />
              </Link>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={24} />
              </button>
            </div>

            {/* Customer ID */}
            <div className="border border-gray-300 rounded-xl px-4 py-1 gap-1 flex flex-col">
              <div className="flex justify-between w-full gap-4">
                <p className="text-[10px] text-gray-400">Customer ID</p>
                <CopyButton text={user?.unique_customer_id} />
              </div>
              <p className="text-xs truncate">
                {user?.unique_customer_id || "No Customer ID"}
              </p>
            </div>

            {/* Search */}
            <input
              placeholder="Search..."
              className="px-6 bg-gray-100 rounded-full py-2 text-xs"
            />
          </div>

          {/* Navigation */}
          <div className="flex-grow overflow-y-auto scrollbar-hide py-1.5 bg-white rounded-2xl mt-4">
            <nav className="space-y-2 p-2">
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Dashboard"
                icon={<MdDashboardCustomize className="w-4 h-4" />}
                path="/dashboard/home"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="My Wallet"
                icon={<RiWallet3Fill className="w-4 h-4" />}
                path="/dashboard/wallet"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Payments"
                icon={<FaArrowRightArrowLeft className="w-4 h-4" />}
                path="/dashboard/payments"
              />
            { noNfx? <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Notifications"
                icon={<RiNotificationBadgeFill className="w-4 h-4"/>}
                path="/dashboard/notifications"
                // badge={unReadCount || 0}
              />:
  <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Notifications"
                icon={<RiNotificationBadgeFill className="w-4 h-4"/>}
                path="/dashboard/notifications"
                badge={unReadCount || 0}
              />}
              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                LISTINGS
              </h4>

              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="My Properties"
                icon={<MdAddHome className="w-4 h-4" />}
                path="/dashboard/my-properties"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="New Properties"
                icon={<MdAddHome className="w-4 h-4" />}
                path="/dashboard/new-properties"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Saved Properties"
                icon={<RiHomeHeartFill className="w-4 h-4" />}
                path="/dashboard/saved-properties"
              />

              <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-[13px]">
                PROFILE
              </h4>

              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="My Profile"
                icon={<FaUserAlt className="w-4 h-4" />}
                path="/dashboard/my-profile"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Account Settings"
                icon={<IoSettingsSharp className="w-4 h-4" />}
                path="/dashboard/settings"
              />
              <NavItem
                onSlideBack={(mobileOpen) => !mobileOpen && onClose()}
                label="Support"
                icon={<MdOutlineHelp className="w-4 h-4" />}
                path="/dashboard/support"
              />
            </nav>

            {/* Footer actions */}
            <nav className="space-y-2 p-2 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-7 py-2 text-[15px] text-red-500 rounded-full bg-[#FFE6E6] hover:bg-red-200 transition-colors duration-200"
              >
                <RiLogoutBoxRFill className="mr-2 w-4 h-4" />
                Logout
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://adronhomes.com/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="text-green-500 text-[15px] w-full block font-bold px-7 py-2 text-center mx-auto hover:text-green-600 transition-colors"
              >
                Go to Website
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};


import { Formik, Form } from 'formik';
// import { InputField } from 'path/to/InputField'; // Adjust import as needed
import { FaSearch, FaTimes } from 'react-icons/fa'; // Added FaTimes for cancel button
import { useQueryClient } from '@tanstack/react-query';
import { searchProperties } from "../../data/api";
import InputField from "../InputField";
import { useSearchStore } from "../../zustand/SearchStore";
import { TbSquareDashed } from "react-icons/tb";
// import { searchProperties } from 'path/to/searchProperties'; // Adjust import as needed

export const Layout = ({ children }: { children: any }) => {
  const { data, isLoading } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search input
  const userData = data?.user;
  const { setSearchResults, setLoading,isLoading:loadingSearch } = useSearchStore();
  const userHasProfilePicture = userData?.profile_picture;
  const initials =
    (userData?.first_name?.[0] || '') + (userData?.last_name?.[0] || '');

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [showBoundary, setShowBoundary] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // const [loading, setLoading] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setShowBoundary(width >= 525 && width <= 767);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchSubmit = async (values: { search: string }) => {
    setLoading(true);
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['search-properties-results', values.search],
        queryFn: () => searchProperties({ search: values.search }),
      });
      setSearchResults(data);
      navigate('/dashboard/search-properties');
      setIsSearchOpen(false); 
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-transparent flex flex-col">

      <header className="fixed top-0 left-0 right-0 px-4 py-2 z-50 bg-[#0e760e]">

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
              <div className="text-[10px] font-normal opacity-90">Welcome,</div>
              <div
                className="text-sm md:text-sm font-bold max-w-[150px] md:max-w-[200px] truncate"
                title={userData?.first_name || ''}
              >
                {userData?.first_name || ''}
              </div>
            </div>
          </div>

          {/* Search Icon and Form */}
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="fixed inset-x-0 top-0 bg-[#0e760e] px-4 py-2 z-50 flex items-center justify-between md:static md:flex md:items-center md:max-w-md">
                <Formik
                  initialValues={{ search: '' }}
                  onSubmit={handleSearchSubmit}
                >
                  {({ resetForm }) => (
                    <Form className="flex items-center gap-2 w-full">
                      <InputField
                        name="search"
                        type="text"
                        placeholder="Search properties..."
                        className="w-full text-adron-black bg-white/20 border border-white/30 rounded-md px-3 py-1.5 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                        // disabled={loading}
                        // autoFocus
                      />
                      <div className="flex items-center gap-1">
                        <button
                          type="submit"
                          disabled={loadingSearch}
                          className="p-1.5 text-white hover:text-gray-200"
                        >
                          {loadingSearch ? (
                            <FaSpinner className="animate-spin" size={14} />
                          ) : (
                            <FaSearch size={14} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            resetForm();
                          }}
                          className="p-1.5 text-white hover:text-gray-200"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

              </div>
            ) : (
              <><button
                  className="p-2 text-white hover:text-gray-200 mr-2 md:mr-5"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open search"
                >
                  <FaSearch size={16} />
                </button><div
                  className="w-8 h-8 rounded-full bg-white overflow-hidden border-2 border-white hover:border-gray-200 transition-colors duration-200 flex-shrink-0"
                  onClick={() => navigate('/dashboard/my-profile')}
                >
                    {userHasProfilePicture ? (
                      <img
                        src={userData.profile_picture!}
                        alt="User profile picture"
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-adron-black text-xs font-bold">
                        {initials.toUpperCase()}
                      </div>
                    )}
                  </div></>
            )}
          </div>

         
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        className={`flex-1 overflow-auto pt-[70px] ${
          isSearchOpen ? 'md:pt-[70px]' : 'md:pt-[70px]'
        } pb-32 overflow-y-auto transition-all duration-300`}
      >
        {children}
      </main>

      <Navbar />
    </div>
  );
};
