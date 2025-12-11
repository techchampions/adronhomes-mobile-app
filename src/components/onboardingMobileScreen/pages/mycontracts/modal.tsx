"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation Schema
const ValidationSchema = Yup.object().shape({
  customer_code: Yup.string()
    .required("Customer code is required"),
  dob: Yup.string()
    .required("Date of birth is required"),
});

export const CustomerModalButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button Styled like Active Tab */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all 
                   bg-[#79B833] text-white font-semibold"
      >
        Add Customer
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[20px] w-full max-w-md p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

            {/* Formik Form */}
            <Formik
              initialValues={{
                customer_code: "",
                dob: "",
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values) => {
                console.log("Submitted:", values);
                setOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">

                  {/* Customer Code */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Customer Code
                    </label>
                    <Field
                      name="customer_code"
                      type="text"
                      placeholder="Ex: PS120493"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                    {errors.customer_code && touched.customer_code && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer_code}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Date of Birth
                    </label>
                    <Field
                      name="dob"
                      type="datetime-local"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                    {errors.dob && touched.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg text-white font-semibold bg-[#79B833]"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      )}
    </>
  );
};
