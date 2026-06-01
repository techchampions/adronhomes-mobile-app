import { Field, ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";

interface CurrencyInputFieldProps {
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
  formatAsNaira?: boolean;
}

const formatToNaira = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "";

  const numberValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(numberValue)) return "";

  return (
    "₦" + numberValue.toLocaleString("en-NG", { minimumFractionDigits: 0 })
  );
};

const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  icon,
  rightIcon,
  className = "",
  rows = 4,
  isReadOnly = false,
  autocomplete,
  formatAsNaira = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [displayValue, setDisplayValue] = useState<string>("");

  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    if (formatAsNaira && field.value !== undefined) {
      setDisplayValue(formatToNaira(field.value));
    }
  }, [field.value, formatAsNaira]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/[^0-9]/g, "");
    if (formatAsNaira) {
      setValue(inputVal);
      setDisplayValue(formatToNaira(inputVal));
    } else {
      setValue(inputVal);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e); // Mark field as touched
  };

  return (
    <div className="w-full">
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border bg-adron-body rounded-full py-2 ${
          hasError ? "border-red-500" : "border-transparent"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-3">{icon}</div>
        )}

        {/* Field */}
        {formatAsNaira ? (
          <input
            type="text"
            name={name}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            readOnly={isReadOnly}
            autoComplete={autocomplete}
            className={`text-gray-900 text-base rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none h-4 placeholder:text-sm`}
          />
        ) : (
          <Field
            as={isTextarea ? "textarea" : "input"}
            {...field}
            type={isTextarea ? undefined : type}
            placeholder={placeholder}
            rows={isTextarea ? rows : undefined}
            readOnly={isReadOnly}
            autoComplete={autocomplete}
            className={` text-gray-900 text-base rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none h-4 placeholder:text-sm ${
              isTextarea ? "min-h-[60px]" : ""
            }`}
          />
        )}

        {/* Error Icon */}
        {!isTextarea && hasError && (
          <div className="flex items-center px-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 ml-5 text-left"
      />
    </div>
  );
};

export default CurrencyInputField;
