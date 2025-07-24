import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import CopyButton from "../CopyButton";
import { useToastStore } from "../../zustand/useToastStore";
import { RiUpload2Line } from "react-icons/ri";
import InputField from "../InputField";
import { Form, Formik } from "formik";
import {
  useCreatePropertyPlan,
  usePropertyPlanRepayment,
} from "../../data/hooks";
import { usePaymentBreakDownStore } from "../../zustand/PaymentBreakDownStore";
import { useNavigate } from "react-router-dom";
import PaymentPending from "../PaymentPending";
import { ApiError } from "../DashboardHomeComponents/SelectPaymentMethod";
import { useUserStore } from "../../zustand/UserStore";
import StatusFailed from "../StatusFailed";
import { useContractDeatilStore } from "../../zustand/ContractDetailsStore";
const BankTransfer = ({
  goBack,
  amount,
  isBuyNow = true,
}: {
  goBack: () => void;
  amount: number;
  isBuyNow?: boolean;
}) => {
  const initialValues = { proof: null as File | null, bank_name: "" };
  const { accounts } = useUserStore();
  const propertyAccount = accounts.find((item) => item.type === "property");

  const navigate = useNavigate();
  const { mutate: createPlan, isPending: isPendingPayment } =
    useCreatePropertyPlan();
  const { mutate: makeRepayment, isPending: isPendingRepayment } =
    usePropertyPlanRepayment();
  const {
    paymentDuration,
    paymentSchedule,
    totalAmount,
    marketerId,
    endDate,
    startDate,
    propertyId,
    paymentType,
    planId,
    numberOfUnits,
    resetPaymentDetails,
  } = usePaymentBreakDownStore();
  const { showToast } = useToastStore();
  const { closeModal, openModal } = useModalStore();
  const contractDetails = useContractDeatilStore();

  const contractDetailPayload = {
    contract_business_type: contractDetails.contract_business_type,
    contract_subscriber_name_1: contractDetails.contract_subscriber_name_1,
    contract_subscriber_name_2: contractDetails.contract_subscriber_name_2,
    contract_subscriber_name_3: contractDetails.contract_subscriber_name_3,
    contract_additional_name: contractDetails.contract_additional_name,
    contract_marital_status: contractDetails.contract_marital_status,
    contract_gender: contractDetails.contract_gender,
    contract_date_of_birth: contractDetails.contract_date_of_birth,
    contract_nationality: contractDetails.contract_nationality,
    contract_residential_address: contractDetails.contract_residential_address,
    contract_town: contractDetails.contract_town,
    contract_state: contractDetails.contract_state,
    contract_country: contractDetails.contract_country,
    contract_email: contractDetails.contract_email,
    contract_sms: contractDetails.contract_sms,
    contract_employer_address: contractDetails.contract_employer_address,
    contract_occupation: contractDetails.contract_occupation,
    contract_employer: contractDetails.contract_employer,
    contract_next_of_kin_phone: contractDetails.contract_next_of_kin_phone,
    contract_next_of_kin_address: contractDetails.contract_next_of_kin_address,
    contract_next_of_kin: contractDetails.contract_next_of_kin,
    contract_next_of_kin_relationship:
      contractDetails.contract_next_of_kin_relationship,
    contract_profile_picture: contractDetails.contract_profile_picture,
  };

  const handlePaymentSuccess = (values: typeof initialValues) => {
    if (values.bank_name && values.proof) {
      if (isBuyNow) {
        let payload = {};
        if (paymentType === "One Time") {
          payload = {
            ...contractDetailPayload,
            payment_method: "bank_transfer",
            payment_type: 1,
            monthly_duration: Number(paymentDuration),
            property_id: Number(propertyId),
            start_date: startDate,
            end_date: endDate,
            repayment_schedule: paymentSchedule,
            paid_amount: totalAmount,
            marketer_code: marketerId,
            proof_of_payment: values.proof,
            number_of_unit: numberOfUnits,
            bank_name: values.bank_name,
          };
        } else {
          payload = {
            ...contractDetailPayload,
            payment_method: "bank_transfer",
            payment_type: 2,
            monthly_duration: Number(paymentDuration),
            property_id: Number(propertyId),
            start_date: startDate,
            end_date: endDate,
            repayment_schedule: paymentSchedule,
            paid_amount: totalAmount,
            marketer_code: marketerId,
            proof_of_payment: values.proof,
            number_of_unit: numberOfUnits,
            bank_name: values.bank_name,
          };
        }
        createPlan(payload, {
          onSuccess(data) {
            openModal(
              <PaymentPending text="Your Payment is being confrimed by Admin" />
            );
            navigate(`/my-property/${data.plan?.id}`, { replace: true });
          },
          onError(error: ApiError) {
            openModal(<StatusFailed text="Oops... there's been an Error!" />);
            // const message =
            //   error?.response?.data?.message ||
            //   error?.message ||
            //   "Something went wrong";
            // showToast(message, "error");
            showToast("Failed to complete payment", "error");
          },
        });
      } else {
        makeRepayment(
          {
            payment_method: "bank_transfer",
            paid_amount: totalAmount,
            plan_id: Number(planId),
            proof_of_payment: values.proof,
          },
          {
            onSuccess: (res) => {
              openModal(
                <PaymentPending text="Payment will be processed within 24Hrs." />
              );
            },
            onError: (error: ApiError) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
              showToast(message, "error");
            },
          }
        );
      }
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
              ₦{amount.toLocaleString()}
            </span>{" "}
            to the account below to complete your payment.
          </p>
          <div className="flex flex-col w-full gap-4 mt-7">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col">
                <p className="text-md">{propertyAccount?.account_number}</p>
                <p className="text-[12px] font-adron-thin text-gray-400">
                  Account Number
                </p>
              </div>
              <CopyButton text={propertyAccount?.account_number} />
            </div>
            <div className="flex flex-col">
              <p className="text-md">{propertyAccount?.bank_name}</p>
              <p className="text-[12px] font-adron-thin text-gray-400">
                Bank Name
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-md">{propertyAccount?.account_name}</p>
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
                  name="bank_name"
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
                    loadingText="Sending"
                    isLoading={isPendingPayment || isPendingRepayment}
                    disabled={isPendingPayment || isPendingRepayment}
                    className="!w-fit px-12 py-2 text-xs bg-black text-white"
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

export default BankTransfer;
