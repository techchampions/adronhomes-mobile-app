import { Field, ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import React from "react";

interface InputFieldProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  name: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
  isReadOnly?: boolean;
  autocomplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  icon,
  rightIcon,
  className = "",
  rows = 4,
  isReadOnly = false,
  autocomplete,
}) => {
  const [field, meta] = useField(name);
  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full">
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border bg-adron-body rounded-full py-1.5 sm:py-2 ${
          hasError ? "border-red-500" : "border-transparent"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-2 sm:px-3">{icon}</div>
        )}

        {/* Field */}
        <Field
          as={isTextarea ? "textarea" : "input"}
          {...field}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          rows={isTextarea ? rows : undefined}
          readOnly={isReadOnly}
          autoComplete={autocomplete}
          className={`text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-0 block w-full px-3 sm:px-4 outline-none resize-none ${
            isTextarea ? "min-h-[50px] sm:min-h-[60px]" : ""
          }`}
        />

        {/* Error Icon */}
        {!isTextarea && hasError && (
          <div className="flex items-center px-2 sm:px-3">
            <FaExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <div className="flex items-center pr-2 sm:pr-3">{rightIcon}</div>
        )}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-0.5 sm:mt-1 ml-3 sm:ml-4 text-left"
      />
    </div>
  );
};

export default InputField;