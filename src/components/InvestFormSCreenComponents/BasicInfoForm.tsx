import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useUserStore } from "../../zustand/UserStore";
import DatePickerInput from "../DatePickerInput";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import CustomDateInput from "../CustomDateInput";

const customerInfoSchema = Yup.object({
  gender: Yup.string().required("Gender is required"),
  state: Yup.string().required("State is required"),
  town: Yup.string().required("Town is required"),
  country: Yup.string().required("Country is required"),
  dateOfBirth: Yup.date().required("Required"),
  nationality: Yup.string().required("Nationality is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  residentialAddress: Yup.string().required("Address is required"),
});

const getValue = (contractValue: any, userValue: any, fallback: any = "") => {
  return contractValue ?? userValue ?? fallback;
};
type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const BasicInfoForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { user } = useUserStore();
  const {
    contract_gender,
    contract_state,
    contract_town,
    contract_country,
    contract_residential_address,
    contract_nationality,
    contract_date_of_birth,
    contract_marital_status,
    setContractDetails,
  } = useContractDeatilStore();
  const initialValues = {
    gender: getValue(contract_gender, user?.gender),
    state: getValue(contract_state, user?.state),
    town: getValue(contract_town, user?.lga),
    country: getValue(contract_country, user?.country),
    dateOfBirth: getValue(contract_date_of_birth, ""),
    nationality: getValue(
      contract_nationality,
      user?.country ? `${user.country}n` : ""
    ),
    maritalStatus: getValue(contract_marital_status, ""),
    residentialAddress: getValue(contract_residential_address, user?.address),
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        const originalDOB = values.dateOfBirth || "";
        const date = new Date(originalDOB);
        const formatedDOB = date.toISOString();

        setContractDetails({
          // contract_email: values.email,
          // contract_sms: values.phoneSMS,
          contract_gender: values.gender,
          contract_state: values.state,
          contract_town: values.town,
          contract_country: values.country,
          contract_residential_address: values.residentialAddress,
          contract_nationality: values.nationality,
          contract_date_of_birth: formatedDOB,
          contract_marital_status: values.maritalStatus,
        });
        setActiveTab(activeTab + 1);
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Select Gender
              </label>

              <SelectField name="gender" options={["", "Male", "Female"]} />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Marital Status
              </label>

              <SelectField
                name="maritalStatus"
                options={["", "Single", "Maried"]}
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Country
              </label>
              <InputField name="country" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                State
              </label>
              <InputField name="state" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Town
              </label>
              <InputField name="town" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Nationality
              </label>
              <InputField name="nationality" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Address
              </label>
              <InputField name="residentialAddress" />
            </div>

            <div className="">
              {/* <DatePickerInput
                label="Date of Birth"
                name="dateOfBirth"
                maxDate={new Date()}
                placeholder="Select year of birth"
              /> */}
              <CustomDateInput
                label="Date of Birth"
                name="dateOfBirth"
                maxDate={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD format
              />{" "}
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
