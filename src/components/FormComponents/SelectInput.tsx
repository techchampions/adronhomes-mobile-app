import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import { FaChevronDown, FaExclamationCircle } from "react-icons/fa";

interface SelectInputProps {
  name: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  theme?: string;
  label?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
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
      {label && (
        <div className="text-sm text-gray-700 font-bold mb-2">{label}</div>
      )}

      <div
        className={`w-full relative flex flex-row items-center rounded-xl py-2 ${
          hasError
            ? "border border-red-500"
            : theme === "dark"
            ? "border-none"
            : "border border-gray-200 focus-within:border-gray-200"
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
          } text-sm rounded-lg focus:ring-0 block w-full pl-5 outline-none bg-transparent ${
            !field.value ? "text-gray-400" : ""
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </option>
          ))}
        </Field>

        {/* Chevron Icon */}
        <div className="flex items-center pr-3 pointer-events-none">
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

export default SelectInput;
