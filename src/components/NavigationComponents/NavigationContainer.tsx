import React, { useState } from "react";
import NavItem from "./NavItem";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdAddHome, MdDashboardCustomize, MdOutlineHelp } from "react-icons/md";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";
import {
  RiAppsLine,
  RiHomeHeartFill,
  RiNotificationBadgeFill,
  RiWallet3Fill,
} from "react-icons/ri";
import NavbarAddorder from "./NavbarAddorder";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/Auth";

function NavigationContainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-10  gap-5 h-screen justify-between">
      <img
        src="/images/logo.svg"
        alt="Wash Track"
        className="w-[70%] mx-auto"
      />
      <div className="w-full py-8 bg-white rounded-2xl">
        <nav className="space-y-2 p-2">
          <NavItem
            label="Dashboard"
            icon={<MdDashboardCustomize className="w-4 h-4" />}
            path="/"
          />

          {/* Replace Add Order NavItem with a button to open modal */}
          {/* <button
            onClick={() => setShowModal(true)}
            className="flex items-center w-full px-3 py-[7px] text-[12px]  rounded-md hover:bg-brand-400"
          >
            <MdOutlineAddBox className="mr-2  w-4 h-4" />
            Add Order
          </button>
 */}
          <NavItem
            label="My Wallet"
            icon={<RiWallet3Fill className=" w-4 h-4" />}
            path="/wallet"
          />
          {/* <NavItem
            label="My Store"
            icon={<LiaStoreAltSolid className="" />}
            path="/dashboard/my-store"
          /> */}
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
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-md">
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
          <h4 className="text-adron-gray-400 font-bold px-7 mt-7 text-md">
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
          <button
            onClick={() => {
              Auth.logout();
            }}
            className="flex items-center w-full px-7 py-[7px] text-[12px] text-adron-gray-400 rounded-full hover:bg-adron-green-200 hover:text-adron-green"
          >
            <IoLogOut className="mr-2  w-4 h-4" />
            Logout
          </button>

          <NavItem
            label="Surport"
            icon={<MdOutlineHelp className=" w-4 h-4" />}
            path="/support"
          />

          {/* Nested nav */}
          <NavItem
            label="More"
            icon={<RiAppsLine className=" w-4 h-4" />}
            children={[
              { label: "Setting", path: "/dashboard/settings" },
              { label: "Customer", path: "/dashboard/customers" },
              { label: "Outstanding", path: "/dashboard/outstanding" },
            ]}
          />
        </nav>
      </div>
      <NavbarAddorder />

      {/* Add Order Modal */}
      {/* <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <img src="/images/1171275266.png" alt="" className="w-[150px]" />
          <h2 className="text-2xl font-brand-bold mb-4 text-black">
            Create Order
          </h2>
          <p className="text-gray-600 mb-6">
            Please select if you are creating a new customer or existing
            customer order
          </p>
          <div className="flex flex-col justify-between w-full gap-2">
            <Button
              label="Existing User"
              className="bg-brand  px-4 py-2"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/add-order/existing-customer");
                // window.location.href = "/dashboard/add-order/existing-customer";
              }}
            />
            <Button
              label="New User"
              className="bg-brand-muted  px-4 py-2 w-full"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/add-order/new-customer");

                // window.location.href = "/dashboard/add-order/new-customer";
              }}
            />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

export default NavigationContainer;
