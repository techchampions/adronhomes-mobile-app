import { Form, Formik } from "formik";
import * as Yup from "yup";

import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import PaymentSuccessfull from "../PaymentSuccessfull";

const StatementRequest = () => {
  const { closeModal, openModal } = useModalStore();
  const initialValues = {
    startDate: "",
    endDate: "",
  };
  const validationSchema = Yup.object({
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
  });

  return (
    <div>
      <div className="flex flex-col absolute top-4 left-8">
        <h4 className="font-bold text-xl">Request Statment</h4>
        <p className="text-gray-500 text-sm">Select duration of statement.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log("submiting")}
      >
        <Form className="mt-14 space-y-4">
          <div className="flex flex-col text-sm">
            <label htmlFor="">Start Date</label>
            <InputField name="startDate" />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="">End Date</label>
            <InputField name="endDate" />
          </div>
          <div className="flex justify-between mt-12">
            <Button
              label="Cancel"
              className="bg-transparent !text-black  text-sm"
              onClick={closeModal}
            />
            <Button
              label="Get"
              className="bg-black px-6 text-sm"
              onClick={() =>
                openModal(
                  <PaymentSuccessfull
                    text={
                      "Your statement request has been sent. We will get back to you shortly."
                    }
                  />
                )
              }
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default StatementRequest;
