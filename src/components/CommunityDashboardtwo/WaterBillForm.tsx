import { Form, Formik } from "formik";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { formatPrice } from "../../data/utils";
import { usePayUtitlity } from "../../hooks/estateCommunity/useEstateCommunity";
import { useInterswitchPayment } from "../../hooks/useInterswitchPyament";
import { useUserStore } from "../../zustand/UserStore";
import Button from "../Button";
import InputField from "../InputField";
import InputFieldFormatted from "../InputField+Format";
interface Prop {
  payment_method: string;
}
const WaterBillForm: React.FC<Prop> = ({ payment_method }) => {
  const context: CommunityOutletContext = useOutletContext();
  const { user } = useUserStore();
  const interswitch = useInterswitchPayment();
  const { mutate, isPending } = usePayUtitlity();
  const initialValues = {
    water_bill_code: "",
    amount: 1,
  };
  const submit = (values: typeof initialValues) => {
    if (context.data?.estate_info.id) {
      const payload: UtitlityPayload = {
        chargeable_id: values.water_bill_code,
        estate_id: context.data?.estate_info.id,
        payment_method: payment_method,
        payment_type: "Water",
      };
      mutate(payload, {
        onSuccess(data) {
          if (payment_method === "interswitch") {
            interswitch({
              email: user?.email || "",
              amount: values.amount,
              reference: data.data.reference,
              merchant_code: data.data.reference,
              payment_item_id: data.data.reference,
              onSuccess: () => {},
              onClose: () => {},
            });
          }
        },
      });
    }
  };
  return (
    <Formik initialValues={initialValues} validateOnMount onSubmit={submit}>
      {({ values }) => (
        <Form className="space-y-4 bg-white rounded-xl p-6 border border-gray-100">
          <div className="space-y-2">
            <InputField
              name="water_bill_code"
              label="Water Bill Number"
              placeholder="Enter water bill number"
              className="bg-white rounded-lg border border-gray-200"
            />
            <InputFieldFormatted
              name="amount"
              label="Amount"
              placeholder="Enter Amount"
              className="bg-white rounded-lg border border-gray-200"
            />
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-[#79B833]">
                {formatPrice(values.amount)}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            label="Proceed to Payment"
            isLoading={isPending}
            disabled={isPending || !payment_method}
          />
        </Form>
      )}
    </Formik>
  );
};

export default WaterBillForm;
