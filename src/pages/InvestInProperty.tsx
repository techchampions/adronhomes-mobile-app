import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import PaymentBreakDown from "../components/DashboardNewPropertyComponent/PaymentBreakDown";
import PropertySummary from "../components/PropertySummary";
import DatePickerInput from "../components/DatePickerInput";
import { useEffect } from "react";
import { addMonths } from "date-fns";

export default function InvestmentForm() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const initialValues = {
    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",
    marketerId: "",
  };
  const validationSchema = Yup.object({
    paymentType: Yup.string().required("Required"),
    paymentDuration: Yup.string().required("Required"),
    paymentSchedule: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    marketerId: Yup.string().required("Required"),
  });
  const submit = (values: typeof initialValues) => {
    navigate(`/property-agreement/${id}`);
    const planDetails = {
      paymentType: values.paymentType,
      paymentDuration: values.paymentDuration,
      paymentSchedule: values.paymentSchedule,
      startDate: values.startDate,
      endDate: values.endDate,
      marketerId: values.marketerId,
      propertyId: id,
    };
    console.log("planDetails", planDetails);
  };

  // 👇 Component to auto-calculate endDate
  const AutoEndDateUpdater = () => {
    const { values, setFieldValue } = useFormikContext<typeof initialValues>();

    useEffect(() => {
      const { paymentDuration, startDate } = values;

      // Only calculate if both are available
      if (paymentDuration && startDate) {
        const months = parseInt(paymentDuration);
        if (!isNaN(months)) {
          const newEndDate = addMonths(new Date(startDate), months);
          setFieldValue("endDate", newEndDate);
        }
      }
    }, [values, setFieldValue]);

    return null; // no UI
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values }) => (
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
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Payment Duration</label>
                  <SelectField
                    name="paymentDuration"
                    placeholder="Number in month(s)"
                    options={["6", "12"]}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Payment Schedule</label>
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
              </div>
            </div>
            <PaymentBreakDown values={values} propertyId={id} />
          </div>
          <div className="text-right md:p-18">
            <Button type="submit" label="Proceed" className="!w-fit px-10" />
          </div>
        </Form>
      )}
    </Formik>
  );
}
