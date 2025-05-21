import Button from "../Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import { FaArrowRight } from "react-icons/fa";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../zustand/useModalStore";

const InputMarketerId = () => {
  const { setPaymentDetails, marketerId, propertyId } =
    usePaymentBreakDownStore();
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    marketerId: Yup.string().required("MarketerID is required"),
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Input Market ID</div>
        <p className="text-gray-400 text-xs w-[80%]"></p>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={{ marketerId: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setPaymentDetails({ marketerId: values.marketerId });
            closeModal();
            navigate(`/property-agreement/${propertyId}`);
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-4">
                <InputField
                  name="marketerId"
                  type="text"
                  placeholder="Marketer ID"
                  className="text-2xl font-bold"
                />
                <p className="text-xs text-gray-400 w-full">
                  Please enter the Marketer ID to proceed with the payment. This
                  is required to ensure that the payment is correctly attributed
                  to the right marketer. If you do not have a Marketer ID,
                  please contact your marketer for assistance.
                </p>
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  label="Proceed"
                  className="bg-black px-12 py-2 text-xs"
                  type="submit"
                  disabled={!isValid || !dirty}
                  rightIcon={<FaArrowRight />}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputMarketerId;
