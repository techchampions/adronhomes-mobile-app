import React from "react";
// types.ts
type Transaction = {
  id: number;
  name: string;
  date: string;
  amount: string;
  isHighlighted?: boolean;
};

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    amount: "₦170,000,000",
  },
  {
    id: 2,
    name: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    amount: "₦170,000,000",
  },
  {
    id: 3,
    name: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    amount: "₦170,000,000",
  },
  {
    id: 4,
    name: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    amount: "₦170,000,000",
  },
  {
    id: 5,
    name: "Amade Suites & Gardens Payment",
    date: "March 18th, 20:00",
    amount: "₦170,000,000",
  },
];

const TransactionsList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-400">Transactions</h4>
        <button className="text-xs px-4 py-1.5 text-adron-green font-bold">
          View All
        </button>
      </div>

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li className="p-4 rounded-3xl flex justify-between items-center even:bg-gray-100">
            <div>
              <p className="font-semibold text-gray-500 text-sm">{t.name}</p>
              <p className="text-xs text-gray-500">{t.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-black text-sm">{t.amount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
