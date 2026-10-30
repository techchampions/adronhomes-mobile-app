import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  HouseholdKind,
  HouseholdMember,
  useAddHouseholdMember,
  useUpdateHouseholdMember,
} from "../../hooks/estateCommunity/useEstateCommunity";
import Button from "../Button";
import InputField from "../InputField";

interface Prop {
  estateId: number;
  kind: HouseholdKind;
  member?: HouseholdMember;
  onClose: () => void;
}

const AddHouseholdMember: React.FC<Prop> = ({ estateId, kind, member, onClose }) => {
  const add = useAddHouseholdMember();
  const update = useUpdateHouseholdMember();
  const isFamily = kind === "family";
  const isEdit = Boolean(member);
  const isPending = add.isPending || update.isPending;
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(member?.profile_picture || null);

  const initialValues = {
    full_name: member?.full_name || "",
    role_label: member?.role_label || "",
    phone: member?.phone || "",
    email: member?.email || "",
  };

  const choosePicture = (file?: File) => {
    if (!file) return;
    setPicture(file);
    setPreview((current) => {
      if (current?.startsWith("blob:")) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  };

  const submit = (values: typeof initialValues) => {
    const details = {
      full_name: values.full_name.trim(),
      role_label: values.role_label.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      profile_picture: picture,
    };

    if (member) {
      update.mutate({ id: member.id, ...details }, { onSuccess: () => onClose() });
      return;
    }

    add.mutate(
      { estate_id: estateId, kind, ...details },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors: Partial<typeof initialValues> = {};
          if (!values.full_name.trim()) errors.full_name = "Name is required";
          if (!values.role_label.trim()) errors.role_label = "Role is required";
          if (!values.phone.trim()) errors.phone = "Phone is required";
          if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
            errors.email = "Enter a valid email";
          }
          return errors;
        }}
        onSubmit={submit}
      >
        {() => (
          <Form className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xl font-bold text-gray-800">
                {isEdit
                  ? isFamily
                    ? "Edit family member"
                    : "Edit staff"
                  : isFamily
                    ? "Add family member"
                    : "Add staff"}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100"
              >
                <FiX className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-4 py-2">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#79B833]/15 text-lg font-semibold text-[#032147]">
                  {preview ? (
                    <img src={preview} alt="" className="h-full w-full object-cover" />
                  ) : (
                    "Photo"
                  )}
                </span>
                <span>
                  <span className="block text-sm font-medium text-gray-700">Profile picture</span>
                  <span className="mt-1 block text-xs text-gray-500">JPG or PNG, up to 5 MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#79B833]/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#032147]"
                    onChange={(event) => choosePicture(event.target.files?.[0])}
                  />
                </span>
              </label>
              <InputField
                name="full_name"
                label="Full name"
                placeholder="Enter full name"
                className="rounded-xl py-3"
              />
              <InputField
                name="role_label"
                label={isFamily ? "Relationship" : "Role"}
                placeholder={
                  isFamily ? "Spouse, child, parent" : "Driver, housekeeper, nanny"
                }
                className="rounded-xl py-3"
              />
              <InputField
                name="phone"
                type="tel"
                label="Phone"
                placeholder="Enter phone number"
                className="rounded-xl py-3"
              />
              <InputField
                name="email"
                type="email"
                label="Email"
                placeholder="Optional"
                className="rounded-xl py-3"
              />
              <Button
                type="submit"
                label={isEdit ? "Save changes" : isFamily ? "Add family member" : "Add staff"}
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#79B833] to-[#8FD14F] py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#79B833]/30"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddHouseholdMember;
