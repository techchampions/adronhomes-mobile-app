import Button from "../components/Button";
import CopyButton from "../components/CopyButton";
// import WalletHistory from "../components/DashboardWalletComponents/WalletHistoryList";
import { useModalStore } from "../zustand/useModalStore";
import AddFundAmount from "../components/DashboardHomeComponents/AddFundAmount";
import { useGetUserWalletdata, useResolveVirtualAccount } from "../data/hooks";
import { formatPrice } from "../data/utils";
import TransactionsList from "../components/DashboardTransactionComponents/TransactionsList";
import ApiErrorBlock from "../components/ApiErrorBlock";
import SmallLoader from "../components/SmallLoader";
import { IoInformationCircle } from "react-icons/io5";
import WalletHistoryList from "../components/DashboardWalletComponents/WalletHistoryList";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useToastStore } from "../zustand/useToastStore";
import { createPortal } from "react-dom";
import { useState } from "react";

const WalletScreen = () => {
  const query = useQueryClient();
  const [showWarning, setShowWarning] = useState(false);
  const isFetchingWallet =
    useIsFetching({
      queryKey: ["user-wallet"],
    }) > 0;
  const openModal = useModalStore((state) => state.openModal);
  const { showToast } = useToastStore();
  const { mutate: generateVirtualAccount, isPending: generating } =
    useResolveVirtualAccount();
  const startFundWallet = () => {
    openModal(<AddFundAmount goBack={startFundWallet} />);
  };
  const { data, isLoading, isError } = useGetUserWalletdata();

  const handleFundWalletClick = () => {
    if (!hasVA) {
      setShowWarning(true);
    } else {
      startFundWallet();
    }
  };

  if (isError) {
    return <ApiErrorBlock />;
  }
  if (isLoading) {
    return <SmallLoader />;
  }
  const transactions = data?.user_transactions ?? [];
  let hasVA = true;
  if (!data?.virtual_account || !data?.virtual_account.account_number) {
    hasVA = false;
  }
  const refreshWalletBalance = () => {
    query.invalidateQueries({
      queryKey: ["user-wallet"],
    });
    showToast("Refreshing wallet balance", "success");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Warning Popup Modal */}
      {showWarning &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowWarning(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowWarning(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ooops!</h3>
                <p className="text-gray-600 mb-6">
                  You cannot fund your wallet until virtual account number is
                  generated. Click the "Generate Virtual Account" Button to
                  generate your virtual account now
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    label="Generate"
                    onClick={() => {
                      generateVirtualAccount();
                      setShowWarning(false);
                    }}
                    className="px-3 py-1 text-sm"
                  />
                  <Button
                    label="Close"
                    onClick={() => setShowWarning(false)}
                    className=" text-sm !bg-gray-200 !text-gray-800 hover:!bg-gray-300 px-3 py-1"
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:row-span-2 col-span-2 md:col-span-1 p-6 rounded-3xl flex flex-col gap-4 justify-between items-center">
          <p className="text-xs">My Wallet</p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold">
              {" "}
              {formatPrice(data?.wallet_balance ?? 0)}{" "}
            </p>
            <div
              className="bg-white rounded-full p-2 cursor-pointer hover:bg-white/50"
              onClick={refreshWalletBalance}
            >
              <RefreshCcw
                size={25}
                className={`${isFetchingWallet ? "animate-spin" : ""}`}
              />
            </div>
          </div>
          <p className="text-xs">Wallet balance</p>
          <Button
            label="Fund Wallet"
            className="!w-fit px-12 py-3 text-xs"
            onClick={handleFundWalletClick}
          />
          <p className="text-xs bg-gray-200 px-6 py-1 rounded-full">
            {data?.total_property} active contracts
          </p>
        </div>
        <div className="relative overflow-hidden md:row-span-2 col-span-2 md:col-span-1 p-10 bg-white rounded-3xl flex flex-col gap-4 justify-between">
          {(!hasVA || generating) && (
            <div className="absolute inset-0 bg-white/90 flex justify-center items-center">
              <Button
                label="Generate Virtual Account"
                loadingText="Generating Account"
                isLoading={generating}
                disabled={generating}
                onClick={() => generateVirtualAccount()}
                className="!w-[80%] md:!w-[60%] text-sm"
              />
            </div>
          )}
          <p className="text-md font-semibold">Wallet Details</p>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <p className="text-sm">
                {data?.virtual_account?.account_number || "Not Available"}
              </p>
              <p className="text-[9px] text-gray-400">Account Number</p>
            </div>
            <CopyButton text={data?.virtual_account?.account_number || ""} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              {data?.virtual_account?.account_bank || "Not Available"}
            </p>
            <p className="text-[9px] text-gray-400">Bank Name</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              {" "}
              {data?.virtual_account?.account_name || "Not Available"}{" "}
            </p>
            <p className="text-[9px] text-gray-400">Account Name</p>
          </div>
          <div className="flex items-center gap-1 ">
            <IoInformationCircle className="text-gray-400" />
            <span className="text-xs text-gray-400">
              Note: withdrawals from virtual account cannot be made.
            </span>
          </div>
        </div>
      </div>
      <WalletHistoryList
        data={transactions}
        type="transaction"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default WalletScreen;
