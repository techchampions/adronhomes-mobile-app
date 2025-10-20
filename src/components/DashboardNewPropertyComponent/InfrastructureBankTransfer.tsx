import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import { RiUpload2Line } from "react-icons/ri";
import InputField from "../InputField";
import { Form, Formik } from "formik";
import { useInfrastructurePayment } from "../../data/hooks";
import { useNavigate } from "react-router-dom";
import PaymentPending from "../PaymentPending";
import { ApiError } from "../DashboardHomeComponents/SelectPaymentMethod";
import StatusFailed from "../StatusFailed";
import { useUserStore } from "../../zustand/UserStore";

const InfrastructureBankTransfer = ({
  goBack,
  amount,
  planID,
  purpose,
  type,
}: {
  goBack: () => void;
  amount?: number;
  planID?: number | undefined;
  purpose?: string;
  type?: string;
}) => {
  const initialValues = { proof: null as File | null, sender_name: "" };
  const { accounts } = useUserStore();
  const accountDetails = accounts.find((item) => item.type === type);
  const navigate = useNavigate();
  const { mutate: makePayment, isPending } = useInfrastructurePayment();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();
  const handlePaymentSuccess = (values: typeof initialValues) => {
    console.log("values", values);
    if (values.proof) {
      makePayment(
        {
          payment_method: "bank_transfer",
          plan_id: planID,
          paid_amount: amount,
          proof_of_payment: values.proof,
          purpose: purpose,
          bank_name: values.sender_name,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            openModal(
              <PaymentPending text="Your payment is being confrimed by Admin" />
            );
            navigate(`/dashboard/my-property/${planID}`);
          },
          onError: (error: ApiError) => {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong";
            showToast(message, "error");
            openModal(
              <StatusFailed text="Oops... there might have been an error. Try again later" />
            );
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mt-4 min-h-[400px] justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-full bg-adron-green rounded-2xl flex gap-3 items-center p-3">
            <img src="/bank-transfer-icon.svg" alt="" className="h-6 w-6" />
            <p className="text-sm text-white">Bank Transfer</p>
          </div>
          <p className="text-sm text-gray-500">
            Transfer{" "}
            <span className="font-bold text-black">
              ₦{amount?.toLocaleString()}
            </span>{" "}
            to the account below to complete your payment.
          </p>
          <div className="flex flex-col w-full gap-4 mt-7">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col">
                <p className="text-md">{accountDetails?.account_number}</p>
                <p className="text-[12px] font-adron-thin text-gray-400">
                  Account Number
                </p>
              </div>
              <CopyButton text={accountDetails?.account_number} />
            </div>
            <div className="flex flex-col">
              <p className="text-md">{accountDetails?.bank_name}</p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Bank Name
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-md">{accountDetails?.account_name}</p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Account Name
              </p>
            </div>
          </div>
        </div>

        <Formik initialValues={initialValues} onSubmit={handlePaymentSuccess}>
          {({ values }) => {
            return (
              <Form className="flex flex-col gap-2">
                <InputField
                  name="sender_name"
                  placeholder="Enter your Account name"
                  className="mt-4"
                />
                <label className="mt-4">
                  <label className="block text-xs">Proof of Payment</label>
                  <div className="flex justify-between w-full px-4 py-2 bg-adron-body rounded-lg items-center">
                    <input
                      type="file"
                      name="proof"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          values.proof = e.target.files[0];
                        }
                      }}
                      className="text-xs w-[70%]"
                    />
                    <RiUpload2Line className="text-gray-500 h-5 w-5 hover:text-black" />
                  </div>
                </label>

                <div className="flex justify-between w-full gap-4 mt-4">
                  <Button
                    label="Back"
                    className="!w-fit px-12 py-2 text-xs bg-transparent !text-black font-bold"
                    onClick={goBack}
                  />
                  <Button
                    label="Done"
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    className="!w-fit px-12 py-2 text-xs bg-black text-white"
                    // onClick={handlePaymentSuccess}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default InfrastructureBankTransfer;
