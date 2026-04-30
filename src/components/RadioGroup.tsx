import { useField } from "formik";
import { Info } from "lucide-react";
import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  optionClassName?: string;
  orientation?: "horizontal" | "vertical";
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  className = "",
  optionClassName = "",
  orientation = "vertical",
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p className="mb-2 font-medium text-gray-700 text-sm">{label}</p>
      )}

      <div
        className={`flex gap-2 ${
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        } ${className}`}
      >
        {options.map((option) => {
          const isSelected = field.value === option.value;

          return (
            <label
              key={option.value}
              className={`flex items-center justify-between border rounded-lg p-2 cursor-pointer transition-all 
                ${
                  isSelected
                    ? !hasError
                      ? "border-adron-green bg-primary/20"
                      : "border-red-500"
                    : "border-gray-300"
                }
                ${hasError ? "border-red-500" : ""} ${optionClassName}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Custom Radio Circle */}
                <div
                  className={`
                    w-5 h-5 rounded-full border flex items-center justify-center
                    ${
                      isSelected
                        ? !hasError
                          ? "border-adron-green bg-adron-green"
                          : "border-red-500 bg-red-500"
                        : "border-gray-400"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>

                <span className="text-gray-800 text-xs capitalize">
                  {option.label}
                </span>
              </div>

              {/* Hidden native radio input */}
              <input
                type="radio"
                {...field}
                value={option.value}
                checked={isSelected}
                onChange={() => helpers.setValue(option.value)}
                className="hidden"
              />
            </label>
          );
        })}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <Info className="w-4 h-4" />
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
