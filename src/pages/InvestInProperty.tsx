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
import InputField from "../components/InputField";
import { formatPrice } from "../data/utils";
import NoPropertyFound from "../components/NoPropertyFound";

export default function InvestmentForm() {
  const { openModal } = useModalStore();
  const params = useParams();
  const id = params?.id;
  const { setPaymentDetails } = usePaymentBreakDownStore();
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const { data, isError, isLoading } = useGetPropertyByID(id || 0);
  const number_of_unit = data?.data.properties[0].number_of_unit || 0;
  const property = data?.data.properties[0];
  let paymentTypeOptions = [];
  if (data?.data.properties[0].payment_type === "full") {
    paymentTypeOptions = ["One Time"];
  } else {
    paymentTypeOptions = ["One Time", "Installment"];
  }
  if (isLoading) return <SmallLoader />;
  if (isError) return <ApiErrorBlock />;
  if (number_of_unit < 1)
    return (
      <NoPropertyFound
        msg="No units left"
        description="Oops... All units have been purchased"
      />
    );

  const PropertyDurationLimit =
    data?.data.properties[0].property_duration_limit;
  function generateOptions(max: number) {
    const options = [];
    for (let i = 2; i <= max; i++) {
      options.push(i.toString());
    }
    return options;
  }

  const initialValues = {
    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",
    units: 1,
    propertyPurpose: "",
  };
  const validationSchema = Yup.object({
    ...(selectedPaymentType === "Installment"
      ? {
          paymentDuration: Yup.string().required("Required"),
          paymentSchedule: Yup.string().required("Required"),
          startDate: Yup.date().required("Required"),
          endDate: Yup.date().required("Required"),
          paymentType: Yup.string().required("Required"),
          units: Yup.number().required("Required"),
        }
      : {
          paymentType: Yup.string().required("Required"),
          units: Yup.number()
            .max(data?.data.properties[0].number_of_unit || 0)
            .required("Required"),
        }),
    ...(property?.type.name === "Land" && {
      propertyPurpose: Yup.string().required("Required"),
    }),

    // marketerId: Yup.string().required("Required"),
  });
  const submit = (values: typeof initialValues) => {
    const {
      initialDeposit,
      weeklyAmount,
      infrastructureFees,
      otherFees,
      totalAmount,
    } = calculatePaymentDetails(values, property);
    if (values.paymentType === "Installment") {
      const originalStartDateStr = values.startDate || "";
      const date = new Date(originalStartDateStr);
      const formatedStartDate = date.toISOString();
      const originalEndDateStr = values.endDate || "";
      const enddate = new Date(originalEndDateStr);
      const formatedEndDate = enddate.toISOString();

      const planDetails = {
        paymentType: values.paymentType,
        paymentDuration: values.paymentDuration
          ? Number(values.paymentDuration)
          : null,
        paymentSchedule: values.paymentSchedule,
        startDate: formatedStartDate,
        endDate: formatedEndDate,
        initialDeposit: initialDeposit,
        weeklyAmount: weeklyAmount,
        totalAmount: totalAmount,
        infrastructureFees: infrastructureFees,
        otherFees: otherFees,
        numberOfUnits: values.units,
        propertyId: id ? Number(id) : null,
        propertyPurpose:
          property?.type.name === "Land" ? values.propertyPurpose : null,
      };
      setPaymentDetails(planDetails);
      openModal(<InputMarketerId />);
    } else {
      const planDetails = {
        paymentType: values.paymentType,
        paymentDuration: values.paymentDuration
          ? Number(values.paymentDuration)
          : null,
        paymentSchedule: values.paymentSchedule,
        startDate: values.startDate,
        endDate: values.endDate,
        initialDeposit: initialDeposit,
        weeklyAmount: weeklyAmount,
        totalAmount: totalAmount,
        infrastructureFees: infrastructureFees,
        otherFees: otherFees,
        numberOfUnits: values.units,
        propertyId: id ? Number(id) : null, // Convert string ID to number
        propertyPurpose:
          property?.type.name === "Land" ? values.propertyPurpose : null,
      };
      setPaymentDetails(planDetails);
      openModal(<InputMarketerId />);
    }
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
    }, [values.startDate, values.paymentDuration, setFieldValue]);

    return null; // no UI
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, isValid }) => {
        const {
          infrastructureFees,
          otherFees,
          initialDeposit,
          weeklyAmount,
          totalAmount,
        } = calculatePaymentDetails(values, property);
        const { SelectedPaymentType } = paymentTypeWatcher(values);
        setSelectedPaymentType(SelectedPaymentType);

        return (
          <Form className="space-y-10">
            <AutoEndDateUpdater /> {/* 👈 place this inside Formik form */}
            {/* Property Summary */}
            <div className=" ">
              <PropertySummary id={id ?? ""} units={values.units} />
            </div>
            {/* Investment Section */}
            <div className="grid grid-cols-1 bg-white md:grid-cols-3 p-2 md:p-8 gap-8 rounded-3xl">
              <div className="md:col-span-2 p-1 md:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm mb-2">Payment Type</label>
                    <SelectField
                      name="paymentType"
                      placeholder="Select Payment Type"
                      options={paymentTypeOptions}
                      onchange={(value: string) => {
                        setSelectedPaymentType(value);
                      }}
                    />
                  </div>
                  <div className="">
                    <label className="block text-sm mb-2">Units</label>

                    <InputField
                      name="units"
                      placeholder="Enter Number of Units to buy"
                    />
                  </div>
                  {property?.category === "estate" && (
                    <div>
                      <label className="block text-sm mb-2">Land Purpose</label>
                      <SelectField
                        name="propertyPurpose"
                        placeholder="Select Land Purpose"
                        options={property?.purpose || []}
                      />
                    </div>
                  )}

                  {selectedPaymentType === "Installment" && (
                    <>
                      <div>
                        <label className="block text-sm mb-2">
                          Payment Duration
                        </label>
                        <SelectField
                          name="paymentDuration"
                          placeholder="Number in month(s)"
                          options={generateOptions(PropertyDurationLimit || 0)}
                          // options={["6", "12"]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">
                          Payment Schedule
                        </label>
                        <SelectField
                          name="paymentSchedule"
                          placeholder="Select Payment Schedule"
                          options={property?.payment_schedule || []}
                        />
                      </div>
                      <div className="flex gap-4 col-span-2">
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
              <div className="bg-white py-6 px-4 md:px-6 rounded-3xl shadow-xl">
                <h4 className="font-semibold mb-4">Infrastructure Fees</h4>
                <div className="space-y-4 mb-4 text-sm">
                  <p className="text-black flex justify-between gap-4">
                    {formatPrice(infrastructureFees)}
                    <span className="text-xs text-gray-400 text-right">
                      Fees & Charges
                    </span>
                  </p>
                </div>
                <h4 className="font-semibold mb-4">Other Fees</h4>
                <div className="space-y-4 mb-4 text-sm">
                  <p className="text-black flex justify-between gap-4">
                    {formatPrice(otherFees)}
                    <span className="text-xs text-gray-400 text-right">
                      Fees & Charges
                    </span>
                  </p>
                </div>

                <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                <div className="space-y-4 text-sm">
                  <p className="text-black flex justify-between gap-4">
                    {formatPrice(initialDeposit)}
                    <span className="text-xs text-gray-400 text-right">
                      {values.paymentType === "One Time"
                        ? "Full Payment"
                        : "Initial Deposit"}
                    </span>
                  </p>
                  {/* <p className="text-black flex justify-between gap-4">
                    ₦{fees.toLocaleString()}
                    <span className="text-xs text-gray-400 text-right">
                      Fees & Charges
                    </span>
                  </p> */}
                  {selectedPaymentType === "Installment" &&
                    weeklyAmount > 0 && (
                      <p className="text-black flex justify-between gap-4">
                        {formatPrice(weeklyAmount)}
                        <span className="text-xs text-gray-400 text-right">
                          {values.paymentSchedule} Amount
                        </span>
                      </p>
                    )}
                  {/* <p className="text-black flex justify-between gap-4">
                    ₦{totalAmount.toLocaleString()}
                    <span className="text-xs text-gray-400 text-right">
                      Total initial Payment
                    </span>
                  </p> */}
                </div>
                <div className="mt-6 bg-adron-green text-white text-start px-4 md:px-6 py-2 rounded-3xl font-semibold text-lg flex flex-col">
                  ₦{totalAmount.toLocaleString()}{" "}
                  <span className="text-[10px] text-white/50">
                    Total is exclusive of Infrastructure Fees
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 flex items-start gap-2">
                  <HiOutlineExclamationCircle className="h-5 w-5" />
                  The breakdown updates based on your selection.
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
