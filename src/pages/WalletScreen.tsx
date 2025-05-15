import React from "react";
import Button from "../components/Button";
import CopyButton from "../components/CopyButton";
import WalletHistory from "../components/DashboardWalletComponents/WalletHistoryList";
import { useModalStore } from "../zustand/useModalStore";
import AddFundAmount from "../components/DashboardHomeComponents/AddFundAmount";
import { useGetUserWalletdata } from "../data/hooks";
import { formatPrice } from "../data/utils";
import TransactionsList from "../components/DashboardTransactionComponents/TransactionsList";
import ApiErrorBlock from "../components/ApiErrorBlock";
import SmallLoader from "../components/SmallLoader";

const WalletScreen = () => {
  const openModal = useModalStore((state) => state.openModal);
  const startFundWallet = () => {
    openModal(<AddFundAmount goBack={startFundWallet} />);
  };
  const { data, isLoading, isError } = useGetUserWalletdata();
  if (isError) {
    return <ApiErrorBlock />;
  }
  if (isLoading) {
    return <SmallLoader />;
  }
  const transactions = data?.user_transactions ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-3 gap-6">
        <div className="md:row-span-2 col-span-2 md:col-span-1 p-6 rounded-3xl flex flex-col gap-4 justify-between items-center">
          <p className="text-xs">My Wallet</p>
          <p className="text-3xl font-bold">
            {" "}
            {formatPrice(data?.wallet_balance ?? 0)}{" "}
          </p>
          <p className="text-xs">Wallet balance</p>
          <Button
            label="Fund Wallet"
            className="!w-fit px-12 py-3 text-xs"
            onClick={startFundWallet}
          />
          <p className="text-xs bg-gray-200 px-6 py-1 rounded-full">
            {data?.total_property} active plans
          </p>
        </div>
        <div className="row-span-1 md:row-span-2 col-span-2 md:col-span-1 p-10 bg-white rounded-3xl flex flex-col gap-4 justify-between">
          <p className="text-md font-semibold">Wallet Details</p>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <p className="text-sm">
                {data?.virtual_account.account_number || "loading..."}
              </p>
              <p className="text-[9px] text-gray-400">Account Number</p>
            </div>
            <CopyButton text="8394839302" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              {data?.virtual_account.account_bank || "loading..."}
            </p>
            <p className="text-[9px] text-gray-400">Bank Name</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              {" "}
              {data?.virtual_account.account_name || "loading..."}{" "}
            </p>
            <p className="text-[9px] text-gray-400">Account Name</p>
          </div>
        </div>
        <div className="flex gap-4 row-span-1 col-span-2 h-fit">
          <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit w-full">
            <p className="text-gray-400 text-sm">Total Invoice</p>
            <p className="font-bold">
              {" "}
              {formatPrice(data?.total_invoice ?? 0)}{" "}
            </p>
          </div>
          <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit w-full">
            <p className="text-gray-400 text-sm">Amount Paid</p>
            <p className="font-bold">
              {formatPrice(data?.total_amount_paid ?? 0)}
            </p>
          </div>
        </div>
      </div>
      <TransactionsList
        data={transactions}
        isLoading={isLoading}
        isError={isError}
      />
      {/* <WalletHistory /> */}
    </div>
  );
};

export default WalletScreen;
