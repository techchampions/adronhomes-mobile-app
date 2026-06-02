import { addMonths } from "date-fns";
import { Form, Formik, useFormikContext } from "formik";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useGetCittaPurposes } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { formatPrice } from "../../data/utils";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import CurrencyInputField from "../FormComponents/CurrencyInputField";
import DatePickerInput from "../FormComponents/CustomDateInput";
import SelectInput from "../FormComponents/SelectInput";
import InlineLoading from "../InlineLoading";
import InputField from "../InputField";
import InputIdentityInfo from "./InputIdentity";
import PaymentSummary from "./PaymentSummary";

interface Props {
  property?: Property;
}

const PropertySpecifications: React.FC<Props> = ({ property }) => {
  const {
    data: purposeDataResponse,
    isLoading,
    isError,
  } = useGetCittaPurposes();
  const validationSchema = Yup.object().shape({
    property_size: Yup.mixed().required("required"),
    purpose: Yup.mixed().required("required"),
    payment_plan: Yup.mixed().required("required"),
    units: Yup.number().required("required"),
    initial_deposit: Yup.number()
      .required("Initial deposit is required")
      .min(1, "Initial deposit must be at least ₦1")
      .test(
        "deposit-less-than-price",
        "Initial deposit cannot be greater than price",
        function (value) {
          const { duration_price } = this.parent;
          if (!duration_price || !value) return true; // Skip validation if either is empty
          return value <= duration_price;
        }
      ),
    payment_duration: Yup.mixed().required("required"),
    payment_schedule: Yup.mixed().required("required"),
    start_date: Yup.mixed().required("required"),
    end_date: Yup.mixed().required("required"),
  });

  let payableAmount = 0;
  let durationPrice = 0;
  const {
    setSubscribeFormData,
    land_size,
    payment_duration,
    payment_schedule,
    purpose,
    contract_purpose,
    // payment_plan,
    initial_deposit,
    units,
    citta_id,
    end_date,
  } = useSubscribeFormData();
  const action = useModalStore();
  const today = new Date();
  const initialValues = {
    property_size: land_size,
    citta_id: citta_id,
    units: units,
    purpose: purpose,
    contract_purpose: contract_purpose,
    payment_plan: "Installment",
    initial_deposit: initial_deposit,
    payment_duration: payment_duration,
    duration_price: 0,
    payment_schedule: payment_schedule,
    start_date: today,
    end_date: end_date,
  };
  const schedule = property?.payment_schedule ?? [];
  const SCHEDULE_OPTIONS = schedule.map((option) => ({
    label: option,
    value: option,
  }));
  const land_sizes = property?.land_sizes ?? [];
  const SIZE_OPTIONS = land_sizes.map((option) => ({
    label: `${option.size} ${option.measurement_unit}`,
    value: option.id,
  }));
  const purposes = property?.purpose || [];
  const contract_purposes = purposeDataResponse?.data ?? [];
  const CONTRACT_PURPOSE_OPTIONS = contract_purposes.map((option) => ({
    label: option.pName,
    value: option.pName,
  }));
  const PURPOSE_OPTIONS = purposes.map((option) => ({
    label: option,
    value: option,
  }));
  // let PAYMENT_PLAN: typeof PURPOSE_OPTIONS = [];
  // if (property.payment_type === "installment") {
  //   PAYMENT_PLAN = [
  //     { label: "One Time", value: "One Time" },
  //     { label: "Installment", value: "Installment" },
  //   ];
  // }
  const goBack = () => {
    action.openModal(<InputIdentityInfo property={property} />);
  };
  // Component to auto-calculate endDate
  const AutoEndDateUpdater = () => {
    const { values, setFieldValue } = useFormikContext<typeof initialValues>();

    useEffect(() => {
      // const { paymentDuration, startDate } = values;
      if (
        values.payment_plan &&
        values.property_size &&
        values.payment_duration
      ) {
        const selectedSize = values.property_size
          ? property?.land_sizes.find(
              (item) => item.id.toString() === values.property_size
            )
          : null;
        const selectedDuration = values.payment_duration
          ? selectedSize?.durations.find(
              (item) => item.duration.toString() === values.payment_duration
            )
          : null;
        // console.log("d_citta", selectedDuration);
        setFieldValue("duration_price", selectedDuration?.price);
        durationPrice = Number(selectedDuration?.price);
        console.log(durationPrice);
        // setFieldValue("initial_deposit", selectedDuration?.price);s
        setFieldValue("citta_id", selectedDuration?.citta_id);
      }
      if (
        values.payment_plan &&
        values.property_size &&
        values.payment_duration &&
        values.initial_deposit &&
        values.units
      ) {
        const selectedSize = values.property_size
          ? property?.land_sizes.find(
              (item) => item.id.toString() === values.property_size
            )
          : null;
        const selectedDuration = values.payment_duration
          ? selectedSize?.durations.find(
              (item) => item.id.toString() === values.payment_duration
            )
          : null;

        if (values.payment_plan === "One Time") {
          //  payableAmount = property.price * values.units;
          payableAmount = (selectedDuration?.price || 0) * values.units;
        } else if (values.payment_plan === "Installment") {
          payableAmount = Number(values.initial_deposit);
        }
      }

      if (
        values.payment_plan === "Installment" &&
        values.payment_duration &&
        values.start_date
      ) {
        const months = parseInt(String(values.payment_duration));
        const startDate = new Date(values.start_date);
        if (!isNaN(months)) {
          const newEndDate = addMonths(startDate, months);
          setFieldValue("end_date", newEndDate);
        }
      }
    }, [
      values.start_date,
      values.payment_duration,
      values.property_size,
      values.payment_plan,
      values.units,
      values.initial_deposit,
      setFieldValue,
    ]);
    // console.log("citta", values.citta_id);
    return null; // no UI
  };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[70vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Subscribe to {property?.name}</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          validateOnBlur
          validateOnChange
          onSubmit={(values) => {
            const contractPurpose = contract_purposes.find(
              (item) => item.pName === values.contract_purpose
            );
            setSubscribeFormData({
              land_size: values.property_size,
              purpose: values.purpose,
              contract_purpose: values.contract_purpose,
              contract_purpose_code: contractPurpose?.pCode || "",
              payment_duration: values.payment_duration,
              payment_schedule: values.payment_schedule,
              start_date: values.start_date.toISOString(),
              end_date: values.end_date,
              payable_amount: payableAmount,
              payment_plan: values.payment_plan,
              initial_deposit: String(values.initial_deposit),
              units: values.units,
              citta_id: values.citta_id,
            });
            action.openModal(<PaymentSummary property={property} />);
          }}
        >
          {({ isValid, values, errors }) => {
            // console.log("Formik state:", { isValid, errors, values });
            const selectedSize = values.property_size
              ? property?.land_sizes.find(
                  (item) => item.id.toString() === values.property_size
                )
              : null;

            const DURATION_OPTIONS =
              selectedSize?.durations?.map((option) => ({
                value: option.duration.toString(),
                label: `${option.duration} months`,
              })) || [];
            // getValidationSchema(values.payment_plan);
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
                <AutoEndDateUpdater />
                {/* <UpdateValidation /> */}
                <div className="space-y-7">
                  {/* <div className="space-y-1">
                    <div className="text-lg">Select payment plan</div>
                    <RadioGroup
                      name="payment_plan"
                      options={PAYMENT_PLAN}
                      orientation="horizontal"
                    />
                  </div> */}
                  <div className="space-y-1">
                    <SelectInput
                      label="Select your property size"
                      name="property_size"
                      options={SIZE_OPTIONS}
                      className="py-3 bg-adron-body"
                    />
                  </div>

                  {values.property_size && (
                    <div className="space-y-1">
                      <SelectInput
                        label="Select payment duration"
                        name="payment_duration"
                        options={DURATION_OPTIONS}
                        className="py-3 bg-adron-body"
                      />
                    </div>
                  )}
                  {values.payment_duration && (
                    <div className="space-y-1">
                      <SelectInput
                        label="Select Payment schedule"
                        name="payment_schedule"
                        options={SCHEDULE_OPTIONS}
                        className="py-3 bg-adron-body"
                      />
                    </div>
                  )}
                  {values.payment_duration && values.payment_schedule && (
                    <div className="space-y-1">
                      {isLoading || isError ? (
                        <div className="space-y-2">
                          <div className="">Select your property purpose</div>
                          <div className="bg-gray-100 p-3 rounded-xl">
                            <InlineLoading text="Loading purposes..." />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-7">
                          <SelectInput
                            label="Select your property purposes"
                            name="purpose"
                            options={PURPOSE_OPTIONS}
                            className="py-3 bg-adron-body"
                          />
                          <SelectInput
                            label="Select your property contract purpose"
                            name="contract_purpose"
                            options={CONTRACT_PURPOSE_OPTIONS}
                            className="py-3 bg-adron-body"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {values.contract_purpose && (
                    <div className="space-y-1">
                      <InputField
                        label="Select your number of units"
                        name="units"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  )}

                  {values.payment_plan === "Installment" &&
                    values.units &&
                    values.payment_duration &&
                    values.payment_schedule &&
                    values.contract_purpose && (
                      <div className="space-y-1">
                        <div className="text-sm font-bold">
                          Enter Initial Deposit
                        </div>
                        <div className="flex items-center text-gray-400 text-xs gap-1">
                          <Info size={15} />
                          <span>
                            the price of this property is{" "}
                            {formatPrice(values.duration_price)}
                          </span>
                        </div>
                        <CurrencyInputField
                          name="initial_deposit"
                          placeholder="Initial Deposit"
                          formatAsNaira
                          className="text-2xl font-bold rounded-xl py-3"
                        />
                      </div>
                    )}
                </div>
                {values.payment_plan === "Installment" &&
                  values.initial_deposit && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="">
                        <DatePickerInput
                          label="Start Date"
                          name="start_date"
                          minDate={new Date()}
                          placeholder={`DD-MM-YYYY`}
                        />
                      </div>
                      <div className="">
                        <DatePickerInput
                          label="End Date"
                          name="end_date"
                          placeholder="DD-MM-YYYY"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                <div className="flex justify-center w-full gap-2 mt-4">
                  <Button
                    label="Back"
                    icon={<ArrowLeft />}
                    className="bg-gray-800 rounded-lg hidden sm:flex"
                    onClick={goBack}
                  />

                  <Button
                    label="Proceed"
                    className="bg-adron-green rounded-lg"
                    type="submit"
                    disabled={!isValid || false}
                    rightIcon={<ArrowRight />}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PropertySpecifications;
