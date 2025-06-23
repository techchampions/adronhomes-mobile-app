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
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetPropertyPlanByID(id ?? "");
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
  const transactions: Transaction[] = data?.transactions ?? [];
  const infrastructureBreakDown = data?.infrastructure_break_down || [];
  const OtherFeesBreakDown = data?.others_fee_break_down || [];
  const paymentProgress = data?.plan_properties.payment_percentage || 0;
  const infrastructureProgress =
    data?.plan_properties.infrastructure_percentage || 0;
  const otherFeeProgress = data?.plan_properties.other_percentage || 0;
  console.log("other", OtherFeesBreakDown);
  const handleViewProperty = () => {
    navigate(`/properties/${data?.plan_properties.property.id}`);
  };
  const makePaymentForProperty = () => {
    resetPaymentDetails();
    setPaymentDetails({
      planId: data?.plan_properties.id,
    });
    console.log("plan ID", data?.plan_properties.id, "Plan ID state", planId);
    openModal(
      <InputAmount
        goBack={makePaymentForProperty}
        repaymentAmount={data?.next_repayment.amount}
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
        // infrastructureAmount={0}
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
        // infrastructureAmount={0}
        purpose="other"
      />
    );
  };
  const viewPaymentList = () => {
    navigate(`/my-property/payment-list/${id}`);
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
                  <div className="py-1 px-3 rounded-lg bg-white/20 text-sm text-white">
                    {data?.plan_properties.number_of_unit} units
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
              {paymentProgress >= 100 ? (
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
              ) : (
                <Button
                  onClick={makePaymentForProperty}
                  label="Make Payment"
                  className="mt-5 bg-white !text-adron-green !w-fit px-6 text-sm"
                />
              )}
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
                {infrastructureProgress >= 100 ? (
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
                {otherFeeProgress >= 100 ? (
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
                    <p className="text-sm font-bold">
                      {" "}
                      {formatPrice(item.value || 0)}{" "}
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
                    <p className="text-sm font-bold">
                      {" "}
                      {formatPrice(item.value || 0)}{" "}
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

      <TransactionsList
        data={transactions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default MyPropertyDetail;
