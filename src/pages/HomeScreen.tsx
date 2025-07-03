// import React, { useState } from "react";
import Button from "../components/Button";
import PropertyPlanList from "../components/DashboardHomeComponents/PropertyList";
import TransactionsList from "../components/DashboardHomeComponents/TransactionList";
import { useModalStore } from "../zustand/useModalStore";
import AddFundAmount from "../components/DashboardHomeComponents/AddFundAmount";
import { useGetUserDashboardData, useGetUserTransactions } from "../data/hooks";
import { Transaction } from "../data/types/userTransactionsTypes";
// import Loader from "../components/Loader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { UserProperty } from "../data/types/dashboardHomeTypes";
import { formatPrice } from "../data/utils";
import SmallLoader from "../components/SmallLoader";

const HomeScreen = () => {
  const openModal = useModalStore((state) => state.openModal);
  const startFundWallet = () => {
    openModal(<AddFundAmount goBack={startFundWallet} />);
  };
  const { data, isError, isLoading } = useGetUserDashboardData();
  const {
    // data: transRes,
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
  } = useGetUserTransactions(1);
  if (isLoading) {
    return <SmallLoader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }
  const transactions: Transaction[] = data?.user_transactions ?? [];
  const plans: UserProperty[] = data?.user_properties ?? [];

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="w-full">
        <img
          src="/images/Lemon-Friday-hor.png"
          alt=""
          className="h-[180px] w-full object-cover rounded-3xl"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-3 gap-4">
        {/* My Wallet */}
        <div className="col-span-2 md:row-span-2 bg-white rounded-3xl p-6 flex flex-col gap-4">
          <div className="mt-5">
            <p className="text-gray-500 font-semibold mb-2">My Wallet</p>
            <p className="text-3xl font-bold">
              {formatPrice(data?.wallet_balance ?? 0)}
            </p>
            <p className="text-xs text-gray-400">Wallet balance</p>
          </div>
          <Button
            label="Fund Wallet"
            className="!w-fit px-12 py-3 text-xs"
            onClick={startFundWallet}
          />
        </div>

        {/* My Properties */}
        <div className="rounded-3xl p-6 text-center bg-white flex flex-col justify-between row-span-2 md:row-span-3 h-fit md:h-auto">
          <div>
            <p className="text-adron-black mb-2">My Properties</p>
            <p className="text-xs text-adron-gray-200 w-full md:w-[60%] mx-auto">
              Properties you own or are currently financing.
            </p>
          </div>
          <div className="">
            <p className="text-6xl font-bold">{data?.total_property.total}</p>
            <div className="md:bg-adron-body flex w-full md:w-fit mx-auto rounded-full md:px-4 my-1 text-xs justify-between items-center gap-2 mb-4 md:mb-0">
              <span>
                {" "}
                {data?.total_property.breakdown[1]?.count ?? 0} Houses
              </span>
              <span className="text-lg">•</span>
              <span>
                {" "}
                {data?.total_property.breakdown[0]?.count ?? 0}{" "}
                {data?.total_property?.breakdown[0]?.type_name || "Lands"}{" "}
              </span>
            </div>
          </div>
          <a
            href="/my-properties"
            className="md:mt-4 text-adron-green font-bold text-sm"
          >
            View Properties
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:col-span-2 text-center">
          {/* Total Invoice */}
          <div className="bg-white rounded-3xl p-6 h-fit w-full">
            <p className="text-gray-500 font-semibold mb-2">Total Invoice</p>
            <p className="text-xl font-bold truncate">
              {formatPrice(data?.total_invoice ?? 0)}
            </p>
          </div>

          {/* Amount Paid */}
          <div className="bg-white rounded-3xl p-6 h-fit w-full">
            <p className="text-gray-500 font-semibold mb-2">Amount Paid</p>
            <p className="text-xl font-bold truncate">
              {formatPrice(data?.total_amount_paid ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PropertyPlanList
          plans={plans}
          isError={isError}
          isLoading={isLoading}
        />
        <TransactionsList
          data={transactions}
          isLoading={isLoadingTransaction}
          isError={isErrorTransaction}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
