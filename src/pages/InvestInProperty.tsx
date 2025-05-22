import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import PropertySummary from "../components/PropertySummary";
import DatePickerInput from "../components/DatePickerInput";
import { useEffect, useState } from "react";
import { addMonths } from "date-fns";
import { useModalStore } from "../zustand/useModalStore";
import InputMarketerId from "../components/DashboardNewPropertyComponent/InputMarketerId";
import { usePaymentBreakDownStore } from "../zustand/PaymentBreakDownStore";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SmallLoader from "../components/SmallLoader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { useGetPropertyByID } from "../data/hooks";
import { calculatePaymentDetails } from "../utils/PaymentBreakdownCalculation";
import { useParams } from "react-router-dom";
import { paymentTypeWatcher } from "../utils/PaymentTypeWatcher";

export default function InvestmentForm() {
  const { openModal } = useModalStore();
  const params = useParams();
  const id = params?.id;
  const { setPaymentDetails } = usePaymentBreakDownStore();
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const { data, isError, isLoading } = useGetPropertyByID(id || 0);
  const property = data?.data.properties[0];
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;

  const initialValues = {
    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",
    // marketerId: "",
  };
  const validationSchema = Yup.object({
    ...(selectedPaymentType === "Installment"
      ? {
          paymentDuration: Yup.string().required("Required"),
          paymentSchedule: Yup.string().required("Required"),
          startDate: Yup.date().required("Required"),
          endDate: Yup.date().required("Required"),
          paymentType: Yup.string().required("Required"),
        }
      : {
          paymentType: Yup.string().required("Required"),
        }),

    // marketerId: Yup.string().required("Required"),
  });
  const submit = (values: typeof initialValues) => {
    const { initialDeposit, weeklyAmount, fees, totalAmount } =
      calculatePaymentDetails(values, property);
    const planDetails = {
      paymentType: values.paymentType,
      paymentDuration: values.paymentDuration,
      paymentSchedule: values.paymentSchedule,
      startDate: values.startDate,
      endDate: values.endDate,
      initialDeposit: initialDeposit,
      weeklyAmount: weeklyAmount,
      fees,
      totalAmount,
      // marketerId: values.marketerId,
      propertyId: id,
    };
    setPaymentDetails(planDetails);
    console.log("planDetails", planDetails);
    openModal(<InputMarketerId />);
  };

  // 👇 Component to auto-calculate endDate
  const AutoEndDateUpdater = () => {
    const { values, setFieldValue } = useFormikContext<typeof initialValues>();

    useEffect(() => {
      // const { paymentDuration, startDate } = values;

      // Only calculate if both are available
      if (values.paymentDuration && values.startDate) {
        const months = parseInt(values.paymentDuration);
        if (!isNaN(months)) {
          const newEndDate = addMonths(new Date(values.startDate), months);
          setFieldValue("endDate", newEndDate);
        }
      }
    }, [values.startDate, setFieldValue]);

    return null; // no UI
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, isValid, dirty, setFieldValue }) => {
        const { fees, initialDeposit, weeklyAmount, totalAmount } =
          calculatePaymentDetails(values, property);
        const { SelectedPaymentType } = paymentTypeWatcher(values);
        setSelectedPaymentType(SelectedPaymentType);

        return (
          <Form className="space-y-10">
            <AutoEndDateUpdater /> {/* 👈 place this inside Formik form */}
            {/* Property Summary */}
            <div className=" ">
              <PropertySummary id={id ?? ""} />
            </div>
            {/* Investment Section */}
            <div className="grid grid-cols-1 bg-white md:grid-cols-3 p-8 gap-8 rounded-3xl">
              <div className="md:col-span-2 p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm mb-2">Payment Type</label>
                    <SelectField
                      name="paymentType"
                      placeholder="Select Payment Type"
                      options={["One Time", "Installment"]}
                      onchange={(e) => {
                        setSelectedPaymentType(e.target.value);
                        // setSelectedPaymentType(selected);
                        // setFieldValue("paymentType", selected);

                        // if (selected === "One Time") {
                        //   // Reset other form values when One Time is selected
                        //   setFieldValue("paymentDuration", "");
                        //   setFieldValue("paymentSchedule", "");
                        //   setFieldValue("startDate", "");
                        //   setFieldValue("endDate", "");
                        // }
                      }}
                    />
                  </div>
                  {selectedPaymentType === "Installment" && (
                    <>
                      <div>
                        <label className="block text-sm mb-2">
                          Payment Duration
                        </label>
                        <SelectField
                          name="paymentDuration"
                          placeholder="Number in month(s)"
                          options={["6", "12"]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">
                          Payment Schedule
                        </label>
                        <SelectField
                          name="paymentSchedule"
                          placeholder="Select Payment Schedule"
                          options={["Monthly", "Quarterly"]}
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <DatePickerInput
                            label="Start Date"
                            name="startDate"
                            minDate={new Date()}
                            placeholder="Start Date"
                          />
                        </div>
                        <div className="w-1/2">
                          <DatePickerInput
                            label="End Date"
                            name="endDate"
                            placeholder="End date"
                            readOnly
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                <div className="space-y-4 text-sm">
                  <p className="text-black flex justify-between gap-4">
                    ₦{initialDeposit?.toLocaleString()}
                    <span className="text-xs text-gray-400 text-right">
                      {values.paymentType === "One Time"
                        ? "Full Payment"
                        : "Initial Deposit"}
                    </span>
                  </p>
                  <p className="text-black flex justify-between gap-4">
                    ₦{fees.toLocaleString()}
                    <span className="text-xs text-gray-400 text-right">
                      Fees & Charges
                    </span>
                  </p>
                  {selectedPaymentType === "Installment" &&
                    weeklyAmount > 0 && (
                      <p className="text-black flex justify-between gap-4">
                        ₦{weeklyAmount.toLocaleString()}
                        <span className="text-xs text-gray-400 text-right">
                          {values.paymentSchedule} Amount
                        </span>
                      </p>
                    )}
                  <p className="text-black flex justify-between gap-4">
                    ₦{totalAmount.toLocaleString()}
                    <span className="text-xs text-gray-400 text-right">
                      Total initial Payment
                    </span>
                  </p>
                </div>
                <div className="mt-6 bg-adron-green text-white text-start px-4 md:px-6 py-2 rounded-3xl font-semibold text-lg flex flex-col">
                  ₦{totalAmount.toLocaleString()}{" "}
                  <span className="text-xs text-white/50">Total</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-start gap-2">
                  <HiOutlineExclamationCircle className="h-10 w-10" />
                  The breakdown updates based on your selection. Contact support
                  if you have questions.
                </p>
              </div>
            </div>
            <div className="text-right md:p-5">
              <Button
                label="Continue"
                className="!w-fit px-18"
                type="submit"
                disabled={!isValid}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
