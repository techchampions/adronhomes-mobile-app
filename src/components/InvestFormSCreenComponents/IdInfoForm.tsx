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

// const IdInfoSchema = Yup.object({
//   idFile: Yup.mixed().required("Means of identification is required"),
// });

// type Props = {
//   activeTab: number;
//   setActiveTab: (index: number) => void;
// };

// export const IdInfoForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
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
//     idFile: contract_idFile || null,
//   };

//   const acceptedFileTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/bmp",
//     "application/pdf",
//   ];
//   const maxFileSize = 5 * 1024 * 1024; // 5MB

//   const validateFile = (file: File) => {
//     if (!acceptedFileTypes.includes(file.type)) {
//       return "Unsupported file format";
//     }
//     if (file.size > maxFileSize) {
//       return "File size too large (max 5MB)";
//     }
//     return null;
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={IdInfoSchema}
//       onSubmit={(values) => {
//         setContractDetails({
//           contract_idFile: values.idFile,
//         });
//         navigate(`/invest-property/${id}`);
//       }}
//     >
//       {({ isValid, setFieldValue, values, errors, touched }) => (
//         <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
//           {/* means of identification */}
//           <div className="flex flex-col gap-5 justify-center">
//             <div className="flex flex-col">
//               <div className="font-semibold">Means of Identification</div>
//               <div className="flex text-xs items-center-safe text-gray-400">
//                 <IoInformationCircleOutline />
//                 <span className="flex-1">
//                   Upload means of identification example:(NIN, CAC, Passport,
//                   Driver's License etc.)
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex flex-col w-full">
//                 <label className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative w-[225px] md:w-full h-[250px] flex flex-col justify-center items-center">
//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf"
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         const error = validateFile(file);
//                         if (error) {
//                           showToast(error, "error");
//                           return;
//                         }
//                         setFieldValue("idFile", file);
//                       }
//                     }}
//                   />
//                   {values.idFile ? (
//                     <>
//                       {values.idFile.type?.includes("image") ? (
//                         <img
//                           src={
//                             values.idFile instanceof File
//                               ? URL.createObjectURL(values.idFile)
//                               : values.idFile
//                           }
//                           alt="Identification"
//                           className="w-full h-full rounded-xl object-cover"
//                         />
//                       ) : (
//                         <div className="flex flex-col items-center justify-center p-4">
//                           <div className="bg-gray-100 p-3 rounded-full mb-3">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-10 w-10 text-gray-400"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                               />
//                             </svg>
//                           </div>
//                           <p className="text-sm font-medium text-gray-700">
//                             {values.idFile.name}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {(values.idFile.size / 1024 / 1024).toFixed(2)} MB
//                           </p>
//                         </div>
//                       )}
//                       <button
//                         type="button"
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setFieldValue("idFile", null);
//                         }}
//                       >
//                         <IoTrash size={16} />
//                       </button>
//                     </>
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
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                         />
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         JPG, PNG, GIF, BMP or PDF (MAX. 5MB)
//                       </p>
//                     </div>
//                   )}
//                 </label>
//                 {errors.idFile && touched.idFile && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {errors.idFile}
//                   </div>
//                 )}
//                 <div className="text-xs mt-2 text-gray-400 w-full text-center flex items-center">
//                   <IoInformationCircle />
//                   <span>
//                     File type can be in JPEG, PNG, GIF, BMP or PDF (Max 5MB)
//                   </span>
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

const IdInfoSchema = Yup.object({
  idFiles: Yup.array()
    .min(1, "At least one file is required")
    .required("Means of identification is required"),
});

type Props = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};

export const IdInfoForm: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const params = useParams();
  const id = params?.id;
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const {
    contract_profile_picture,
    contract_profile_picture2,
    contract_idFiles, // Changed from contract_idFile to contract_idFiles
    setContractDetails,
  } = useContractDeatilStore();

  const initialValues = {
    idFiles: contract_idFiles || [], // Now initializing as an array
  };

  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "application/pdf",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFiles = 3; // Maximum number of files allowed

  const validateFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      return "Unsupported file format";
    }
    if (file.size > maxFileSize) {
      return "File size too large (max 5MB)";
    }
    return null;
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    values: any
  ) => {
    const files = event.target.files;
    if (!files) return;

    // Check if adding these files would exceed the maximum
    if (values.idFiles.length + files.length > maxFiles) {
      showToast(`Maximum ${maxFiles} files allowed`, "error");
      return;
    }

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file);
      if (error) {
        showToast(`${file.name}: ${error}`, "error");
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setFieldValue("idFiles", [...values.idFiles, ...validFiles]);
    }
  };

  const removeFile = (index: number, setFieldValue: any, values: any) => {
    const newFiles = [...values.idFiles];
    newFiles.splice(index, 1);
    setFieldValue("idFiles", newFiles);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={IdInfoSchema}
      onSubmit={(values) => {
        setContractDetails({
          contract_idFiles: values.idFiles, // Updated to use array
        });
        navigate(`/invest-property/${id}`);
      }}
    >
      {({ isValid, setFieldValue, values, errors, touched }) => (
        <Form className="space-y-4 py-5 w-full md:w-[80%] mx-auto">
          {/* means of identification */}
          <div className="flex flex-col gap-5 justify-center">
            <div className="flex flex-col">
              <div className="font-semibold">Means of Identification</div>
              <div className="flex text-xs items-center-safe text-gray-400">
                <IoInformationCircleOutline />
                <span className="flex-1">
                  Upload means of identification example:(NIN, CAC, Passport,
                  Driver's License etc.)
                </span>
              </div>
            </div>

            {/* File upload area */}
            <div className="flex flex-col gap-4">
              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileUpload(e, setFieldValue, values)}
                />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, GIF, BMP or PDF (MAX. 5MB each)
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {values.idFiles.length} / {maxFiles} files uploaded
                  </p>
                </div>
              </label>

              {/* Uploaded files preview */}
              {values.idFiles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {values.idFiles.map((file: File, index: number) => (
                    <div
                      key={index}
                      className="relative border-2 border-dashed border-gray-300 rounded-lg p-3"
                    >
                      {file.type.includes("image") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Identification ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32">
                          <div className="bg-gray-100 p-2 rounded-full mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-gray-700 text-center truncate w-full">
                            {file.name}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            removeFile(index, setFieldValue, values)
                          }
                        >
                          <IoTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errors.idFiles && touched.idFiles && (
              <div className="text-red-500 text-xs mt-1">
                {typeof errors.idFiles === "string"
                  ? errors.idFiles
                  : "Please upload at least one file"}
              </div>
            )}

            <div className="text-xs text-gray-400 flex items-center">
              <IoInformationCircle className="mr-1" />
              <span>
                File types: JPEG, PNG, GIF, BMP or PDF (Max 5MB each, up to{" "}
                {maxFiles} files)
              </span>
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
