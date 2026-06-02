import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import InputField from "../InputField";
import InputIdentityInfo from "./InputIdentity";
import InputLocation from "./InputLocation";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("required"),
  relationship: Yup.string().required("required"),
  phone: Yup.string().required("required"),
  address: Yup.string().required("required"),
});
interface Props {
  property?: Property;
}

const NextOfKin: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const {
    setSubscribeFormData,
    contract_next_of_kin,
    contract_next_of_kin_phone,
    contract_next_of_kin_address,
    contract_next_of_kin_relationship,
  } = useSubscribeFormData();
  const initialValues = {
    fullName: contract_next_of_kin || "",
    relationship: contract_next_of_kin_relationship || "",
    phone: contract_next_of_kin_phone || "",
    address: contract_next_of_kin_address || "",
  };
  const goBack = () => {
    action.openModal(<InputLocation property={property} />);
  };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[85vh] md:max-h-[70vh] overflow-auto scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-2">
        <div className="text-2xl font-bold">Enter your next of kin details</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setSubscribeFormData({
              contract_next_of_kin: values.fullName,
              contract_next_of_kin_phone: values.phone,
              contract_next_of_kin_address: values.address,
              contract_next_of_kin_relationship: values.relationship,
            });
            action.openModal(<InputIdentityInfo property={property} />);
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
              <div className="space-y-5">
                <InputField
                  name="fullName"
                  type="text"
                  label="What is his/her name?"
                  placeholder="Full Name"
                  className="text-2xl font-bold rounded-xl py-3"
                />

                <InputField
                  name="relationship"
                  type="text"
                  label="What is your relationship?"
                  placeholder="Relationship (eg. Brother, sister)"
                  className="text-2xl font-bold rounded-xl py-3"
                />
                <InputField
                  name="phone"
                  type="text"
                  placeholder="Phone number"
                  label="What is his/her phone No.?"
                  className="text-2xl font-bold rounded-xl py-3"
                />
                <InputField
                  name="address"
                  placeholder="Address"
                  label="What's his/her address?"
                  className="text-2xl font-bold rounded-xl py-3"
                />
              </div>
              <div className="flex justify-center w-full gap-2 mt-2">
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

export default NextOfKin;
