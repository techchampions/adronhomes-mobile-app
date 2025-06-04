import { useGetUserTransactions } from "../data/hooks";
import { Transaction } from "../data/types/userTransactionsTypes";
import TransactionsList from "../components/DashboardTransactionComponents/TransactionsList";
import { formatPrice } from "../data/utils";

const TransactionsPage = () => {
  const { data, isLoading, isError } = useGetUserTransactions();
  const transactions: Transaction[] = data?.user_transactions?.data ?? [];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl flex flex-col col-span-2 md:col-span-1 items-center h-fit">
          <p className="text-gray-400 text-sm">Wallet Balance</p>
          <p className="font-bold">{formatPrice(data?.wallet_balance || 0)}</p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="font-bold">{formatPrice(data?.total_invoice ?? 0)}</p>
        </div>
        <div className="p-4 bg-white rounded-3xl flex flex-col items-center h-fit">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="font-bold">
            {" "}
            {formatPrice(data?.total_amount_paid || 0)}{" "}
          </p>
        </div>
      </div>
      <TransactionsList
        data={transactions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default TransactionsPage;
