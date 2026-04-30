import { useField } from "formik";
import { Info } from "lucide-react";
import React, { useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  optionClassName?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  maxSelections?: number;
  minSelections?: number;
  defaultSelectAll?: boolean; // New prop for default select all
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  className = "",
  optionClassName = "",
  orientation = "vertical",
  disabled = false,
  maxSelections,
  minSelections,
  defaultSelectAll = false, // Default to false
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  // Ensure field value is always an array
  const selectedValues: string[] = Array.isArray(field.value)
    ? field.value
    : [];

  // Handle default select all on initial load
  useEffect(() => {
    // Only run if defaultSelectAll is true and field value is empty/undefined
    if (defaultSelectAll && options.length > 0 && !field.value) {
      const allValues = options.map((opt) => opt.value);

      // Respect maxSelections if provided
      if (maxSelections && allValues.length > maxSelections) {
        helpers.setValue(allValues.slice(0, maxSelections));
      } else {
        helpers.setValue(allValues);
      }
    }

    // Validate minSelections if value exists
    if (minSelections && field.value && field.value.length < minSelections) {
      helpers.setError(`Please select at least ${minSelections} option(s)`);
    }
  }, []); // Run only once on mount

  // Re-run when options change (if defaultSelectAll is true and no value set)
  useEffect(() => {
    if (
      defaultSelectAll &&
      options.length > 0 &&
      (!field.value || field.value.length === 0)
    ) {
      const allValues = options.map((opt) => opt.value);

      if (maxSelections && allValues.length > maxSelections) {
        helpers.setValue(allValues.slice(0, maxSelections));
      } else {
        helpers.setValue(allValues);
      }
    }
  }, [options, defaultSelectAll, maxSelections]);

  const handleChange = (value: string, checked: boolean) => {
    let newValues: string[];

    if (checked) {
      // Add value if under max limit
      if (maxSelections && selectedValues.length >= maxSelections) {
        return;
      }
      newValues = [...selectedValues, value];
    } else {
      // Remove value
      newValues = selectedValues.filter((v) => v !== value);
    }

    helpers.setValue(newValues);
  };

  const handleSelectAll = () => {
    if (disabled) return;

    if (selectedValues.length === options.length) {
      // Deselect all
      helpers.setValue([]);
    } else {
      // Select all (respecting max limit if any)
      const allValues = options.map((opt) => opt.value);
      if (maxSelections && allValues.length > maxSelections) {
        helpers.setValue(allValues.slice(0, maxSelections));
      } else {
        helpers.setValue(allValues);
      }
    }
  };

  const isAllSelected =
    selectedValues.length === options.length && options.length > 0;
  const isIndeterminate =
    selectedValues.length > 0 && selectedValues.length < options.length;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-gray-700 text-sm">{label}</p>

          {/* Select All / Deselect All button */}
          {options.length > 1 && !disabled && !defaultSelectAll && (
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-xs text-adron-green hover:text-shadow-sm font-medium"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </button>
          )}
        </div>
      )}

      {/* Selection counter (if max/min defined) */}
      {(maxSelections || minSelections) && (
        <p
          className={`text-xs mb-2 ${
            selectedValues.length > (maxSelections || Infinity)
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {selectedValues.length} selected
          {maxSelections && ` / ${maxSelections} max`}
          {minSelections && ` (min: ${minSelections})`}
        </p>
      )}

      <div
        className={`flex gap-2 ${
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        }`}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled =
            disabled ||
            (maxSelections &&
              !isSelected &&
              selectedValues.length >= maxSelections);

          return (
            <label
              key={option.value}
              className={`flex items-center justify-between border rounded-lg p-2 cursor-pointer transition-all 
                ${
                  isSelected
                    ? !hasError
                      ? "border-adron-green bg-adron-green/10"
                      : "border-red-500"
                    : "border-gray-300"
                }
                ${hasError ? "border-red-500" : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${optionClassName}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Custom Checkbox Square */}
                <div
                  className={`
                    w-5 h-5 rounded-md border flex items-center justify-center transition-all
                    ${
                      isSelected
                        ? !hasError
                          ? "border-adron-green bg-adron-green"
                          : "border-red-500 bg-red-500"
                        : "border-gray-400 bg-white"
                    }
                    ${isDisabled ? "opacity-50" : ""}
                  `}
                >
                  {isSelected && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <span
                  className={`text-gray-800 text-xs capitalize ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  {option.label}
                </span>
              </div>

              {/* Hidden native checkbox input */}
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={isDisabled ? true : false}
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

export default CheckboxGroup;
