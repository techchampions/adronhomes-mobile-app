import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import { FaChevronDown, FaExclamationCircle } from "react-icons/fa";

interface SelectFieldInputProps {
  name: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  theme?: string;
  label?: string;
}

const SelectFieldInput: React.FC<SelectFieldInputProps> = ({
  name,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  icon,
  label,
  theme = "light",
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full text-left">
      <div className="text-sm">{label}</div>

      <div
        className={`w-full relative flex flex-row items-center border rounded-xl py-2 ${
          hasError
            ? "border-red-500"
            : theme === "dark"
            ? "border-gray-700"
            : "border-gray-200 focus-within:border-blue-400"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
      >
        {/* Left Icon */}
        {icon && <div className="flex items-center px-3">{icon}</div>}

        {/* Select Field */}
        <Field
          as="select"
          {...field}
          disabled={disabled}
          className={`appearance-none ${
            theme === "dark" ? "text-gray-300" : "text-gray-900"
          } text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none bg-transparent ${
            !field.value ? "text-gray-400" : ""
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>

        {/* Chevron Icon */}
        <div className="flex items-center px-3 pointer-events-none">
          <FaChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Error Icon */}
        {hasError && (
          <div className="flex items-center px-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[9px] mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default SelectFieldInput;
