import { useField } from "formik";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface DateInputProps {
  name: string;
  label?: string;
  maxDate?: string;
  minDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({
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
        <label className="block text-gray-600 text-sm mb-1 font-bold">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="date"
          {...field}
          value={formatDateForInput(field.value)}
          max={maxDate}
          min={String(minDate)}
          className={`w-full py-2 px-4 bg-adron-body rounded-xl uppercase text-gray-600 ${
            hasError ? "border border-red-500" : "border-gray-300"
          }`}
        />

        {hasError && (
          <div className="flex items-center mt-1 text-red-500">
            <FaExclamationCircle className="mr-1" />
            <span className="text-xs">{meta.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateInput;
