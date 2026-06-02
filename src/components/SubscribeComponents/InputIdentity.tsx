import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import ImageInput from "../FormComponents/ImageInput";
import NextOfKin from "./NextOfKin";
import PropertySpecifications from "./PropertySpecifications";

const validationSchema = Yup.object().shape({
  passport: Yup.mixed().required("required"),
  id: Yup.mixed().required("required"),
});
interface Props {
  property?: Property;
}

const InputIdentityInfo: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const {
    setSubscribeFormData,
    contract_profile_picture,
    contract_profile_picture2,
    means_of_ids,
    soleOwner,
  } = useSubscribeFormData();

  const contract_ID = means_of_ids ? means_of_ids[0] : null;
  const initialValues = {
    passport: contract_profile_picture || null,
    passport2: contract_profile_picture2 || null,
    id: contract_ID,
  };
  const goBack = () => {
    action.openModal(<NextOfKin property={property} />);
  };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">
          Provide means of identification
        </div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            if (values.passport) {
              setSubscribeFormData({
                contract_profile_picture: values.passport,
              });
            }
            if (values.passport2) {
              setSubscribeFormData({
                contract_profile_picture2: values.passport2,
              });
            }
            if (values.id) {
              setSubscribeFormData({
                means_of_ids: [values.id],
              });
            }
            action.openModal(<PropertySpecifications property={property} />);
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
              <div className="space-y-7">
                <div className="space-y-1 grid grid-cols-2 gap-2">
                  {/* <div className="text-lg">What`s your email address?</div> */}
                  <ImageInput
                    name="passport"
                    label="Owner's Photo"
                    infoText="Upload a clear photo of face"
                    width={175}
                    height={200}
                    className="!w-fit"
                  />
                  {soleOwner === "no" && (
                    <ImageInput
                      name="passport2"
                      label="Co-owner's Photo"
                      infoText="Upload a clear photo of face"
                      width={175}
                      height={200}
                      className="!w-fit"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  {/* <div className="text-lg">What`s your phone No.?</div> */}
                  <ImageInput
                    label="National ID / Int'l Passport / Voter's card"
                    infoText="upload means of identification."
                    name="id"
                    className="!w-full"
                    width={"100%"}
                    height={140}
                  />
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

export default InputIdentityInfo;
