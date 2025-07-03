import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { formatPrice } from "../../data/utils";
import InfrastructureBankTransfer from "../DashboardNewPropertyComponent/InfrastructureBankTransfer";

const InputInfrastructureAmount = ({
  goBack,
  type,
  planID,
  purpose,
}: {
  goBack: () => void;
  type?: string;
  planID?: number | string;
  purpose?: string;
}) => {
  const { openModal, closeModal } = useModalStore();
  const { setPaymentDetails } = usePaymentBreakDownStore();

  // Validation schema
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .min(1001, "Amount must be greater than ₦1000")
      .required("Amount is required"),
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Make Payment</div>
        <p className="text-gray-400 text-xs w-[80%]">
          Please enter the amount you want to make payment with.{" "}
        </p>
      </div>
      <div className="flex flex-col justify-between mt-10">
        <Formik
          initialValues={{ amount: null }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // resetPaymentDetails();
            setPaymentDetails({
              totalAmount: Number(values.amount),
            });
            openModal(
              <InfrastructureBankTransfer
                amount={values.amount || 0}
                goBack={goBack}
                planID={Number(planID)}
                purpose={purpose}
                type={type}
              />
            );
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col justify-between min-h-[200px]">
              <div className="flex flex-col gap-4">
                <InputField
                  name="amount"
                  type="text"
                  placeholder="₦0.00"
                  className="text-2xl font-bold"
                />
                <p className="text-xs text-gray-400 w-[80%]"></p>
              </div>
              <div className="flex justify-between w-full gap-4 mt-4">
                <Button
                  label="Cancel"
                  className="!w-fit px-12 py-2 text-xs bg-transparent font-bold text-shadow-adron-red !text-red-500"
                  onClick={() => closeModal()}
                  type="button"
                />
                <Button
                  label="Continue"
                  className="!w-fit bg-black px-12 py-2 text-xs"
                  type="submit"
                  disabled={!isValid}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputInfrastructureAmount;
