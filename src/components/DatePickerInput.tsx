import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";

interface DatePickerInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (date: Date | null) => {
    setFieldValue(name, date);
  };
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-600 text-sm mb-1">{label}</label>
      )}
      <div className="relative flex items-center justify-between bg-adron-body px-4 py-1 rounded-full">
        <DatePicker
          selected={field.value}
          onChange={handleChange}
          className="w-full p-1 outline-none text-gray-500"
          dateFormat="dd-MM-yyyy"
          placeholderText={placeholder}
          isClearable
        />
        <div className="flex gap-2 items-center">
          {hasError && <FaExclamationCircle className="w-5 h-5 text-red-500" />}
          <MdOutlineCalendarToday className="text-gray-900 ml-2" />
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default DatePickerInput;
