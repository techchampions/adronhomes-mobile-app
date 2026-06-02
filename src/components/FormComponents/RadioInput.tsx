// import { ErrorMessage, useField } from "formik";
// import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
// import React from "react";

// interface RadioOption {
//   value: string | number;
//   label: string;
//   description?: string;
//   icon?: React.ReactNode;
//   disabled?: boolean;
// }

// interface RadioInputProps {
//   name: string;
//   options: RadioOption[];
//   label?: string;
//   orientation?: "horizontal" | "vertical";
//   className?: string;
//   containerClassName?: string;
//   optionClassName?: string;
//   labelClassName?: string;
//   errorClassName?: string;
//   showError?: boolean;
//   required?: boolean;
// }

// const RadioInput: React.FC<RadioInputProps> = ({
//   name,
//   options,
//   label,
//   orientation = "vertical",
//   className = "",
//   containerClassName = "",
//   optionClassName = "",
//   labelClassName = "",
//   errorClassName = "",
//   showError = true,
//   required = false,
// }) => {
//   const [field, meta, helpers] = useField(name);
//   const hasError = meta.touched && meta.error;

//   const handleChange = (value: string | number) => {
//     helpers.setValue(value);
//     helpers.setValue(value);
//     helpers.setTouched(true);
//   };

//   return (
//     <div className={`w-full ${containerClassName}`}>
//       {/* Label */}
//       {label && (
//         <label
//           className={`block text-sm font-medium text-gray-700 mb-3 ${labelClassName}`}
//         >
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       {/* Radio Options Container */}
//       <div
//         className={`flex gap-2 ${
//           orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
//         } ${className}`}
//       >
//         {options.map((option) => {
//           const isSelected = field.value === option.value;
//           const optionHasError = hasError && isSelected;
//           const isDisabled = option.disabled;

//           return (
//             <div key={`${name}-${option.value}`} className={`relative`}>
//               <input
//                 type="radio"
//                 id={`${name}-${option.value}`}
//                 name={name}
//                 value={option.value}
//                 checked={isSelected}
//                 onChange={() => !isDisabled && handleChange(option.value)}
//                 disabled={isDisabled}
//                 className="sr-only"
//               />

//               <label
//                 htmlFor={`${name}-${option.value}`}
//                 className={`flex items-start p-2 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
//                   isDisabled
//                     ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
//                     : isSelected
//                     ? "border-adron-green bg-green-50 shadow-sm"
//                     : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//                 } ${
//                   optionHasError ? "!border-red-500 !bg-red-50" : ""
//                 } ${optionClassName}`}
//               >
//                 {/* Custom Radio Circle */}
//                 <div className="flex-shrink-0 mt-0.5 mr-3">
//                   <div
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
//                       isDisabled
//                         ? "border-gray-300"
//                         : isSelected
//                         ? "border-adron-green bg-adron-green"
//                         : "border-gray-300"
//                     } ${optionHasError ? "!border-red-500" : ""}`}
//                   >
//                     {isSelected && !isDisabled && (
//                       <div className="w-2 h-2 rounded-full bg-white"></div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     {option.icon && (
//                       <div className="flex-shrink-0 text-gray-600">
//                         {option.icon}
//                       </div>
//                     )}
//                     <span
//                       className={`text-sm capitalize font-medium ${
//                         isDisabled
//                           ? "text-gray-500"
//                           : isSelected
//                           ? "text-adron-green font-normal"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {option.label}
//                     </span>
//                     {isSelected && !isDisabled && !optionHasError && (
//                       <FaCheckCircle className="w-4 h-4 text-adron-green ml-auto flex-shrink-0" />
//                     )}
//                     {isSelected && !isDisabled && optionHasError && (
//                       <FaExclamationCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />
//                     )}
//                   </div>

//                   {option.description && (
//                     <p
//                       className={`text-xs mt-1.5 ${
//                         isDisabled ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       {option.description}
//                     </p>
//                   )}
//                 </div>
//               </label>
//             </div>
//           );
//         })}
//       </div>

//       {/* Error Message */}
//       {showError && (
//         <ErrorMessage
//           name={name}
//           component="p"
//           className={`text-red-500 text-xs mt-2 ml-1 text-left ${errorClassName}`}
//         />
//       )}
//     </div>
//   );
// };

// export default RadioInput;

import { ErrorMessage, useField } from "formik";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";

interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface RadioInputProps {
  name: string;
  options: RadioOption[];
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  containerClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  showError?: boolean;
  required?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  label,
  orientation = "vertical",
  className = "",
  containerClassName = "",
  optionClassName = "",
  labelClassName = "",
  errorClassName = "",
  showError = true,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  // Show error only if field has been touched AND there's an error
  const shouldShowError = hasBeenTouched && meta.error;
  // Show error border on the selected option if there's an error
  const showErrorOnSelected = hasBeenTouched && meta.error;

  useEffect(() => {
    // When Formik touches the field (e.g., from form submission), update our local state
    if (meta.touched && !hasBeenTouched) {
      setHasBeenTouched(true);
    }
  }, [meta.touched, hasBeenTouched]);

  const handleChange = (value: string | number) => {
    // Only set touched if it hasn't been touched before OR if there's already an error
    if (!hasBeenTouched || meta.error) {
      setHasBeenTouched(true);
      helpers.setTouched(true);
    }

    helpers.setValue(value);

    // Clear error immediately when user selects an option
    if (meta.error) {
      // Setting the value will trigger validation and potentially clear the error
      // We also need to ensure the field is marked as touched for validation to run
      helpers.setTouched(true);
    }
  };

  const handleBlur = () => {
    setHasBeenTouched(true);
    helpers.setTouched(true);
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-3 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Radio Options Container */}
      <div
        className={`flex gap-2 ${
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        } ${className}`}
        onBlur={handleBlur}
      >
        {options.map((option) => {
          const isSelected = field.value === option.value;
          const isDisabled = option.disabled;

          return (
            <div key={`${name}-${option.value}`} className={`relative`}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => !isDisabled && handleChange(option.value)}
                onBlur={handleBlur}
                disabled={isDisabled}
                className="sr-only"
              />

              <label
                htmlFor={`${name}-${option.value}`}
                className={`flex items-start p-2 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isDisabled
                    ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
                    : isSelected
                    ? "border-adron-green bg-green-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                } ${
                  showErrorOnSelected && isSelected
                    ? "!border-red-500 !bg-red-50"
                    : ""
                } ${optionClassName}`}
              >
                {/* Custom Radio Circle */}
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isDisabled
                        ? "border-gray-300"
                        : isSelected
                        ? "border-adron-green bg-adron-green"
                        : "border-gray-300"
                    } ${
                      showErrorOnSelected && isSelected ? "!border-red-500" : ""
                    }`}
                  >
                    {isSelected && !isDisabled && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {showErrorOnSelected && isSelected && (
                      <FaExclamationCircle className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <div className="flex-shrink-0 text-gray-600">
                        {option.icon}
                      </div>
                    )}
                    <span
                      className={`text-sm capitalize font-medium ${
                        isDisabled
                          ? "text-gray-500"
                          : isSelected
                          ? "text-adron-green font-normal"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    {isSelected && !isDisabled && !showErrorOnSelected && (
                      <FaCheckCircle className="w-4 h-4 text-adron-green ml-auto flex-shrink-0" />
                    )}
                  </div>

                  {option.description && (
                    <p
                      className={`text-xs mt-1.5 ${
                        isDisabled ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {showError && shouldShowError && (
        <ErrorMessage
          name={name}
          component="p"
          className={`text-red-500 text-xs mt-2 ml-1 text-left ${errorClassName}`}
        />
      )}
    </div>
  );
};

export default RadioInput;
