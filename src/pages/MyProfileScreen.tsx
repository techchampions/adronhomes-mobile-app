import React from "react";
import UserProfileCard from "../components/MyProfile/UserProfileCard";
import Button from "../components/Button";
import { useModalStore } from "../zustand/useModalStore";
import StatementRequest from "../components/MyProfile/StatementRequest";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetUser, useGetUserPropertiesPlan } from "../data/hooks";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { formatPrice } from "../data/utils";

const MyProfileScreen = () => {
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUser();
  const { data: planData } = useGetUserPropertiesPlan();
  const userData = data?.user;
  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="col-span-2 md:col-span-3">
        <UserProfileCard
          firstName={userData.first_name}
          lastName={userData.last_name}
          email={userData.email}
          joinedDate={userData.created_at}
          location={`${userData.address}, ${userData.lga}, ${userData.state}`}
          imageUrl={userData.profile_picture}
        />
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit col-span-2 md:col-span-1">
        <p className="text-gray-400 text-sm">total Properties</p>
        <div className=" flex w-fit mx-auto font-bold rounded-full justify-between items-center gap-2 ">
          <span>
            {planData?.total_property?.breakdown[1]?.count || 0} Houses
          </span>
          <span className="">•</span>
          <span>
            {planData?.total_property?.breakdown[0]?.count || 0} Lands
          </span>
        </div>
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
        <p className="text-gray-400 text-sm">Total Invoice</p>
        <p className="font-bold">{formatPrice(planData?.total_invoice ?? 0)}</p>
      </div>
      <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
        <p className="text-gray-400 text-sm">Amount Paid</p>
        <p className="font-bold">
          {formatPrice(planData?.total_amount_paid ?? 0)}
        </p>
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
          onClick={() => openModal(<StatementRequest />)}
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
          onClick={() => navigate("/faqs")}
        />
      </div>
    </div>
  );
};

export default MyProfileScreen;
