import React from "react";
import { IoInformationCircleOutline, IoTrash } from "react-icons/io5";
import { useToastStore } from "../zustand/useToastStore";

interface ImageUploadInputProps {
  name: string;
  label: string;
  value: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
  touched?: boolean;
  infoText?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  aspectRatio?: string;
  width?: number;
  height?: number;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  touched,
  infoText,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  aspectRatio = "9/16",
  width = 225,
  height = 250,
}) => {
  const { showToast } = useToastStore();

  const validateFile = (file: File) => {
    if (!acceptedFileTypes.includes(file.type)) {
      return "Unsupported file format";
    }
    if (file.size > maxFileSize) {
      return "File size too large (max 5MB)";
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        showToast(error, "error");
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="flex flex-col relative">
      {infoText && (
        <div className="flex text-xs items-center-safe text-gray-400 mb-2">
          <IoInformationCircleOutline />
          <span className="flex-1 ml-1">{infoText}</span>
        </div>
      )}
      <label
        className="cursor-pointer border border-dashed border-gray-300 overflow-hidden p-2 rounded-2xl relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          aspectRatio,
        }}
      >
        <input
          type="file"
          name={name}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
        {value ? (
          <>
            <img
              src={value instanceof File ? URL.createObjectURL(value) : value}
              alt="Uploaded preview"
              className="w-full h-full rounded-xl object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              onClick={handleRemove}
            >
              <IoTrash size={16} />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            + Add Image
          </div>
        )}
      </label>
      <div className="text-sm w-full text-center mt-2">{label}</div>
      {error && touched && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};
