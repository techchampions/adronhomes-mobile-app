import React from "react";
import { ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";

interface CustomDateInputProps {
  name: string;
  label?: string;
  maxDate?: string;
  minDate?: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  name,
  label,
  maxDate,
  minDate,
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  // Format Date object to YYYY-MM-DD string for input[type="date"]
  const formatDateForInput = (date: Date | string) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-600 text-sm mb-1">{label}</label>
      )}

      <div className="relative">
        <input
          type="date"
          {...field}
          value={formatDateForInput(field.value)}
          max={maxDate}
          min={minDate}
          className={` bg-adron-body rounded-fulltext-gray-900 h-[35px]  text-base rounded-full focus:ring-0 block w-full px-5 outline-none resize-none  placeholder:text-sm ${
            hasError ? "border border-red-500" : "border-gray-300"
          }`}
        />

        {hasError && (
          <div className="flex items-center mt-1 text-red-500">
            <FaExclamationCircle className="mr-1" />
            <span className="text-[10px]">{meta.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDateInput;
