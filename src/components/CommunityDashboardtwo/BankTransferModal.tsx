import { Form, Formik } from "formik";
import { FiX } from "react-icons/fi";
import Button from "../Button";
import ImageUploadField from "../ImageUplaodField2";
import InputField from "../InputField";
interface Prop {
  setshowModal: (showModal: boolean) => void;
}
const BankTransferModal: React.FC<Prop> = ({ setshowModal }) => {
  const initialValues = {
    name: "",
    bank: "",
    attached: null,
  };
  const submit = (values: typeof initialValues) => {};
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Formik initialValues={initialValues} validateOnMount onSubmit={submit}>
        {() => (
          <Form className="bg-white rounded-2xl max-w-md w-full p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-gray-800">
                Make Bank Transfer
              </div>
              <button
                onClick={() => setshowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <InputField
                name="bank"
                label="Bank Name"
                className="rounded-xl bg-white border border-gray-300"
                placeholder="Title"
              />
              <InputField
                name="name"
                label="Sender's name"
                className="rounded-xl bg-white border border-gray-300"
                placeholder="Title"
              />
              <ImageUploadField name="attached" width={"100%"} height={150} />
            </div>
            <Button label="I have Sent it" type="submit" className="mt-4" />{" "}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BankTransferModal;
