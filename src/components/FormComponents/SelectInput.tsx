import { ErrorMessage, Field, useField } from "formik";
import React, { useRef } from "react";
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
  const selectRef = useRef<HTMLSelectElement>(null);

  const openSelect = () => {
    const element = selectRef.current;
    if (!element || disabled) return;
    element.focus();
    if (typeof element.showPicker === "function") {
      try {
        element.showPicker();
        return;
      } catch {
        element.click();
      }
    }
  };

  return (
    <div className="w-full text-left">
      {label && (
        <div className="text-sm text-gray-700 font-bold mb-2">{label}</div>
      )}

      <div
        className={`relative w-full rounded-xl ${
          hasError
            ? "border border-red-500"
            : theme === "dark"
            ? "border-none"
            : "border border-gray-200 focus-within:border-gray-200"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
      >
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
            {icon}
          </div>
        )}

        <Field
          as="select"
          innerRef={selectRef}
          {...field}
          disabled={disabled}
          className={`appearance-none ${
            theme === "dark" ? "text-gray-300" : "text-gray-900"
          } text-sm rounded-xl focus:ring-0 block w-full py-2 outline-none bg-transparent ${
            icon ? "pl-10" : "pl-5"
          } ${hasError ? "pr-16" : "pr-10"} ${!field.value ? "text-gray-400" : ""}`}
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

        <button
          type="button"
          aria-label="Open options"
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={openSelect}
          className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3"
        >
          {hasError && <FaExclamationCircle className="h-5 w-5 text-red-500" />}
          <FaChevronDown className="h-4 w-4 text-gray-400" />
        </button>
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
