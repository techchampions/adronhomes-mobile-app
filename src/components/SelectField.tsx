import { useField } from "formik";
import React from "react";
import { IoCaretDown } from "react-icons/io5";

interface Option {
  id?: string | number;
  name?: string;
}
interface SelectFieldProps {
  name: string;
  options: string[];
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  options,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full relative rounded-full">
      <select
        {...field}
        className={`w-full py-2.5 px-4 pr-10 rounded-full appearance-none text-xs text-gray-500  bg-adron-body  focus:outline-none ${
          hasError ? "border border-red-500" : "border border-transparent"
        }`}
      >
        {placeholder && (
          <option value="" className="text-gray-400">
            {placeholder}
          </option>
        )}
        {options.map((opt, idx) => (
          <option value={opt.id ? opt.id : opt} key={idx}>
            {opt.name ? opt.name : opt}
          </option>
        ))}
      </select>

      {/* Custom Chevron Icon */}
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-700">
        <IoCaretDown className="text-md" />
      </div>

      {/* Error Message */}
      {hasError && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
};

export default SelectField;
