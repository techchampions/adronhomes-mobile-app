import React from "react";
import UserProfileCard from "../components/MyProfile/UserProfileCard";
import Button from "../components/Button";

const MyProfileScreen = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="col-span-2 md:col-span-3">
        <UserProfileCard
          name="Mika Edmoud Miles"
          email="Simonbii99@yahoo.com"
          joinedDate="25th June 1999"
          location="Ejigbo Wuse, Lagos"
          imageUrl="/mika.png"
        />
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit col-span-2 md:col-span-1">
        <p className="text-gray-400 text-sm">total Properties</p>
        <div className=" flex w-fit mx-auto font-bold rounded-full justify-between items-center gap-2 ">
          <span>2 Houses</span>
          <span className="">•</span>
          <span>3 Lands</span>
        </div>
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
        <p className="text-gray-400 text-sm">Total Invoice</p>
        <p className="font-bold">₦170,000,000</p>
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
        <p className="text-gray-400 text-sm">Amount Paid</p>
        <p className="font-bold">₦61,000,000</p>
      </div>

      <div className="col-span-2 md:col-span-3 flex flex-col md:flex-row justify-between gap-3 md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
        <div className="flex flex-col w-full md:w-[60%]">
          <h4 className=" font-bold text-md">Account Statement</h4>
          <p className="text-gray-400 text-xs">
            Request a statement of your account to track your investments and
            see where you are putting your money.
          </p>
        </div>
        <Button
          label="Request Statement"
          className="bg-black text-white font-bold !w-[155px] text-xs"
        />
      </div>
      <div className="col-span-2 md:col-span-3 flex flex-col md:flex-row justify-between gap-3 md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
        <div className="flex flex-col w-full md:w-[60%]">
          <h4 className=" font-bold text-md">FAQs</h4>
          <p className="text-gray-400 text-xs">
            See a list of frequently asked questions from our other clients to
            help make the best investment and understand how we operate.{" "}
          </p>
        </div>
        <Button
          label="See FAQs"
          className="bg-black text-white font-bold !w-[155px] text-xs"
        />
      </div>
    </div>
  );
};

export default MyProfileScreen;
