import { useGetUserTransactions } from "../data/hooks";
import { Transaction } from "../data/types/userTransactionsTypes";
import TransactionsList from "../components/DashboardTransactionComponents/TransactionsList";
import { formatPrice } from "../data/utils";
import { useState } from "react";
import Pagination from "../components/Pagination";

const TransactionsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetUserTransactions(page);
  const totalPages = data?.user_transactions.last_page || 0;
  const transactions: Transaction[] = data?.user_transactions?.data ?? [];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col col-span-2 md:col-span-1 items-center h-fit">
          <p className="text-gray-400 text-sm">Wallet Balance</p>
          <p className="font-bold truncate">
            {formatPrice(data?.wallet_balance || 0)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="font-bold truncate">
            {formatPrice(data?.total_invoice ?? 0)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="font-bold truncate">
            {" "}
            {formatPrice(data?.total_amount_paid || 0)}{" "}
          </p>
        </div>
      </div>
      <TransactionsList
        data={transactions}
        isLoading={isLoading}
        type="payment"
        isError={isError}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!data?.user_transactions.prev_page_url}
        hasNext={!!data?.user_transactions.next_page_url}
      />
    </div>
  );
};

export default TransactionsPage;
