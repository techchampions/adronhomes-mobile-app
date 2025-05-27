import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import DatePickerInput from "../DatePickerInput";
import { useUserStore } from "../../zustand/UserStore";
import { formatDate } from "../../data/utils";

const StatementRequest = () => {
  const { closeModal, openModal } = useModalStore();
  const { user } = useUserStore();
  const today = new Date();
  const initialValues = {
    startDate: null,
    endDate: null,
  };
  const validationSchema = Yup.object({
    startDate: Yup.date()
      .nullable()
      .required("Start Date is required")
      .max(today, "Start Date cannot be in the future"),
    endDate: Yup.date().nullable().required("Required"),
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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="mt-14 space-y-4">
            {/* <div className="relative mt-2 w-full flex items-center justify-between flex-row border px-2 border-gray-300 rounded-lg">
              <label htmlFor="" className="text-xs">
                Start Date
              </label>
              <DatePicker
                selected={values.startDate}
                onChange={(date) => setFieldValue("startDate", date)}
                className="w-full p-3 outline-none rounded-lg text-gray-500"
                dateFormat="dd-MM-yyyy"
                placeholderText="Select start date"
              />
              <MdOutlineCalendarToday className="text-gray-900" />
            </div>
            <div className="relative mt-2 w-full flex items-center justify-between flex-row border px-2 border-gray-300 rounded-lg">
              <label htmlFor="" className="text-xs">
                End Date
              </label>
              <DatePicker
                selected={values.endDate}
                onChange={(date) => setFieldValue("endDate", date)}
                className="w-full p-3 outline-none rounded-lg text-gray-500"
                dateFormat="dd-MM-yyyy"
                placeholderText="Select end date"
              />
              <MdOutlineCalendarToday className=" text-gray-900" />
            </div> */}
            <DatePickerInput
              label="Start Date"
              name="startDate"
              minDate={formatDate(user?.created_at || "")}
              maxDate={new Date()}
            />
            <DatePickerInput
              label="End Date"
              name="endDate"
              minDate={formatDate(user?.created_at || "")}
              maxDate={new Date()}
            />
            <div className="flex justify-between mt-12">
              <Button
                label="Cancel"
                className="bg-transparent !text-black  text-sm"
                onClick={closeModal}
              />
              <Button
                label="Get"
                type="submit"
                isLoading={isSubmitting}
                className="bg-black px-6 text-sm"
                // onClick={() =>
                //   openModal(
                //     <PaymentSuccessfull
                //       text={
                //         "Your statement request has been sent. We will get back to you shortly."
                //       }
                //     />
                //   )
                // }
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StatementRequest;
