import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Switch } from "@headlessui/react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useModalStore } from "../zustand/useModalStore";
import { useGetUser } from "../data/hooks";
import Loader from "../components/Loader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import apiClient from "../data/apiClient";
import { useToastStore } from "../zustand/useToastStore";
import { TbCameraPlus } from "react-icons/tb";
import { FaEye, FaEyeSlash, FaChevronRight } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { ApiError } from "../data/api";
import { useUserStore } from "./user_store";
import DeleteConfirmationPage from "../components/onboardingMobileScreen/onboardingComponents/delete";

const ProfileSettings = () => {
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { data, isLoading, isError } = useGetUser();
  const {
    user: zustandUser,
    setUser,
    updateUser,
    currentPage,
    setCurrentPage,
  } = useUserStore();

  const userData = zustandUser || data?.user;

  
  useEffect(() => {
    if (data?.user && !zustandUser) {
      setUser(data.user);
    }
  }, [data, zustandUser, setUser]);

  if (isLoading) return <Loader />;
  if (isError) return <ApiErrorBlock />;

  const menuItems = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      description: "Update your personal information",
      icon: <CgProfile className="w-6 h-6" />,
    },
    {
      id: "change-password",
      label: "Change Password",
      description: "Update your account password",
      icon: <RiLockPasswordLine className="w-6 h-6" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage notification preferences",
      icon: <IoMdNotificationsOutline className="w-6 h-6" />,
    },
  ];

  const handleBackToMenu = () => {
    setCurrentPage("menu");
  };

  // Update menu item clicks to use Zustand
  const handleMenuItemClick = (pageId: string) => {
    setCurrentPage(pageId);
  };
  // Edit Profile Component
  const EditProfile = () => {
    const initialValues = {
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
      email: userData?.email || "",
      phone: userData?.phone_number || "",
      state: userData?.state || "",
      country: userData?.country || "",
      lga: userData?.lga || "",
      address: userData?.address || "",
      profilePicture: null,
    };

    const validationSchema = Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      state: Yup.string().required("State is required"),
      lga: Yup.string().required("LGA is required"),
      country: Yup.string().required("Country is required"),
      address: Yup.string().required("Address is required"),
    });

    const handleSubmit = async (values: typeof initialValues) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.firstName);
        formData.append("last_name", values.lastName);
        formData.append("phone_number", values.phone);
        formData.append("country", values.country);
        formData.append("state", values.state);
        formData.append("lga", values.lga);
        formData.append("address", values.address);

        if (values.profilePicture) {
          formData.append("profile_picture", values.profilePicture);
        }

        await apiClient.post("/update-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Update Zustand store immediately
        updateUser({
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phone,
          country: values.country,
          state: values.state,
          lga: values.lga,
          address: values.address,
        });

        showToast("Profile updated successfully", "success");
      } catch (error: unknown) {
        const apiError = error as ApiError;

        if (apiError.response?.data) {
          const data = apiError.response.data;

          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join("\n");
            showToast(errorMessages, "error");
          } else if (data.message) {
            showToast(data.message, "error");
          } else {
            showToast(
              "An unexpected error occurred. Please try again.",
              "error"
            );
          }
        } else {
          showToast("Network error. Please check your connection.", "error");
        }

        console.error("Error updating profile:", error);
      }
    };

    return (
      <>
        <div className="bg-white rounded-3xl p-10">
          <div className="mb-6">
            <button
              onClick={handleBackToMenu}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
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
                          : userData?.profile_picture || "/user.svg"
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
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      First Name
                    </label>
                    <InputField name="firstName" placeholder="First Name" />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Last Name
                    </label>
                    <InputField name="lastName" placeholder="Last Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      Email
                    </label>
                    <InputField
                      name="email"
                      placeholder="Email"
                      isReadOnly={true}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      Phone
                    </label>
                    <InputField name="phone" placeholder="Phone" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      State
                    </label>
                    <InputField name="state" placeholder="State" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      LGA
                    </label>
                    <InputField name="lga" placeholder="LGA" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      Address
                    </label>
                    <InputField name="address" placeholder="Address" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2">
                      Country
                    </label>
                    <InputField name="country" placeholder="Country" />
                  </div>
                </div>

                <div className="text-right">
                  <Button
                    label={isSubmitting ? "Saving..." : "Save Changes"}
                    className="bg-black text-sm !w-fit px-6"
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="pt-20 w-full flex justify-center">
          <DeleteConfirmationPage />
        </div>
      </>
    );
  };

  // Change Password Component - FIXED with separate password visibility states
  const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    };

    const validationSchema = Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        )
        .required("New password is required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Password confirmation is required"),
    });

    const handleSubmit = async (
      values: typeof initialValues,
      { resetForm }: any
    ) => {
      try {
        const formData = new FormData();
        // formData.append("current_password", values.currentPassword);
        formData.append("password", values.newPassword);
        formData.append("password_confirmation", values.passwordConfirmation);

        await apiClient.post("/change-password", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        showToast("Password changed successfully", "success");
        resetForm();
        setCurrentPage("menu");
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data) {
          const data = apiError.response.data;
          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join("\n");
            showToast(errorMessages, "error");
          } else if (data.message) {
            showToast(data.message, "error");
          } else {
            showToast(
              "An unexpected error occurred. Please try again.",
              "error"
            );
          }
        } else {
          showToast("Network error. Please check your connection.", "error");
        }
      }
    };

    const confirmChangePassword = (values: any, formikBag: any) => {
      openModal(
        <div className="flex flex-col gap-8 text-center p-5">
          <p className="text-lg">
            Are you sure you want to change your password?
          </p>
          <div className="flex w-full justify-center gap-4">
            <Button
              label="No, cancel"
              className="!w-fit px-6 text-xs bg-transparent !text-red-500 border border-red-500"
              onClick={closeModal}
            />
            <Button
              label="Yes, confirm"
              className="!w-fit px-6 bg-black text-xs"
              onClick={() => {
                handleSubmit(values, formikBag);
                closeModal();
              }}
            />
          </div>
        </div>
      );
    };

    return (
      <div className="bg-white rounded-3xl p-10">
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage("menu")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your current password and new password below
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={confirmChangePassword}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Current Password
                </label>
                <InputField
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  rightIcon={
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCurrentPassword(!showCurrentPassword);
                      }}
                      className="cursor-pointer"
                    >
                      {showCurrentPassword ? (
                        <FaEyeSlash className="text-gray-500 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-500 w-5 h-5" />
                      )}
                    </div>
                  }
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  New Password
                </label>
                <InputField
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  // autoComplete="new-password"
                  rightIcon={
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNewPassword(!showNewPassword);
                      }}
                      className="cursor-pointer"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="text-gray-500 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-500 w-5 h-5" />
                      )}
                    </div>
                  }
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Confirm New Password
                </label>
                <InputField
                  name="passwordConfirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  rightIcon={
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-500 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-500 w-5 h-5" />
                      )}
                    </div>
                  }
                />
              </div>

              <div className="text-right">
                <Button
                  label={isSubmitting ? "Updating..." : "Update Password"}
                  className="bg-black text-sm !w-fit px-6"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  // Notifications Component
  const Notifications = () => {
    const initialValues = {
      newPropertyNotification: userData?.notification_enabled == 1,
      promoNotification: userData?.promo_notification == 1 || false,
    };

    const handleSubmit = async (values: {
      newPropertyNotification: boolean;
      promoNotification: boolean;
    }) => {
      try {
        const formData = new FormData();
        formData.append(
          "notification_enabled",
          values.newPropertyNotification ? "1" : "0"
        );
        formData.append(
          "promo_notification",
          values.promoNotification ? "1" : "0"
        );

        await apiClient.post("/update-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Update Zustand store immediately
        updateUser({
          notification_enabled: values.newPropertyNotification ? 1 : 0,
          promo_notification: values.promoNotification ? 1 : 0,
        });

        showToast("Notification preferences updated", "success");
      } catch (error) {
        showToast("Failed to update preferences", "error");
      }
    };

    return (
      <div className="bg-white rounded-3xl p-10">
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage("menu")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-semibold">Notification Settings</h2>
          <p className="text-gray-500 text-sm mt-2">
            Manage how you receive notifications
          </p>
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-8">
              <div className="flex items-center justify-between pb-6 border-b">
                <div className="w-[80%]">
                  <p className="text-sm font-medium">
                    New Property Notification
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Turn on to get notified when there is a new property in the
                    market.
                  </p>
                </div>
                <Switch
                  checked={values.newPropertyNotification}
                  onChange={(val) => {
                    setFieldValue("newPropertyNotification", val);
                    handleSubmit({ ...values, newPropertyNotification: val });
                  }}
                  className={`${
                    values.newPropertyNotification
                      ? "bg-green-500"
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

              <div className="flex items-center justify-between pb-6">
                <div className="w-[80%]">
                  <p className="text-sm font-medium">Promotion Notifications</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Turn on to get notified about our latest promotions.
                  </p>
                </div>
                <Switch
                  checked={values.promoNotification}
                  onChange={(val) => {
                    setFieldValue("promoNotification", val);
                    handleSubmit({ ...values, promoNotification: val });
                  }}
                  className={`${
                    values.promoNotification ? "bg-green-500" : "bg-gray-300"
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
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  // Main Menu Component
  const Menu = () => (
    <div className="bg-white rounded-3xl p-10">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)} // Use Zustand here
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-600">{item.icon}</div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );

  // Render based on current page from Zustand
  return (
    <div className="mx-auto rounded-lg">
      {currentPage === "menu" && <Menu />}
      {currentPage === "edit-profile" && <EditProfile />}
      {currentPage === "change-password" && <ChangePassword />}
      {currentPage === "notifications" && <Notifications />}
    </div>
  );
};

export default ProfileSettings;
