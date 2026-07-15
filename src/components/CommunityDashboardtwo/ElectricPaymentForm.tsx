import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import { formatPrice } from "../../data/utils";
import { usePayUtitlity } from "../../hooks/estateCommunity/useEstateCommunity";
import { useInterswitchPayment } from "../../hooks/useInterswitchPyament";
import { useUserStore } from "../../zustand/UserStore";
import Button from "../Button";
import InputField from "../InputField";
import InputFieldFormatted from "../InputField+Format";
import BankTransferModal from "./BankTransferModal";
interface Prop {
  payment_method: string;
}
const ElectricPaymentForm: React.FC<Prop> = ({ payment_method }) => {
  const context: CommunityOutletContext = useOutletContext();
  const { user } = useUserStore();
  const interswitch = useInterswitchPayment();
  const { mutate, isPending } = usePayUtitlity();
  const [showModal, setshowModal] = useState(false);
  const initialValues = {
    meter_id: "",
    amount: null,
  };
  const validationSchema = Yup.object().shape({
    meter_id: Yup.string().required("required"),
    amount: Yup.mixed().required("required"),
  });

  const submit = (values: typeof initialValues) => {
    // const amount = values.number_of_units * 245;
    if (context.data?.estate_info.id) {
      const payload: UtitlityPayload = {
        chargeable_id: values.meter_id,
        amount: values.amount || 0,
        estate_id: context.data?.estate_info.id,
        payment_method: payment_method,
        payment_type: "Electricity",
      };
      if (payment_method === "bank_transfer") {
        setshowModal(true);
      } else {
        mutate(payload, {
          onSuccess(data) {
            // if (payment_method === "interswitch") {
            //   interswitch({
            //     email: user?.email || "",
            //     amount: amount,
            //     reference: data.data.reference,
            //     merchant_code: data.data.reference,
            //     payment_item_id: data.data.reference,
            //     onSuccess: () => {},
            //     onClose: () => {},
            //   });
            // }
          },
        });
      }
    }
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ values, isValid }) => (
          <Form className="space-y-4 bg-white rounded-xl p-6 border border-gray-100">
            <div className="space-y-2">
              <InputField
                name="meter_id"
                label="Meter Number"
                placeholder="Enter meter number"
                className="bg-white rounded-lg border border-gray-200"
              />
              <InputFieldFormatted
                name="amount"
                type="number"
                formatAsNaira
                label="Amount to purchase"
                placeholder="Enter Amount"
                className="bg-white rounded-lg border border-gray-200"
              />
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Cost per unit</span>
                <span className="font-semibold text-gray-800">
                  {formatPrice(245)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-[#79B833]">
                  {formatPrice(values.amount || 0)}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              label="Proceed to Payment"
              isLoading={isPending}
              disabled={isPending || !payment_method || !isValid}
            />
          </Form>
        )}
      </Formik>
      {showModal && <BankTransferModal setshowModal={setshowModal} />}
    </div>
  );
};

export default ElectricPaymentForm;
