import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaFileUpload, FaMapMarkerAlt } from "react-icons/fa";
import { RiUpload2Line } from "react-icons/ri";
import Button from "../components/Button";
import { GiStreetLight } from "react-icons/gi";

export default function InvestmentForm() {
  const [selectedIdType, setSelectedIdType] = useState("");

  const initialValues = {
    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",
    govId: "",
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
    nextOfKinName: Yup.string().required("Required"),
    bankStatement: Yup.mixed().required("Required"),
    utilityBill: Yup.mixed().required("Required"),
    nextOfKinRelationship: Yup.string().required("Required"),
    nextOfKinPhone: Yup.string().required("Required"),
  });
  const submit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form className="space-y-10">
        {/* Property Summary */}
        <div className=" ">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src="/treasure-park-bg.png"
                className="h-[100px] w-[150px] rounded-lg "
                alt=""
              />
              <div>
                <h2 className="text-xl font-semibold">
                  Treasure Parks and Gardens
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="h-4 w-4" /> 34, Shimawa, Ogun
                  State, Nigeria
                </p>
                <div className="flex items-center text-xs mt-2 justify-between font-bold text-gray-500 gap-4">
                  <span className="flex items-center gap-1 truncate">
                    {/* <TfiRulerAlt2 />  */}
                    <img
                      src="/ruler.svg"
                      width={14}
                      height={14}
                      alt="dumbbell"
                    />
                    648 Sq M
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <GiStreetLight /> Str Light
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    {/* <FaDumbbell /> */}
                    <img
                      src="/dumbbell.svg"
                      width={18}
                      height={18}
                      alt="dumbbell"
                    />
                    Gym
                  </span>
                  <div className="flex items-center gap-1 text-xs ">Land</div>
                </div>
              </div>
            </div>
            <div className="text-right text-2xl font-bold">₦56,000,000</div>
          </div>
        </div>

        {/* Investment Section */}
        <div className="grid grid-cols-1 bg-white md:grid-cols-3 p-8 gap-8 rounded-3xl">
          <div className="col-span-2 p-6 space-y-4">
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
                  <label className="block text-sm mb-2">Start Date</label>
                  <InputField name="startDate" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm mb-2">End Date</label>
                  <InputField name="endDate" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h4 className="font-semibold mb-4">Payment Breakdown</h4>
            <div className="space-y-4 text-sm">
              <p className="text-black flex justify-between gap-4">
                ₦36,000,000
                <span className="text-xs text-gray-400 text-right">
                  Initial Deposit
                </span>
              </p>
              <p className="text-black flex justify-between gap-4">
                ₦5,000
                <span className="text-xs text-gray-400 text-right">
                  Fees & Charges
                </span>
              </p>
              <p className="text-black flex justify-between gap-4">
                ₦5,000,000
                <span className="text-xs text-gray-400 text-right">
                  Weakly Amount
                </span>
              </p>
              <p className="text-black flex justify-between gap-4">
                ₦7,500,000
                <span className="text-xs text-gray-400 text-right">
                  Amount to be paid after your duration
                </span>
              </p>
            </div>
            <div className="mt-6 bg-adron-green text-white text-start px-4 md:px-6 py-2 rounded-3xl font-semibold text-lg flex flex-col">
              ₦36,000,000 <span className="text-xs text-white/50">Total</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-start gap-2">
              <HiOutlineExclamationCircle className="h-10 w-10" /> The following
              is the payment breakdown for your first payment. Please contact
              support if you have any questions.
            </p>
          </div>
        </div>

        {/* Customer Verification */}
        <div className="bg-white p-6 rounded-3xl space-y-6">
          <h4 className="text-lg font-bold">Customer Verification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm col-span-2">
                Government Issued ID
              </label>
              <SelectField
                name="govId"
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
                <input type="file" name="bankStatement" className="text-xs" />
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
                <input type="file" name="utilityBill" className="text-xs" />
                <RiUpload2Line />{" "}
              </div>
            </div>
            <div>
              <label className="block text-sm">Next of Kin Phone</label>
              <InputField name="nextOfKinPhone" />
            </div>
          </div>
        </div>

        <div className="text-right p-18">
          <Button type="submit" label="Proceed" className="!w-fit px-10" />
        </div>
      </Form>
    </Formik>
  );
}
