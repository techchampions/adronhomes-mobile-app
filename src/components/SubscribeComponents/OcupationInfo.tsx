import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import InputField from "../InputField";
import InputAdditionalPersonalInfo from "./AdditionalPersonalInfo";
import CoOwnerInfo from "./CoOwnerInfo";
import OwnershipInfo from "./OwnershipInfo";

interface Props {
  property?: Property;
}

const OccupationInfo: React.FC<Props> = ({ property }) => {
  const modal = useModalStore();
  const {
    setSubscribeFormData,
    contract_occupation,
    contract_employer,
    contract_employer_address,
    soleOwner,
  } = useSubscribeFormData();
  const initialValues = {
    occupation: contract_occupation || "",
    employer_address: contract_employer_address || "",
    employer_name: contract_employer || "",
  };
  const [isEmployed, setisEmployed] = useState(false);
  const validationSchema = Yup.object().shape({
    ...(isEmployed
      ? {
          occupation: Yup.string().required("required"),
          employer_name: Yup.string().required("required"),
          employer_address: Yup.string().required("required"),
        }
      : {
          occupation: Yup.string().required("required"),
        }),
  });
  useEffect(() => {
    if (contract_employer) {
      setisEmployed(true);
    }
  }, [contract_employer]);

  const goBack = () => {
    if (soleOwner === "yes") {
      modal.openModal(<OwnershipInfo property={property} />);
    } else {
      modal.openModal(<CoOwnerInfo property={property} />);
    }
  };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md mx-h-[65vh]">
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
          onSubmit={(values) => {
            setSubscribeFormData({
              contract_occupation: values.occupation,
              contract_employer: values.employer_name,
              contract_employer_address: values.employer_address,
            });
            modal.openModal(
              <InputAdditionalPersonalInfo property={property} />
            );
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
              <div className="space-y-7">
                <div className="space-y-1">
                  <InputField
                    label="What is your Occupation?"
                    name="occupation"
                    type="text"
                    placeholder="Occupation"
                    className="text-2xl font-bold rounded-xl py-3"
                  />
                </div>
                <div className="">
                  <div className="text-sm mb-2 text-gray-700 font-bold">
                    Are you in an employement?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      label="Yes"
                      onClick={() => setisEmployed(true)}
                      className={`${
                        isEmployed
                          ? "bg-adron-green"
                          : "bg-transparent border border-gray-500 !text-black"
                      } rounded-lg`}
                    />
                    <Button
                      label="No"
                      onClick={() => setisEmployed(false)}
                      className={`${
                        isEmployed
                          ? "bg-transparent border border-gray-500 !text-black"
                          : "bg-adron-green"
                      } rounded-lg`}
                    />
                  </div>
                </div>
                {isEmployed && (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="" className="text-lg">
                        What is your employer`s name?
                      </label>
                      <InputField
                        name="employer_name"
                        type="text"
                        placeholder="Full Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="" className="text-lg">
                        What is your employer`s address?
                      </label>
                      <InputField
                        name="employer_address"
                        type="text"
                        placeholder="Address"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </>
                )}
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

export default OccupationInfo;
