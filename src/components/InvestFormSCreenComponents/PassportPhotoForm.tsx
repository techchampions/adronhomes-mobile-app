import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { useNavigate, useParams } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { useToastStore } from "../../zustand/useToastStore";

const customerInfoSchema = Yup.object({
  //   photo: Yup.string().required("Required"),
  //   relationship: Yup.string().required("Required"),
});
type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};
export const PassportPhotoForm: React.FC<Props> = ({
  activeTab,
  setActiveTab,
}) => {
  const params = useParams();
  const id = params?.id;
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const { contract_profile_picture, setContractDetails } =
    useContractDeatilStore();
  const initialValues = {
    photo: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        if (values.photo) {
          setContractDetails({
            contract_profile_picture: values.photo,
          });
          console.log(contract_profile_picture);
          navigate(`/invest-property/${id}`);
        } else {
          showToast("Please upload a passport photo", "error");
        }
      }}
    >
      {({ isValid, setFieldValue, values }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          <div className="flex justify-center">
            <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] h-[250px] flex flex-col justify-center items-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFieldValue("photo", file);
                  }
                }}
              />
              {values.photo || contract_profile_picture ? (
                <img
                  src={
                    values.photo
                      ? URL.createObjectURL(values.photo)
                      : contract_profile_picture != null
                      ? URL.createObjectURL(contract_profile_picture)
                      : ""
                  }
                  alt="Profile"
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex text-gray-300 text-center">
                  + Add Passport Image
                </div>
              )}
            </label>
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
