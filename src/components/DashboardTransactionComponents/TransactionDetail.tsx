import CopyButton from "../CopyButton";
import Button from "../Button";
import { useGetTransactionByID } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import { formatPrice } from "../../data/utils";
import { TransactionStatus } from "../../data/types/userTransactionsTypes";
import SmallLoader from "../SmallLoader";

const TransactionDetail = ({ id }) => {
  const { data, isLoading, isError } = useGetTransactionByID(id);
  if (isLoading) {
    return <SmallLoader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }

  const renderStatusBadge = (status: TransactionStatus) => {
    const statusMap: Record<
      TransactionStatus,
      { label: string; style: string }
    > = {
      1: {
        label: "Completed",
        style: "bg-adron-green",
      },
      2: { label: "Failed", style: "bg-red-600" },
      0: {
        label: "Pending",
        style: "bg-gray-600",
      },
    };

    const { label, style } = statusMap[status];

    return (
      <div className="flex gap-1 items-center">
        <span className={`h-2 w-2 rounded-full ${style}`}></span>
        {label}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <h4 className="absolute top-4 left-4 font-bold text-lg">
        Transaction Details
      </h4>
      <div className="flex flex-col divide-y divide-gray-200 mt-5">
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">From</p>
            <p className="font-bold text-xs">
              {data?.user_transaction.transaction_method}
            </p>
            {/* <p className="font-bold text-xs">(Polaris Bank)</p> */}
          </div>
          <img src="/mika.png" alt="" className="h-7 w-7" />
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Description</p>
            <p className="font-bold text-xs">
              {data?.user_transaction.description}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Transaction Type</p>
            <p className="font-bold text-xs">
              {/* {data?.user_transaction.transaction_type == "1"
                ? "Scheduled Payment"
                : "Wallet Funding"} */}
              {data?.user_transaction.transaction_type}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Payment Method</p>
            <p className="font-bold text-xs">
              {data?.user_transaction.transaction_method}
            </p>
          </div>
          <div className="flex flex-col text-left">
            <p className="text-gray-400 text-xs">Fees</p>
            <p className="font-bold text-xs">
              {formatPrice(data?.user_transaction.amount ?? 0)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Transaction Reference</p>
            <p className="font-bold text-xs">01hws5tdgy677782hdgeg3</p>
          </div>
          <CopyButton text="01hws5tdgy677782hdgeg3" />
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs">Status</p>
            <p className="font-bold text-xs ">
              {/* {" "}
              <span className="bg-adron-green h-2 w-2 rounded-full"></span>{" "}
              Completed */}
              {renderStatusBadge(data?.user_transaction.status ?? 2)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          label="Share"
          className="bg-transparent !text-black !w-fir px-6 text-xs"
        />
        <Button label="Download" className="bg-black !w-fir px-6 text-xs" />
      </div>
    </div>
  );
};

export default TransactionDetail;
