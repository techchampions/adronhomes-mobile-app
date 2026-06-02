import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useGetCittaGenders, useGetCittaMaritalStatus } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import DateInput from "../FormComponents/DateInput";
import RadioGroup from "../FormComponents/RadioGroup";
import RadioGroupSkeleton from "../FormComponents/RadioGroupSkeleton";
import InputLocation from "./InputLocation";
import OccupationInfo from "./OcupationInfo";

const validationSchema = Yup.object().shape({
  gender: Yup.string().required("required"),
  marital_status: Yup.string().required("required"),
  dob: Yup.string().required("required"),
});
interface Props {
  property?: Property;
}
const InputAdditionalPersonalInfo: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const { data: genderDataResponse, isLoading, isError } = useGetCittaGenders();
  const {
    data: maritalDataResponse,
    isLoading: gettingMarital,
    isError: MaritalError,
  } = useGetCittaMaritalStatus();
  const GENDER_OPTIONS =
    genderDataResponse?.data.map((item) => ({
      value: item.pName,
      label: item.pName,
    })) || [];
  const MARITAL_OPTIONS =
    maritalDataResponse?.data.map((item) => ({
      value: item.pName,
      label: item.pName,
    })) || [];
  const {
    setSubscribeFormData,
    contract_gender,
    contract_marital_status,
    contract_date_of_birth,
  } = useSubscribeFormData();
  const initialValues = {
    gender: contract_gender || "",
    marital_status: contract_marital_status || "",
    dob: contract_date_of_birth || "",
  };
  const goBack = () => {
    action.openModal(<OccupationInfo property={property} />);
  };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[85vh] md:max-h-[75vh] overflow-auto scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      {/* <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Subscribe to {property.name}</div>
      </div> */}
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            const gender = genderDataResponse?.data.find(
              (item) => values.gender === item.pName
            );
            const maritalStatus = maritalDataResponse?.data.find(
              (item) => item.pName === values.marital_status
            );
            setSubscribeFormData({
              contract_gender: values.gender,
              contract_gender_code: gender?.pCode,
              contract_marital_status: values.marital_status,
              contract_marital_status_code: maritalStatus?.pCode,
              contract_date_of_birth: values.dob,
            });
            action.openModal(<InputLocation property={property} />);
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
              <div className="space-y-7">
                <div className="space-y-1">
                  {isLoading || isError ? (
                    <RadioGroupSkeleton
                      label={true}
                      optionsCount={2}
                      orientation="horizontal"
                      className="my-4"
                    />
                  ) : (
                    <RadioGroup
                      label="What is your gender?"
                      name="gender"
                      options={GENDER_OPTIONS}
                      orientation="horizontal"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  {gettingMarital || MaritalError ? (
                    <RadioGroupSkeleton
                      label={true}
                      optionsCount={2}
                      orientation="horizontal"
                      className="my-4"
                    />
                  ) : (
                    <RadioGroup
                      label="What is your marital status?"
                      name="marital_status"
                      options={MARITAL_OPTIONS}
                      orientation="horizontal"
                      optionClassName="min-w-[calc(33.3%-8px)]"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  {/* <div className="text-lg">What is your date of birth?</div> */}
                  <DateInput name="dob" label="What is your date of birth" />
                </div>
              </div>
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
                  disabled={!isValid}
                  rightIcon={<ArrowRight />}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputAdditionalPersonalInfo;
