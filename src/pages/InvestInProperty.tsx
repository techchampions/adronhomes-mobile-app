import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import { RiUpload2Line } from "react-icons/ri";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import PaymentBreakDown from "../components/DashboardNewPropertyComponent/PaymentBreakDown";
import PropertySummary from "../components/PropertySummary";
import DatePickerInput from "../components/DatePickerInput";
import { useState } from "react";
import { useModalStore } from "../zustand/useModalStore";
import KYC from "../components/KYC";

export default function InvestmentForm() {
  const { openModal } = useModalStore();
  const [isKYCVerified, setIsKYCVerified] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const initialValues = {
    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",
    govId: "",
    govIdType: "",
    nextOfKinName: "",
    bankStatement: null,
    utilityBill: null,
    nextOfKinRelationship: "",
    nextOfKinPhone: "",
  };
  const validationSchema = Yup.object({
    paymentType: Yup.string().required("Required"),
    paymentDuration: Yup.string().required("Required"),
    paymentSchedule: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    govId: Yup.string().required("Required"),
    govIdType: Yup.string().required("Required"),
    nextOfKinName: Yup.string().required("Required"),
    bankStatement: Yup.mixed().required("Required"),
    utilityBill: Yup.mixed().required("Required"),
    nextOfKinRelationship: Yup.string().required("Required"),
    nextOfKinPhone: Yup.string().required("Required"),
  });
  const submit = (values: typeof initialValues) => {
    // navigate(`/property-agreement/${id}`);
    const planDetails = {
      paymentType: values.paymentType,
      paymentDuration: values.paymentDuration,
      paymentSchedule: values.paymentSchedule,
      startDate: values.startDate,
      endDate: values.endDate,
      govId: values.govId,
      govIdType: values.govIdType,
      nextOfKinName: values.nextOfKinName,
      bankStatement: values.bankStatement,
      utilityBill: values.utilityBill,
      nextOfKinRelationship: values.nextOfKinRelationship,
      nextOfKinPhone: values.nextOfKinPhone,
    };
    console.log("planDetails", planDetails);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-10">
          {/* Property Summary */}
          <div className=" ">
            <PropertySummary id={id} />
          </div>

          {/* Investment Section */}
          <div className="grid grid-cols-1 bg-white md:grid-cols-3 p-8 gap-8 rounded-3xl">
            <div className="md:col-span-2 p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">Payment Type</label>
                  <SelectField
                    name="paymentType"
                    options={["Select", "Outright", "Installment"]}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Payment Duration</label>
                  <SelectField
                    name="paymentDuration"
                    options={["6 months", "12 months"]}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Payment Schedule</label>
                  <SelectField
                    name="paymentSchedule"
                    options={["Monthly", "Quarterly"]}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <DatePickerInput label="Start Date" name="startDate" />
                    {/* <label className="block text-sm mb-2">Start Date</label>
                  <InputField name="startDate" /> */}
                  </div>
                  <div className="w-1/2">
                    <DatePickerInput label="End Date" name="endDate" />
                    {/* <label className="block text-sm mb-2">End Date</label>
                  <InputField name="endDate" /> */}
                  </div>
                </div>
              </div>
            </div>
            <PaymentBreakDown />{" "}
          </div>

          {/* Customer Verification */}
          {/* {!isKYCVerified && openModal(<KYC />)} */}
          {/* <div className="bg-white p-6 rounded-3xl space-y-6">
            <h4 className="text-lg font-bold">Customer Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-sm col-span-2">
                  Government Issued ID
                </label>
                <SelectField
                  name="govIdType"
                  options={["National ID", "Passport", "Driver's License"]}
                />
                <InputField name="govId" />
              </div>
              <div>
                <label className="block text-sm">Next of Kin Full Name</label>
                <InputField name="nextOfKinName" />
              </div>
              <div>
                <label className="block text-sm">Bank Statement</label>
                <div className="flex justify-between w-full px-4 py-4 bg-adron-body rounded-3xl items-center">
                  <input
                    type="file"
                    name="bankStatement"
                    className="text-xs"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("bankStatement", e.target.files[0]);
                      }
                    }}
                  />
                  <RiUpload2Line />{" "}
                </div>
              </div>
              <div>
                <label className="block text-sm">Relationship</label>
                <InputField name="nextOfKinRelationship" />
              </div>
              <div>
                <label className="block text-sm">Utility Bill</label>
                <div className="flex justify-between w-full px-4 py-4 bg-adron-body rounded-3xl items-center">
                  <input
                    type="file"
                    name="utilityBill"
                    className="text-xs"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("utilityBill", e.target.files[0]);
                      }
                    }}
                  />
                  <RiUpload2Line />{" "}
                </div>
              </div>
              <div>
                <label className="block text-sm">Next of Kin Phone</label>
                <InputField name="nextOfKinPhone" />
              </div>
            </div>
          </div> */}

          <div className="text-right md:p-18">
            <Button type="submit" label="Proceed" className="!w-fit px-10" />
          </div>
        </Form>
      )}
    </Formik>
  );
}
