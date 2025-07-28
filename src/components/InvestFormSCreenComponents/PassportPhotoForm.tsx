// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import InputField from "../InputField";
// import SelectField from "../SelectField";
// import Button from "../Button";
// import { ArrowLeft, ArrowRight, Trash, Upload, X } from "lucide-react";
// import React from "react";
// import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
// import { useNavigate, useParams } from "react-router-dom";
// import { TbCameraPlus } from "react-icons/tb";
// import { useToastStore } from "../../zustand/useToastStore";
// import {
//   IoInformationCircle,
//   IoInformationCircleOutline,
//   IoTrash,
//   IoTrashBin,
// } from "react-icons/io5";

// const customerInfoSchema = Yup.object({
//   //   photo: Yup.string().required("Required"),
//   //   relationship: Yup.string().required("Required"),
// });
// type Props = {
//   activeTab: number;
//   setActiveTab: (index: number) => void;
// };
// export const PassportPhotoForm: React.FC<Props> = ({
//   activeTab,
//   setActiveTab,
// }) => {
//   const params = useParams();
//   const id = params?.id;
//   const { showToast } = useToastStore();
//   const navigate = useNavigate();
//   const {
//     contract_profile_picture,
//     contract_profile_picture2,
//     contract_idFile,
//     setContractDetails,
//   } = useContractDeatilStore();
//   const initialValues = {
//     ownerPhoto1: null,
//     ownerPhoto2: null,
//     idFile: null,
//   };
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={customerInfoSchema}
//       onSubmit={(values) => {
//         if (values.ownerPhoto1) {
//           setContractDetails({
//             contract_profile_picture: values.ownerPhoto1,
//             contract_profile_picture2: values.ownerPhoto2,
//             contract_idFile: values.idFile,
//           });
//           navigate(`/invest-property/${id}`);
//         } else {
//           showToast("Please upload a passport photo", "error");
//         }
//       }}
//     >
//       {({ isValid, setFieldValue, values }) => (
//         <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
//           {/* passport */}
//           <div className="flex flex-col gap-5 justify-center">
//             <div className="flex flex-col">
//               <div className="font-semibold">Owner Passport Photo</div>
//               <div className="flex text-xs items-center-safe text-gray-400">
//                 <IoInformationCircleOutline />
//                 <span className="flex-1">
//                   Upload passport photo for verification of ownership
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-4">
//               <div className="flex flex-col relative">
//                 {/* <div
//                   className="absolute z-50 top-2 flex gap-1 items-center right-2 text-red-500 text-sm"
//                   onClick={() => {
//                     console.log("clearing");
//                     setContractDetails({
//                       contract_profile_picture: null,
//                     });
//                     setFieldValue("ownerPhoto1", null);
//                   }}
//                 >
//                   <span>clear</span>
//                   <IoTrash className="" />
//                 </div> */}
//                 <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] h-[250px] flex flex-col justify-center items-center">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFieldValue("ownerPhoto1", file);
//                       }
//                     }}
//                   />
//                   {values.ownerPhoto1 || contract_profile_picture ? (
//                     <img
//                       src={
//                         values.ownerPhoto1
//                           ? URL.createObjectURL(values.ownerPhoto1)
//                           : contract_profile_picture != null
//                           ? URL.createObjectURL(contract_profile_picture)
//                           : ""
//                       }
//                       alt="Profile"
//                       className="w-full h-full rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="flex text-gray-300 text-center">
//                       + Add Passport Image
//                     </div>
//                   )}
//                 </label>
//                 <div className="text-sm w-full text-center">
//                   Principal Owner Photo
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] h-[250px] flex flex-col justify-center items-center">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFieldValue("ownerPhoto2", file);
//                       }
//                     }}
//                   />
//                   {values.ownerPhoto2 || contract_profile_picture2 ? (
//                     <img
//                       src={
//                         values.ownerPhoto2
//                           ? URL.createObjectURL(values.ownerPhoto2)
//                           : contract_profile_picture2 != null
//                           ? URL.createObjectURL(contract_profile_picture2)
//                           : ""
//                       }
//                       alt="Profile"
//                       className="w-full h-full rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="flex text-gray-300 text-center">
//                       + Add Passport Image
//                     </div>
//                   )}
//                 </label>
//                 <div className="text-sm w-full text-center">Co-Owner Photo</div>
//               </div>
//             </div>
//           </div>
//           {/* means of identification */}
//           <div className="flex flex-col gap-5 justify-center">
//             <div className="flex flex-col">
//               <div className="font-semibold">Means of Identification</div>
//               <div className="flex text-xs items-center-safe text-gray-400">
//                 <IoInformationCircleOutline />
//                 <span className="flex-1">
//                   Upload means of identification example:(NIN,CAC etc.)
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex flex-col w-full">
//                 <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] md:w-full h-[250px] flex flex-col justify-center items-center">
//                   <input
//                     type="file"
//                     accept=""
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFieldValue("idFile", file);
//                       }
//                     }}
//                   />
//                   {values.idFile || contract_idFile ? (
//                     <img
//                       src={
//                         values.idFile
//                           ? URL.createObjectURL(values.idFile)
//                           : contract_idFile != null
//                           ? URL.createObjectURL(contract_idFile)
//                           : ""
//                       }
//                       alt="Profile"
//                       className="w-full h-full rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <svg
//                         className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 16"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                         />
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>{" "}
//                         or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         SVG, PNG, JPG or GIF (MAX. 800x400px)
//                       </p>
//                     </div>
//                   )}
//                 </label>
//                 <div className="text-xs mt-2 text-gray-400 w-full text-center flex items-center">
//                   <IoInformationCircle />
//                   <span>File type can be in JPEG, PNG, GIF, BMP</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <Button
//               label="Prev"
//               icon={<ArrowLeft />}
//               onClick={() => setActiveTab(activeTab - 1)}
//               className="!w-fit px-4 !rounded-lg !bg-black"
//             />
//             <Button
//               label="Next"
//               type="submit"
//               disabled={!isValid}
//               rightIcon={<ArrowRight />}
//               className="!w-fit px-4 !rounded-lg"
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import { ArrowLeft, ArrowRight, Trash, Upload, X } from "lucide-react";
import React from "react";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
import { useNavigate, useParams } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { useToastStore } from "../../zustand/useToastStore";
import {
  IoInformationCircle,
  IoInformationCircleOutline,
  IoTrash,
  IoTrashBin,
} from "react-icons/io5";

const customerInfoSchema = Yup.object({
  ownerPhoto1: Yup.mixed().required("Principal owner photo is required"),
  // idFile: Yup.mixed().required("Means of identification is required"),
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
          // contract_idFile: values.idFile,
        });
        setActiveTab(activeTab + 1);

        // navigate(`/invest-property/${id}`);
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
              <div className="flex flex-col relative">
                <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] h-[250px] flex flex-col justify-center items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const error = validateFile(file);
                        if (error) {
                          showToast(error, "error");
                          return;
                        }
                        setFieldValue("ownerPhoto1", file);
                      }
                    }}
                  />
                  {values.ownerPhoto1 ? (
                    <>
                      <img
                        src={
                          values.ownerPhoto1 instanceof File
                            ? URL.createObjectURL(values.ownerPhoto1)
                            : values.ownerPhoto1
                        }
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFieldValue("ownerPhoto1", null);
                        }}
                      >
                        <IoTrash size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex text-gray-300 text-center">
                      + Add Passport Image
                    </div>
                  )}
                </label>
                <div className="text-sm w-full text-center">
                  Principal Owner Photo
                </div>
                {errors.ownerPhoto1 && touched.ownerPhoto1 && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.ownerPhoto1}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] h-[250px] flex flex-col justify-center items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const error = validateFile(file);
                        if (error) {
                          showToast(error, "error");
                          return;
                        }
                        setFieldValue("ownerPhoto2", file);
                      }
                    }}
                  />
                  {values.ownerPhoto2 ? (
                    <>
                      <img
                        src={
                          values.ownerPhoto2 instanceof File
                            ? URL.createObjectURL(values.ownerPhoto2)
                            : values.ownerPhoto2
                        }
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFieldValue("ownerPhoto2", null);
                        }}
                      >
                        <IoTrash size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex text-gray-300 text-center">
                      + Add Passport Image
                    </div>
                  )}
                </label>
                <div className="text-sm w-full text-center">Co-Owner Photo</div>
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
