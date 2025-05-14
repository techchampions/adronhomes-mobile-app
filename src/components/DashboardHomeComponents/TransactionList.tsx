import React from "react";
import { useModalStore } from "../../zustand/useModalStore";
import TransactionDetail from "../DashboardTransactionComponents/TransactionDetail";
import { Transaction } from "../../data/types/userTransactionsTypes";
import { formatPrice } from "../../data/utils";
// types.ts
type Props = {
  data: Transaction[];
  isLoading: boolean;
  isError: boolean;
};

const TransactionsList: React.FC<Props> = ({ data, isLoading, isError }) => {
  const { openModal } = useModalStore();
  return (
    <div className="bg-white p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-400">Transactions</h4>
        <button className="text-xs px-4 py-1.5 text-adron-green font-bold">
          View All
        </button>
      </div>

      <ul className="space-y-2">
        {data.map((t) => (
          <li
            className="p-4 cursor-pointer rounded-3xl flex justify-between items-center even:bg-gray-100"
            onClick={() => openModal(<TransactionDetail id={t} />)}
          >
            <div className="w-[70%]">
              <p className="font-semibold text-gray-500 text-xs md:text-sm truncate">
                {t.property.name}
              </p>
              <p className="text-xs text-gray-500">{t.created_at}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-black text-sm">
                {formatPrice(t.amount)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
