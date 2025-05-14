// pages/MyPropertyDetail.tsx
import React from "react";
import TransactionsList from "../components/DashboardTransactionComponents/TransactionsList";
import Button from "../components/Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiStreetLight } from "react-icons/gi";
import { MdOutlinePower } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useModalStore } from "../zustand/useModalStore";
import InputAmount from "../components/PaymentComponents/InputAmount";
import { useGetPropertyPlanByID } from "../data/hooks";
import Loader from "../components/Loader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { formatDate, formatPrice } from "../data/utils";
import { Transaction } from "../data/types/userTransactionsTypes";

const MyPropertyDetail = () => {
  // const { data, isLoading, isError } = useGetUserTransactions();

  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetPropertyPlanByID(id ?? "");
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }
  const transactions: Transaction[] = data?.transactions ?? [];

  const handleViewProperty = () => {
    navigate(`/properties/${data?.plan_properties.property.id}`);
  };
  const makePayment = () => {
    openModal(<InputAmount goBack={makePayment} />);
  };
  const viewPaymentList = () => {
    navigate(`/my-property/${id}/payment-list`);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col md:flex-row bg-adron-green rounded-3xl overflow-hidden">
        <div className="flex flex-col w-full md:w-[60%] gap-4 p-8">
          {/* Progress Bar */}
          <div className="mt-5 space-y-4">
            <div className="flex justify-between items-baseline text-sm mt-2 w-fit text-white">
              <span className="text-white text-4xl">
                {formatPrice(data?.plan_properties.paid_amount ?? 0)}
              </span>
              /
              <span className="text-white/50">
                {formatPrice(data?.plan_properties.property.price ?? 0)}
              </span>
            </div>
            <div className="w-full h-2.5 bg-green-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-3xl"
                style={{
                  width: `${data?.plan_properties.payment_percentage ?? 0}%`,
                }}
              ></div>
            </div>
          </div>
          <Button
            onClick={makePayment}
            label="Make Payment"
            className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
          />
          <div className="flex bg-white/20 justify-between p-4 rounded-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-white">
                {data?.plan_properties.repayment_schedule ?? "loading..."}
              </p>
              <p className="text-xs text-white">Payment Schedule</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p className="text-sm text-white">
                {formatDate(
                  data?.plan_properties.next_payment_date ?? "Loading..."
                )}
              </p>
              <p className="text-xs text-white">Next Payment</p>
            </div>
          </div>
        </div>
        <div className="flex relative w-full md:w-[40%] bg-[#44691B] rounded-3xl md:rounded-none p-4 md:p-2">
          <div className="w-full max-w-[472px] mx-auto overflow-hidden relative z-10">
            <div className="relative w-[50%] h-[120px] p-6 md:h-[150px] overflow-hidden">
              <img
                src={data?.plan_properties.property.display_image}
                alt="s"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>

            <div className="w-full px-6 text-white space-y-5 flex flex-col h-auto">
              <div className="flex-grow space-y-4">
                <h4 className="text-lg font-semibold  line-clamp-1">
                  {data?.plan_properties.property.name ?? "loading..."}
                </h4>
                <div className="flex items-center  text-sm">
                  <HiOutlineLocationMarker className="mr-2 flex-shrink-0" />
                  <p className="truncate">
                    {data?.plan_properties.property.lga},{" "}
                    {data?.plan_properties.property.state}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] ">
                  <div className="flex items-center gap-1">
                    <img
                      src="/ruler.svg"
                      width={14}
                      height={14}
                      alt="ruler"
                      className="brightness-200"
                    />

                    <span className="mr-1">648 Sq M</span>
                  </div>

                  <div className="flex items-center">
                    <GiStreetLight className="h-4 w-4" />
                    <span>Str Lights</span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlinePower className="h-4 w-4" />
                    <span>Electricity</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/dumbbell.svg"
                      width={16}
                      height={16}
                      alt="dumbbell"
                    />
                    <span>Gym</span>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6 items-center">
                  <Button
                    onClick={handleViewProperty}
                    label="View Property"
                    className="bg-transparent text-xs px-4 !w-fit"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/referNearn-bg.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
      <div className=" flex flex-col md:flex-row gap-3 justify-between md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
        <div className="flex flex-col w-full md:w-[60%]">
          <h4 className=" font-bold text-md">Payment List</h4>
          <p className="text-gray-400 text-xs">
            Click <span className="font-bold">‘view list’</span> to see a list
            of all scheduled payments available for your property payment plan.
            This is helpful if you have missed some payments int the past.{" "}
          </p>
        </div>

        <Button
          label="View List"
          className="bg-black text-white font-bold !w-[155px] text-xs"
          onClick={viewPaymentList}
        />
      </div>

      <TransactionsList
        data={transactions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default MyPropertyDetail;
