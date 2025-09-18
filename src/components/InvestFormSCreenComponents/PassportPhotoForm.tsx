import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { useNavigate, useParams } from "react-router-dom";
import { useToastStore } from "../../zustand/useToastStore";
import { IoInformationCircleOutline } from "react-icons/io5";
import ImageUploadField from "../ImageUplaodField2";

const customerInfoSchema = Yup.object({
  ownerPhoto1: Yup.mixed().required("Principal owner photo is required"),
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
  const {
    contract_profile_picture,
    contract_profile_picture2,
    setContractDetails,
  } = useContractDeatilStore();

  const initialValues = {
    ownerPhoto1: contract_profile_picture || null,
    ownerPhoto2: contract_profile_picture2 || null,
    // idFile: contract_idFile || null,
  };

  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "application/pdf",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      return "Unsupported file format";
    }
    if (file.size > maxFileSize) {
      return "File size too large (max 5MB)";
    }
    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerInfoSchema}
      onSubmit={(values) => {
        setContractDetails({
          contract_profile_picture: values.ownerPhoto1,
          contract_profile_picture2: values.ownerPhoto2,
        });
        setActiveTab(activeTab + 1);
      }}
    >
      {({ isValid, setFieldValue, values, errors, touched }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          {/* passport */}
          <div className="flex flex-col gap-5 justify-center pb-10">
            <div className="flex flex-col">
              <div className="font-semibold">Owner Passport Photo</div>
              <div className="flex text-xs items-center-safe text-gray-400">
                <IoInformationCircleOutline />
                <span className="flex-1">
                  Upload passport photo for verification of ownership
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-start gap-5 mb-4">
                <ImageUploadField
                  name="ownerPhoto1"
                  label="Principal Owner Photo"
                  infoText="Upload a clear photo of your face"
                  className="!w-fit"
                />
                <ImageUploadField
                  name="ownerPhoto2"
                  label="Co-Owner Photo"
                  infoText="Upload a clear photo of the co-owner"
                  className="!w-fit"
                />
              </div>
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
