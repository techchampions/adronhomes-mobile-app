import { Form, Formik } from "formik";
import React from "react";
import { FiX } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { useGenerateNewAccessCode } from "../../hooks/estateCommunity/useEstateCommunity";
import Button from "../Button";
import DateInput from "../FormComponents/DateInput";
import InputField from "../InputField";
interface Prop {
  setShowModal: (showModal: boolean) => void;
}
const GenerateAccessCode: React.FC<Prop> = ({ setShowModal }) => {
  const context: CommunityOutletContext = useOutletContext();
  const { mutate, isPending } = useGenerateNewAccessCode();
  const initialValues = {
    estate_id: Number(context.data?.estate_info.id || ""),
    access_type: "",
    expiry_date: "",
  };
  const submit = (values: typeof initialValues) => {
    mutate(values);
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Formik initialValues={initialValues} validateOnMount onSubmit={submit}>
        {() => (
          <Form className="bg-white rounded-2xl max-w-md w-full p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-gray-800">
                Generate New Code
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-2">
              <InputField
                name="access_type"
                label="Access Type"
                placeholder="E.g Main Gate, Parking"
                className="rounded-xl py-3"
              />
              <DateInput name="expiry_date" label="Expiry date" />
              <Button
                type="submit"
                label="Generate Code"
                isLoading={isPending}
                disabled={isPending}
                loadingText="Generating"
                className="w-full py-3 mt-4 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-xl hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 font-semibold"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenerateAccessCode;
