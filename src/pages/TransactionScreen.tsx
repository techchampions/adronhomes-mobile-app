// pages/TransactionsPage.tsx
import React from "react";
import ReusableList, { ListItem } from "../components/ReusableList";
import TransactionsList, {
  TransactionItem,
} from "../components/DashboardTransactionComponents/TransactionsList";

const transactions: TransactionItem[] = [
  {
    id: 1,
    title: "Wallet Top up",
    date: "March 18th, 2020",
    status: "Completed",
    amount: "₦15,000,000",
  },
  {
    id: 2,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 3,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 4,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Pending",
    amount: "₦10,000,000",
  },
  {
    id: 5,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Pending",
    amount: "₦10,000,000",
  },
  {
    id: 6,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 7,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  {
    id: 8,
    title: "Amanda Suites & Gardens Payment",
    date: "March 18th, 2020",
    status: "Failed",
    amount: "₦10,000,000",
  },
  // ...more
];

const TransactionsPage = () => {
  const renderStatusBadge = (status?: string) => {
    const colorMap: Record<string, string> = {
      Completed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Failed: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full ${colorMap[status ?? ""]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Wallet Balance</p>
          <p className="font-bold">₦76,000,000</p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="font-bold">₦170,000,000</p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="font-bold">₦61,000,000</p>
        </div>
      </div>
      <TransactionsList data={transactions} />
    </div>
  );
};

export default TransactionsPage;
