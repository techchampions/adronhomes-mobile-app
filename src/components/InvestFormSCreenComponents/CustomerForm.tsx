import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { useUserStore } from "../../zustand/UserStore";
const getValue = (contractValue: any, userValue: any, fallback: any = "") => {
  return contractValue ?? userValue ?? fallback;
};

type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const CustomerForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { user } = useUserStore();

  const {
    contract_email,
    contract_sms,
    contract_nationality,
    contract_date_of_birth,
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
    email: getValue(contract_email, user?.email),
    phoneSMS: getValue(contract_sms, user?.phone_number),
    // dateOfBirth: getValue(contract_date_of_birth, ""),
    // nationality: getValue(
    //   contract_nationality,
    //   user?.country ? `${user.country}n` : ""
    // ),
  };
  const customerInfoSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneSMS: Yup.number()
      .typeError("Phone number must be a valid number")
      .required("Phone is Required"),
    occupation: Yup.string().required("Required"),
    businessType: Yup.string().required("Required"),
    subscriberName1: Yup.string().required("Required"),
    subscriberName2: Yup.string(),
    subscriberName3: Yup.string(),
    additionalName: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        setContractDetails({
          contract_occupation: values.occupation,
          contract_business_type: values.businessType,
          contract_employer: values.employer,
          contract_employer_address: values.employerAddress,
          contract_subscriber_name_1: values.subscriberName1,
          contract_subscriber_name_2: values.subscriberName2,
          contract_subscriber_name_3: values.subscriberName3,
          contract_additional_name: values.additionalName,
          contract_email: values.email,
          contract_sms: values.phoneSMS,
        });
        setActiveTab(activeTab + 1);
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Principal Owner
              </label>
              <InputField name="subscriberName1" placeholder="Full Name" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Additional Name
              </label>
              <InputField name="additionalName" placeholder="Full Name" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Co-Owner Name
              </label>
              <InputField name="subscriberName2" placeholder="Full Name" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Co-Owner Name 2
              </label>
              <InputField name="subscriberName3" placeholder="Full Name" />
            </div>

            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Occupation
              </label>
              <InputField
                name="occupation"
                placeholder="eg. Banker, Teacher, etc."
              />
            </div>

            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Email
              </label>
              <InputField name="email" placeholder="Email Address" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                SMS Phone.No
              </label>
              <InputField name="phoneSMS" placeholder="Phone No. (for SMS)" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Property Ownership Type
              </label>
              <SelectField
                name="businessType"
                placeholder="Select intended use of the property"
                options={[
                  "Company (Corporate)",
                  "Joint",
                  "Individual",
                  "Minor",
                ]}
              />
            </div>
            <div className="flex items-center gap-5 col-span-2 mt-7 mb-2">
              <span className="text-lg text-nowrap">Employment info</span>
              <span className=" w-full border-b-1 border-gray-400"></span>
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Employer Name
              </label>
              <InputField name="employer" placeholder="Full Name" />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-gray-400 min-w-0 truncate line-clamp-1"
              >
                Employer Address
              </label>
              <InputField name="employerAddress" />
            </div>
          </div>

          <div className="flex justify-end">
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
