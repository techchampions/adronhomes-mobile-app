import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { useNavigate, useParams } from "react-router-dom";

const customerInfoSchema = Yup.object({
  nextOfKin: Yup.string().required("Required"),
  relationship: Yup.string().required("Required"),
  phone: Yup.mixed().required("Required"),
  address: Yup.string().required("Required"),
});
type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const NextofKinForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const params = useParams();
  const id = params?.id;

  const navigate = useNavigate();
  const {
    contract_next_of_kin,
    contract_next_of_kin_address,
    contract_next_of_kin_phone,
    contract_next_of_kin_relationship,
    setContractDetails,
  } = useContractDeatilStore();
  const initialValues = {
    nextOfKin: contract_next_of_kin,
    relationship: contract_next_of_kin_relationship,
    phone: contract_next_of_kin_phone,
    address: contract_next_of_kin_address,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        setContractDetails({
          contract_next_of_kin: values.nextOfKin,
          contract_next_of_kin_relationship: values.relationship,
          contract_next_of_kin_address: values.address,
          contract_next_of_kin_phone: values.phone,
        });
        // navigate(`/invest-property/${id}`);
        setActiveTab(activeTab + 1);
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Next Of Kin Name
              </label>
              <InputField name="nextOfKin" placeholder="Full Name" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Relationship
              </label>
              <InputField
                name="relationship"
                placeholder="eg. Brother, Sister, Mother, Father"
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Next of Kin Phone.No
              </label>
              <InputField name="phone" placeholder="Phone number" />
            </div>
            <div className="">
              <label htmlFor="" className="text-sm text-gray-400">
                Next of Kin Address
              </label>
              <InputField name="address" placeholder="Residential address" />
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
