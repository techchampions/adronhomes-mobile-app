import { useEffect, useState } from "react";
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
import { usePaymentBreakDownStore } from "../zustand/PaymentBreakDownStore";
import InlineLoader from "../components/InlineLoader";
import useEmblaCarousel from "embla-carousel-react";

import RequestDocument from "../components/DashboardNewPropertyComponent/RequestDocument";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import InputInfrastructureAmount from "../components/DashboardMyPropertyComponents/InputAmount";
import CopyButton from "../components/CopyButton";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import MyPlanPaymentHistory from "../components/DashboardMyPropertyComponents/MyPropertyPaymentHistory";
import SelectPaymentMethod from "../components/DashboardMyPropertyComponents/SelectPaymentMethod";
import DownloadPropertyDocuments from "../components/DashboardMyPropertyComponents/DownloadPropertyDocuments";

const MyPropertyDetail = () => {
  // const { data, isLoading, isError } = useGetUserTransactions();

  // Embla Carousel Config
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const updateButtons = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };

    updateButtons();
    embla.on("select", updateButtons);
    embla.on("reInit", updateButtons);
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  const [requested, setRequested] = useState(false);
  const { setPaymentDetails, resetPaymentDetails, planId } =
    usePaymentBreakDownStore();
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetPropertyPlanByID(id ?? "");
  const boughtUnits = data?.plan_properties.number_of_unit || 0;
  useEffect(() => {
    if (
      data?.plan_properties.payment_percentage === 100 &&
      data?.plan_properties.infrastructure_percentage === 100 &&
      data?.plan_properties.other_percentage === 100
    ) {
      openModal(<RequestDocument />);
    }
  }, [data?.plan_properties.payment_percentage, openModal]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }
  const transactions: Transaction[] = data?.transactions.data ?? [];
  const infrastructureBreakDown = data?.infrastructure_break_down || [];
  const OtherFeesBreakDown = data?.others_fee_break_down || [];
  const paymentProgress = data?.plan_properties.payment_percentage || 0;
  const repaymentAmt = data?.next_repayment?.amount || 0;
  const infrastructureProgress =
    data?.plan_properties.infrastructure_percentage || 0;
  const otherFeeProgress = data?.plan_properties.other_percentage || 0;
  const handleViewProperty = () => {
    navigate(`/dashboard/properties/${data?.plan_properties.property.slug}`);
  };
  const completeInitialPropertyPayment = () => {
    resetPaymentDetails();
    setPaymentDetails({
      planId: data?.plan_properties.id,
    });
    openModal(
      <SelectPaymentMethod
        amount={data?.plan_properties.paid_amount || 0}
        user_property_id={data?.user_property.id || 0}
        payment_type={Number(data?.plan_properties.payment_type)}
        goBack={closeModal}
      />
    );
  };
  const makePaymentForProperty = () => {
    resetPaymentDetails();
    setPaymentDetails({
      planId: data?.plan_properties.id,
    });
    openModal(
      <InputAmount
        goBack={makePaymentForProperty}
        repaymentAmount={repaymentAmt}
        dueDate={data?.next_repayment.due_date}
      />
    );
  };
  const makeInfrastructurePayment = () => {
    resetPaymentDetails();
    // setPaymentDetails({
    //   planId: data?.plan_properties.id,
    // });
    openModal(
      <InputInfrastructureAmount
        goBack={makeInfrastructurePayment}
        planID={data?.plan_properties.id}
        type="infrastructure"
        purpose="infrastructure"
      />
    );
  };
  const makeOtherFeesPayment = () => {
    resetPaymentDetails();
    // setPaymentDetails({
    //   planId: data?.plan_properties.id,
    // });
    openModal(
      <InputInfrastructureAmount
        goBack={makeInfrastructurePayment}
        planID={data?.plan_properties.id}
        type="other"
        purpose="others"
      />
    );
  };
  const viewPaymentList = () => {
    navigate(`/dashboard/my-property/payment-list/${id}`);
  };
  const handleDownload = () => {
    openModal(
      <DownloadPropertyDocuments
        contractDocuments={data?.contract_documents || []}
      />
    );
    // if (data?.contract_documents) {
    //   const link = document.createElement("a");
    //   link.href = data.contract_documents;
    //   link.download = "property-document.pdf";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
  };
  const renderButton = () => {
    const docLength = data?.contract_documents.length || 0;
    if (data?.payment.status === 0) {
      if (data.payment.payment_type === "Bank Transfer") {
        return (
          <div className="flex items-center gap-1 text-white/50">
            <BsFillExclamationCircleFill />
            <span className="text-xs">
              Please wait... Payment is being confirmed.
            </span>
          </div>
        );
      }
      if (data.payment.payment_type === "Paystack") {
        return (
          <div className="space-y-1">
            <Button
              onClick={completeInitialPropertyPayment}
              label="Complete Initial Payment"
              className="mt-0 bg-white !text-adron-green !w-fit px-6 text-sm"
            />
            <div className="flex items-center gap-1 text-white/50">
              <BsFillExclamationCircleFill />
              <span className="text-xs">
                Your Paystack Payment was not completed... Try again.
              </span>
            </div>
          </div>
        );
      }
    }
    if (data?.payment.status === 1) {
      if (data.contract.unique_contract_id) {
        if (paymentProgress === 100) {
          if (docLength > 0) {
            return (
              <div className="flex items-center text-white gap-4">
                <div className="flex items-center gap-1">
                  <Button
                    label="Download Document"
                    onClick={handleDownload}
                    className=" bg-white !text-adron-green !w-fit px-6 text-sm"
                  />
                </div>
              </div>
            );
          }
          return (
            <div className="flex items-center text-white gap-4">
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-white" />
                <span className="text-sm text-white/50">
                  Payment Complete, Documents are being prepared...
                </span>
              </div>
            </div>
          );
        }
        return (
          <Button
            onClick={makePaymentForProperty}
            label="Make Payment"
            className="bg-white !text-adron-green !w-fit px-6 text-sm"
          />
        );
      }
      return (
        <div className="flex items-center text-white/70 px-2 text-sm gap-2">
          <BsFillExclamationCircleFill />
          <span>Sorry, this contract is not yet active</span>
        </div>
      );
    }
    if (!data?.contract?.unique_contract_id) {
      return (
        <div className="flex items-center text-white/70 px-2 text-sm gap-2">
          <InlineLoader />
          <span>Contract is not yet Active</span>
        </div>
      );
    } else if (paymentProgress === 100 && docLength > 0) {
      return (
        <div className="flex items-center text-white gap-4">
          <div className="flex items-center gap-1">
            <Button
              label="Download Document"
              onClick={handleDownload}
              className=" bg-white !text-adron-green !w-fit px-6 text-sm"
            />
          </div>
        </div>
      );
    } else if (paymentProgress === 100) {
      return (
        <div className="flex items-center text-white gap-4">
          <div className="flex items-center gap-1">
            <FaCheckCircle className="text-white" />
            <span className="text-sm text-white/50">Payment Complete</span>
          </div>
        </div>
      );
    } else if (
      paymentProgress === 100 &&
      infrastructureProgress === 100 &&
      otherFeeProgress === 100
    ) {
      return (
        <div className="flex items-center mb-5 gap-2 text-white">
          <Button label="Download Document" onClick={handleDownload} />
          <InlineLoader />
          <p className="text-sm">Documents are being prepared</p>
        </div>
      );
    } else if (
      data?.payment.payment_type === "Bank Transfer" &&
      data.payment.status === 0
    ) {
      return (
        <div className="flex items-center gap-1 text-white/50">
          <BsFillExclamationCircleFill />
          <span className="text-xs">
            Please wait... Payment is being confirmed.
          </span>
        </div>
      );
    } else if (
      data?.payment.payment_type === "Bank Transfer" &&
      data.payment.status === 2
    ) {
      return (
        <div className="space-y-1">
          <Button
            onClick={completeInitialPropertyPayment}
            label="Complete Initial Payment"
            className="mt-0 bg-white !text-adron-green !w-fit px-6 text-sm"
          />
          <div className="flex items-center gap-1 text-white/50">
            <BsFillExclamationCircleFill />
            <span className="text-xs">
              Sorry, Your Payment was disapproved... Try again.
            </span>
          </div>
        </div>
      );
    } else if (
      data?.payment.payment_type === "Paystack" &&
      data.payment.status === 0
    ) {
      return (
        <div className="space-y-1">
          <Button
            onClick={completeInitialPropertyPayment}
            label="Complete Initial Payment"
            className="mt-0 bg-white !text-adron-green !w-fit px-6 text-sm"
          />
          <div className="flex items-center gap-1 text-white/50">
            <BsFillExclamationCircleFill />
            <span className="text-xs">
              Your Paystack Payment was not completed... Try again.
            </span>
          </div>
        </div>
      );
    } else if (
      data?.payment.payment_type === "Paystack" &&
      data.payment.status === 2
    ) {
      return (
        <div className="space-y-1">
          <Button
            onClick={completeInitialPropertyPayment}
            label="Complete Initial Payment"
            className="mt-0 bg-white !text-adron-green !w-fit px-6 text-sm"
          />
          <div className="flex items-center gap-1 text-white/50">
            <BsFillExclamationCircleFill />
            <span className="text-xs">
              Your Paystack Payment Failed... Try again.
            </span>
          </div>
        </div>
      );
    } else if (data?.payment.status === 1) {
      return (
        <Button
          onClick={makePaymentForProperty}
          label="Make Payment"
          className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
        />
      );
    } else {
      return (
        <Button
          onClick={makePaymentForProperty}
          label="Make Payment"
          className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
        />
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col md:flex-row bg-adron-green rounded-3xl overflow-hidden">
        <div
          className="relative overflow-hidden flex w-full md:w-[60%]"
          ref={emblaRef}
        >
          {canScrollPrev && (
            <button
              className="absolute z-50 left-1 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
              onClick={scrollPrev}
            >
              <FaChevronLeft size={20} />
            </button>
          )}
          {canScrollNext && (
            <button
              className="absolute z-50 right-1 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
              onClick={scrollNext}
            >
              <FaChevronRight size={20} />
            </button>
          )}

          <div className="flex space-x-4 w-full">
            <div className="flex flex-col flex-[0_0_100%] w-full gap-4 px-4 md:px-14 py-8">
              {/* Progress Bar */}
              <div className="mt-5 space-y-4">
                <div className="flex w-full justify-between items-center">
                  <p className="text-xs text-white/80">Property Payment</p>
                  {/* <div className="py-1 px-3 rounded-lg bg-white/20 text-sm text-white">
                    {data?.plan_properties.number_of_unit} units
                  </div> */}
                  <div className="bg-white/20 rounded-xl px-4 py-1 gap-1 flex flex-col">
                    <div className="flex justify-between w-full gap-4">
                      <p className="text-[10px] text-white">Contract ID</p>
                      <CopyButton
                        text={data?.contract?.unique_contract_id || ""}
                        className="text-white"
                      />
                    </div>
                    <p className="text-xs text-white">
                      {data?.contract?.unique_contract_id || "No contract ID"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-baseline text-sm mt-2 w-fit text-white">
                  <span className="text-white text-2xl md:text-4xl">
                    {formatPrice(data?.plan_properties.paid_amount ?? 0)}
                  </span>
                  /
                  <span className="text-white/50 text-sm md:text-md">
                    {formatPrice(data?.plan_properties.total_amount ?? 0)}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-green-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-3xl"
                    style={{
                      width: `${
                        data?.plan_properties.payment_percentage ?? 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              {renderButton()}
              {/* {paymentProgress >= 100 ? (
                infrastructureProgress >= 100 && otherFeeProgress >= 100 ? (
                  <div className="flex items-center mb-5 gap-2 text-white">
                    <InlineLoader />
                    <p className="text-sm">Documents are being prepared</p>
                  </div>
                ) : (
                  <div className="flex items-center text-white gap-4">
                    <div className="flex items-center gap-1">
                      <FaCheckCircle className="text-white" />
                      <span className="text-sm text-white/50">
                        Payment Complete
                      </span>
                    </div>
                  </div>
                )
              ) : data?.plan_properties.status === 1 ? (
                <Button
                  onClick={makePaymentForProperty}
                  label="Make Payment"
                  className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
                />
              ) : data?.plan_properties.payment_method === "paystack" ? (
                <Button
                  onClick={completeInitialPropertyPayment}
                  label="Complete Initial Payment"
                  className="mt-0 bg-white !text-adron-green !w-fit px-6 text-sm"
                />
              ) : (
                <div className="flex items-center gap-1 text-white/50">
                  <BsFillExclamationCircleFill />
                  <span className="text-xs">
                    Please wait... Payment is being confirmed.
                  </span>
                </div>
              )} */}
              <div className="flex bg-white/20 justify-between p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-white">
                    {data?.plan_properties.payment_percentage === 100 ? (
                      "Payment Complete"
                    ) : data?.plan_properties.repayment_schedule ? (
                      `${data.plan_properties.repayment_schedule}`
                    ) : (
                      <InlineLoader />
                    )}
                  </p>
                  <p className="text-xs text-white">Payment Schedule</p>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <p className="text-sm text-white">
                    {data?.plan_properties.payment_percentage === 100
                      ? "Payment Complete"
                      : formatDate(
                          data?.plan_properties.next_payment_date ??
                            "Loading..."
                        )}
                  </p>
                  <p className="text-xs text-white">Next Payment</p>
                </div>
              </div>
            </div>
            {infrastructureBreakDown && (
              <div className="flex flex-col flex-[0_0_100%] w-full gap-4 px-4 md:px-14 p-8">
                {/* Progress Bar */}
                <div className="mt-5 space-y-4">
                  <p className="text-xs text-white/80">Infrastructure Fees</p>
                  <div className="flex justify-between items-baseline text-sm mt-2 w-fit text-white">
                    <span className="text-white text-2xl md:text-4xl">
                      {formatPrice(
                        data?.plan_properties.paid_infrastructure_amount ?? 0
                      )}
                    </span>
                    /
                    <span className="text-white/50 text-sm md:text-md">
                      {formatPrice(
                        data?.plan_properties.infrastructure_amount || 0
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-green-900/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-3xl"
                      style={{
                        width: `${
                          data?.plan_properties.infrastructure_percentage ?? 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                {!data?.contract?.unique_contract_id ? (
                  <div className="flex items-center text-white/70 px-2 text-sm gap-2">
                    <InlineLoader />
                    <span>this contract is not yet Active</span>
                  </div>
                ) : infrastructureProgress >= 100 ? (
                  paymentProgress >= 100 && otherFeeProgress >= 100 ? (
                    <div className="flex items-center mb-5 gap-2 text-white">
                      <InlineLoader />
                      <p className="text-sm">Documents are being prepared</p>
                    </div>
                  ) : (
                    <div className="flex items-center text-white gap-4">
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-white" />
                        <span className="text-sm text-white/50">
                          Payment Complete
                        </span>
                      </div>
                    </div>
                  )
                ) : (
                  <Button
                    onClick={makeInfrastructurePayment}
                    label="Make Payment"
                    className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
                  />
                )}
                <div className="flex bg-white/10 invisible justify-between p-4 rounded-2xl">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">
                      {data?.plan_properties.infrastructure_percentage === 100
                        ? "Payment Complete"
                        : "View Payment Breakdown"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <p className="text-sm text-white">
                      {data?.plan_properties.infrastructure_percentage === 100
                        ? "Payment Complete"
                        : formatDate(
                            data?.plan_properties.start_date ?? "Loading..."
                          )}
                    </p>
                    <p className="text-xs text-white">Last Payment</p>
                  </div>
                </div>
              </div>
            )}
            {OtherFeesBreakDown && (
              <div className="flex flex-col flex-[0_0_100%] w-full gap-4 px-4 md:px-14 p-8">
                {/* Progress Bar */}
                <div className="mt-5 space-y-4">
                  <p className="text-xs text-white/80">Other Fees</p>
                  <div className="flex justify-between items-baseline text-sm mt-2 w-fit text-white">
                    <span className="text-white text-2xl md:text-4xl">
                      {formatPrice(
                        data?.plan_properties.paid_other_amount ?? 0
                      )}
                    </span>
                    /
                    <span className="text-white/50 text-sm md:text-md">
                      {formatPrice(data?.plan_properties.other_amount ?? 0)}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-green-900/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-3xl"
                      style={{
                        width: `${
                          data?.plan_properties.other_percentage ?? 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                {!data?.contract?.unique_contract_id ? (
                  <div className="flex items-center text-white/70 px-2 text-sm gap-2">
                    <InlineLoader />
                    <span>this contract is not yet Active</span>
                  </div>
                ) : otherFeeProgress >= 100 ? (
                  infrastructureProgress >= 100 && paymentProgress >= 100 ? (
                    <div className="flex items-center mb-5 gap-2 text-white">
                      <InlineLoader />
                      <p className="text-sm">Documents are being prepared</p>
                    </div>
                  ) : (
                    <div className="flex items-center text-white gap-4">
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-white" />
                        <span className="text-sm text-white/50">
                          Payment Complete
                        </span>
                      </div>
                    </div>
                  )
                ) : (
                  <Button
                    onClick={makeOtherFeesPayment}
                    label="Make Payment"
                    className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
                  />
                )}
                <div className="flex bg-white/10 invisible justify-between p-4 rounded-2xl">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white">
                      {data?.plan_properties.other_percentage === 100
                        ? "Payment Complete"
                        : "View Payment Breakdown"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <p className="text-sm text-white">
                      {data?.plan_properties.other_percentage === 100
                        ? "Payment Complete"
                        : formatDate(
                            data?.plan_properties.start_date ?? "Loading..."
                          )}
                    </p>
                    <p className="text-xs text-white">Last Payment</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex relative w-full md:w-[40%] bg-[#44691B] rounded-3xl md:rounded-none p-4 md:p-2">
          {selectedIndex === 0 ? (
            <div className="w-full max-w-[472px] mx-auto overflow-hidden relative z-10">
              <div className="flex flex-row items-start justify-between">
                <div className="relative w-[50%] h-[120px] p-6 md:h-[150px] overflow-hidden">
                  <img
                    src={data?.plan_properties.property.display_image}
                    alt="s"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                <div className="p-6">
                  <div className="py-1 px-3 rounded-lg bg-white/20 text-sm text-white">
                    x {data?.plan_properties.number_of_unit} units
                  </div>
                </div>
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

                      <span className="mr-1">
                        {data?.plan_properties.property.size} Sq M
                      </span>
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
          ) : selectedIndex === 1 ? (
            <div className="w-full mx-auto overflow-hidden relative z-10 flex items-center">
              <div className="flex max-h-[300px] overflow-y-scroll scrollbar-hide p-4 flex-col gap-3 w-full text-white">
                <p className="text-lg text-white">
                  Infrastructure Fees Breakdown
                </p>
                {infrastructureBreakDown.map((item) => (
                  <div className="flex justify-between items-center">
                    <p className="text-xs">{item.name}:</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      {" "}
                      {formatPrice(item.value || 0)}
                      {boughtUnits > 1 && (
                        <span className="bg-white/20 p-1 rounded-full text-[9px]">
                          x {boughtUnits}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center bg-white/30 text-white py-5 px-5 rounded-3xl mt-5">
                  <p className="text-sm font-bold ">Total:</p>
                  <p className="text-md font-bold">
                    {" "}
                    {formatPrice(
                      data?.plan_properties.infrastructure_amount || 0
                    )}{" "}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full mx-auto overflow-hidden relative z-10 flex items-center">
              <div className="flex max-h-[300px] overflow-y-scroll scrollbar-hide p-4 flex-col gap-3 w-full text-white">
                <p className="text-lg text-white">Other Fees Breakdown</p>
                {OtherFeesBreakDown.map((item) => (
                  <div className="flex justify-between items-center">
                    <p className="text-xs">{item.name}:</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      {" "}
                      {formatPrice(item.value || 0)}
                      {boughtUnits > 1 && (
                        <span className="bg-white/20 p-1 rounded-full text-[9px]">
                          x {boughtUnits}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center bg-white/30 text-white py-5 px-5 rounded-3xl mt-5">
                  <p className="text-sm font-bold ">Total:</p>
                  <p className="text-md font-bold">
                    {" "}
                    {formatPrice(data?.plan_properties.other_amount || 0)}{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
          <img
            src="/images/referNearn-bg.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>

      {/* Payment Schedule List */}
      {data?.plan_properties.payment_type === "2" && (
        <div className=" flex flex-col md:flex-row gap-3 justify-between md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
          <div className="flex flex-col w-full md:w-[60%]">
            <h4 className=" font-bold text-md">Payment List</h4>
            <p className="text-gray-400 text-xs">
              Click <span className="font-bold">‘view list’</span> to see a list
              of all scheduled payments available for your property payment
              plan. This is helpful if you have missed some payments int the
              past.{" "}
            </p>
          </div>

          <Button
            label="View List"
            className="bg-black text-white font-bold !w-[155px] text-xs"
            onClick={viewPaymentList}
          />
        </div>
      )}

      <MyPlanPaymentHistory
        data={transactions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default MyPropertyDetail;
