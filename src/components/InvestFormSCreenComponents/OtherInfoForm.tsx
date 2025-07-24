import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";

const customerInfoSchema = Yup.object({
  // occupation: Yup.string().required("Required"),
  // businessType: Yup.string().required("Required"),
  // subscriberName1: Yup.string().required("Required"),
  // subscriberName2: Yup.string(),
  // subscriberName3: Yup.string(),
  // additionalName: Yup.string(),
  // transactionDate: Yup.date().required("Required"),
  // quantity: Yup.number().min(1).required("Required"),
});
type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const OtherInfoForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const {
    contract_occupation,
    contract_business_type,
    contract_employer,
    contract_employer_address,
    contract_subscriber_name_1,
    contract_subscriber_name_2,
    contract_subscriber_name_3,
    contract_additional_name,
    setContractDetails,
  } = useContractDeatilStore();
  const initialValues = {
    occupation: contract_occupation,
    businessType: contract_business_type,
    employer: contract_employer,
    employerAddress: contract_employer_address,
    subscriberName1: contract_subscriber_name_1,
    subscriberName2: contract_subscriber_name_2,
    subscriberName3: contract_subscriber_name_3,
    additionalName: contract_additional_name,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        setActiveTab(activeTab + 1);
        setContractDetails({
          contract_occupation: values.occupation,
          contract_business_type: values.businessType,
          contract_employer: values.employer,
          contract_employer_address: values.employerAddress,
          contract_subscriber_name_1: values.subscriberName1,
          contract_subscriber_name_2: values.subscriberName2,
          contract_subscriber_name_3: values.subscriberName3,
          contract_additional_name: values.additionalName,
        });
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Occupation
              </label>
              <InputField name="occupation" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Business Type
              </label>

              <SelectField
                name="businessType"
                options={["", "Individual", "Company", "Joint", "Minor"]}
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Employer Name
              </label>
              <InputField name="employer" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Employer Address
              </label>
              <InputField name="employerAddress" />
            </div>

            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Subscriber Name
              </label>
              <InputField name="subscriberName1" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Additional Name
              </label>
              <InputField name="additionalName" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Subscriber Name 2
              </label>
              <InputField name="subscriberName2" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Subscriber Name 3
              </label>
              <InputField name="subscriberName3" />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              label="Prev"
              icon={<ArrowLeft />}
              onClick={() => setActiveTab(activeTab - 1)}
              className="!w-fit px-4 !rounded-lg !bg-black"
            />
            <Button
              label="Next"
              type="submit"
              disabled={!isValid}
              rightIcon={<ArrowRight />}
              className="!w-fit px-4 !rounded-lg"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
