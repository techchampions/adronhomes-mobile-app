import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Switch } from "@headlessui/react"; // optional for toggle UI
import InputField from "../components/InputField";
import Button from "../components/Button";

const ProfileSettings = () => {
  const initialValues = {
    fullName: "Mika Edmoud Miles",
    email: "Simonbill99@yahoo.com",
    phone: "+23490-879-9098",
    address: "576, Bay Bay Area, Code 53, Alina Street, Ik98, Lagos",
    password: "********",
    newPropertyNotification: true,
    promoNotification: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <div className="mx-auto rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Updated values:", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white rounded-3xl p-10 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/mika.png"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="w-1/2 md:w-[39%]">
                  <label className="block text-gray-600 font-medium">
                    Full Name
                  </label>
                  <InputField
                    name="FullName"
                    placeholder={initialValues.fullName}
                  />
                  {/* <Field
                  name="fullName"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                /> */}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm">Email</label>
                  <InputField name="email" placeholder={initialValues.email} />
                  {/* <Field
                  name="email"
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                /> */}
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">Phone</label>
                  <InputField name="phone" placeholder={initialValues.phone} />
                  {/* <Field
                  name="phone"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                /> */}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-600 text-sm">Address</label>
                <InputField
                  name="address"
                  placeholder={initialValues.address}
                />
                {/* <Field
                name="address"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              /> */}
              </div>
            </div>

            {/* Password Section */}
            <div className="flex items-center gap-4 bg-white rounded-3xl p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-[75%]">
                <InputField
                  name="password"
                  type="password"
                  className="w-1/2 !md:w-[400px]"
                />
                {/* <Field
                name="password"
                type="password"
                disabled
                className="w-full md:w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
              /> */}
                <Button
                  label="Change Password"
                  className="bg-black text-sm !w-1/2"
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
                    Turn on to get notified when there is a new property in the
                    market.
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
                  <p className="text-sm font-medium">Promotion Notifications</p>
                  <p className="text-xs text-gray-400">
                    Turn on to get notified about our latest promotions.
                  </p>
                </div>
                <Switch
                  checked={values.promoNotification}
                  onChange={(val) => setFieldValue("promoNotification", val)}
                  className={`${
                    values.promoNotification ? "bg-adron-green" : "bg-gray-300"
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
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md text-sm"
              >
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSettings;
