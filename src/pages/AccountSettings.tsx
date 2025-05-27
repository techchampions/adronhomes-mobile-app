import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Switch } from "@headlessui/react"; // optional for toggle UI
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useModalStore } from "../zustand/useModalStore";
import { useGetUser } from "../data/hooks";
import Loader from "../components/Loader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import apiClient from "../data/apiClient";
import { useToastStore } from "../zustand/useToastStore";
import { TbCameraPlus } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();
  const [isPassword, setisPassword] = useState(false);

  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { data, isLoading, isError } = useGetUser();
  const userData = data?.user;
  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;

  const initialValues = {
    firstName: `${userData.first_name}`,
    lastName: ` ${userData.last_name}`,
    email: `${userData.email}`,
    phone: `${userData.phone_number}`,
    state: `${userData.state}`,
    country: `${userData.country}`,
    lga: `${userData.lga}`,
    address: `${userData.address}`,
    password: "",
    passwordConfirmation: "",
    newPropertyNotification: userData.notification_enabled == 1 ? true : false,
    promoNotification: false,
    profilePicture: null,
  };

  const withoutPass = Yup.object({
    firstName: Yup.string().required("Frist Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    state: Yup.string().required("State is required"),
    lga: Yup.string().required("LGA is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
  });

  const withPass = Yup.object({
    firstName: Yup.string().required("Frist Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    state: Yup.string().required("State is required"),
    lga: Yup.string().required("LGA is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });
  const validationSchema = isPassword ? withPass : withoutPass;

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      if (values.firstName) {
        formData.append("first_name", values.firstName);
      }
      if (values.lastName) {
        formData.append("last_name", values.lastName);
      }
      if (values.phone) {
        formData.append("phone_number", values.phone);
      }
      if (values.country) {
        formData.append("country", values.country);
      }
      if (values.state) {
        formData.append("state", values.state);
      }
      if (values.lga) {
        formData.append("lga", values.lga);
      }
      if (values.address) {
        formData.append("address", values.address);
      }
      formData.append(
        "notification_enabled",
        values.newPropertyNotification ? "1" : "0"
      );

      if (values.password) {
        formData.append("password", values.password);
        formData.append("password_confirmation", values.passwordConfirmation);
      }

      if (values.profilePicture) {
        formData.append("profile_picture", values.profilePicture);
      }

      const response = await apiClient.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("Profile updated successfully", "success");
      // navigate("/my-profile");

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      // showToast("Error updating profile", "error");
      if (error.response) {
        const data = error.response.data;

        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join("\n");
          showToast(errorMessages, "error");
        } else if (data.message) {
          showToast(data.message, "error");
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
        }
      }

      console.error("Error updating profile:", error);
    }
  };

  const confirmChangePassword = async (values: typeof initialValues) => {
    console.log("Changing password with values:", values);
    try {
      const formData = new FormData();

      if (values.password && values.passwordConfirmation) {
        formData.append("password", values.password);
        formData.append("password_confirmation", values.passwordConfirmation);
      }

      const response = await apiClient.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("Password changed successfully", "success");
      // navigate("/my-profile");

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      if (error.response) {
        const data = error.response.data;

        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join("\n");
          showToast(errorMessages, "error");
        } else if (data.message) {
          showToast(data.message, "error");
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
        }
      }
    }

    closeModal();
  };

  return (
    <div className="mx-auto rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          if (values.password || values.passwordConfirmation) {
            setisPassword(true);
          }
          return (
            <Form className="space-y-6">
              {/* Profile Picture */}
              <div className="bg-white rounded-3xl p-10 space-y-6">
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue("profilePicture", file);
                        }
                      }}
                    />
                    <img
                      src={
                        values.profilePicture
                          ? URL.createObjectURL(values.profilePicture)
                          : userData.profile_picture
                          ? userData.profile_picture
                          : "/user.svg"
                      }
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <TbCameraPlus
                      size={20}
                      className="absolute bottom-0 -right-5 text-gray-500"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <label className="block text-gray-600 font-medium">
                      First Name
                    </label>
                    <InputField
                      name="firstName"
                      placeholder={initialValues.firstName}
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-600 font-medium">
                      Last Name
                    </label>
                    <InputField
                      name="lastName"
                      placeholder={initialValues.lastName}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm">Email</label>
                    <InputField
                      name="email"
                      placeholder={initialValues.email}
                      isReadOnly={true}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">Phone</label>
                    <InputField
                      name="phone"
                      placeholder={initialValues.phone}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm">State</label>
                    <InputField
                      name="state"
                      placeholder={initialValues.state}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">LGA</label>
                    <InputField name="lga" placeholder={initialValues.lga} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Address
                    </label>
                    <InputField
                      name="address"
                      placeholder={initialValues.address}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Country
                    </label>
                    <InputField
                      name="country"
                      placeholder={initialValues.country}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="flex items-center gap-4 bg-white rounded-3xl p-10">
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-[75%]">
                  <InputField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-1/2 !md:w-[400px]"
                    placeholder="* * * * * * * * *"
                    autocomplete="new-password"
                    rightIcon={
                      showPassword ? (
                        <FaEyeSlash
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )
                    }
                  />
                  <InputField
                    name="passwordConfirmation"
                    type={showPassword ? "text" : "password"}
                    className="w-1/2 !md:w-[400px]"
                    placeholder="* * * * * * * * *"
                    rightIcon={
                      showPassword ? (
                        <FaEyeSlash
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          className="text-gray-500 w-5 h-5 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )
                    }
                  />
                  <Button
                    label="Change Password"
                    className="bg-black text-sm "
                    onClick={() => {
                      if (values.password && values.passwordConfirmation) {
                        openModal(
                          <div className="flex flex-col gap-20 text-center p-5">
                            <p>Are you sure</p>
                            <div className="flex w-full justify-center gap-4">
                              <Button
                                label="No, cancel"
                                className="!w-fit px-6 text-xs bg-transparent !text-red-500"
                                onClick={closeModal}
                              />
                              <Button
                                label="Yes, confirm"
                                className="!w-fit px-6 bg-adron-black text-xs"
                                onClick={() => confirmChangePassword(values)}
                              />
                            </div>
                          </div>
                        );
                      } else {
                        showToast(
                          "Please fill in both password fields",
                          "error"
                        );
                      }
                    }}
                  />
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-8 bg-white rounded-3xl p-10">
                <div className="flex items-center justify-between">
                  <div className="w-[80%]">
                    <p className="text-sm font-medium">
                      New Property Notification
                    </p>
                    <p className="text-xs text-gray-400">
                      Turn on to get notified when there is a new property in
                      the market.
                    </p>
                  </div>
                  <Switch
                    checked={values.newPropertyNotification}
                    onChange={(val) =>
                      setFieldValue("newPropertyNotification", val)
                    }
                    className={`${
                      values.newPropertyNotification
                        ? "bg-adron-green"
                        : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        values.newPropertyNotification
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-[80%]">
                    <p className="text-sm font-medium">
                      Promotion Notifications
                    </p>
                    <p className="text-xs text-gray-400">
                      Turn on to get notified about our latest promotions.
                    </p>
                  </div>
                  <Switch
                    checked={values.promoNotification}
                    onChange={(val) => setFieldValue("promoNotification", val)}
                    className={`${
                      values.promoNotification
                        ? "bg-adron-green"
                        : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        values.promoNotification
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                </div>
              </div>

              {/* Save Button */}
              <div className="text-right">
                <Button
                  label={isSubmitting ? `Saving...` : `Save Changes`}
                  className="bg-black text-sm !w-fit px-6"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileSettings;
