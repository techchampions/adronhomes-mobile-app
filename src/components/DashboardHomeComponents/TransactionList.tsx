import React from "react";
import { useModalStore } from "../../zustand/useModalStore";
import TransactionDetail from "../DashboardTransactionComponents/TransactionDetail";
import { Transaction } from "../../data/types/userTransactionsTypes";
import { formatDate, formatPrice } from "../../data/utils";
import SmallLoader from "../SmallLoader";
import ApiErrorBlock from "../ApiErrorBlock";
import NotFound from "../NotFound";
// types.ts
type Props = {
  data: Transaction[];
  isLoading: boolean;
  isError: boolean;
};

const TransactionsList: React.FC<Props> = ({ data, isLoading, isError }) => {
  const { openModal } = useModalStore();
  const renderList = () => {
    return (
      <ul className="space-y-2">
        {data.map((t) => (
          <li
            className="p-4 gap-2 cursor-pointer rounded-3xl flex justify-between items-center even:bg-gray-100"
            onClick={() => openModal(<TransactionDetail id={t.id} />)}
          >
            <div className="w-[70%]">
              <p className="font-semibold text-gray-500 text-xs md:text-sm truncate">
                {t.description}
                {/* {t.property?.name} */}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(t.created_at ?? "")}
              </p>
            </div>
            <div className="text-right w-[27%]">
              <p className="font-bold text-black text-sm truncate">
                {formatPrice(t.amount || t.amount_paid)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  const renderContent = () => {
    if (isLoading) {
      return <SmallLoader />;
    }

    if (isError) {
      return (
        <div className="text-center py-4">
          <ApiErrorBlock />
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-4">
          <NotFound />
        </div>
      );
    }

    return renderList();
  };
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-400">Transactions</h4>
        {/* <button className="text-xs px-4 py-1.5 text-adron-green font-bold">
          View All
        </button> */}
      </div>
      {renderContent()}
    </div>
  );
};

export default TransactionsList;
