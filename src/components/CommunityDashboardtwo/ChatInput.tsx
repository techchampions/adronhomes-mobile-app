import { Form, Formik } from "formik";
import { FiImage, FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import { getReceiver } from "../../data/utils";
import { useSendMessage } from "../../hooks/estateCommunity/useEstateCommunity";
import InputField from "../InputField";
interface Prop {
  messages: Message[];
}
const ChatInput: React.FC<Prop> = ({ messages }) => {
  const context: CommunityOutletContext = useOutletContext();
  const { mutate, isPending } = useSendMessage();
  const receiver = getReceiver(messages[0], context.data?.user_info.id);
  const initialValues = {
    message: "",
    estate_id: context.data?.estate_info.id,
    receiver_id: receiver,
  };
  const validationSchema = Yup.object().shape({
    // message:Yup.string().required(),
    estate_id: Yup.number().required(),
    receiver_id: Yup.number().required(),
  });
  const submit = (values: typeof initialValues) => {
    if (values.estate_id) {
      const payload: SendMessagePayload = {
        message: values.message,
        estate_id: values.estate_id,
        receiver_id: values.receiver_id,
      };
      mutate(payload);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={submit}
    >
      {({ isValid, values }) => (
        <Form className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 flex-shrink-0">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiPaperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
              >
                <FiImage className="w-5 h-5 text-gray-400" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:inline-flex"
              >
                <FiSmile className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center bg-adron-body rounded-3xl p-2 flex-1">
              <InputField
                name="message"
                placeholder="Type your message..."
                className="bg-transparent"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-full hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 flex-shrink-0 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!values.message.trim() || !isValid || isPending}
              >
                {isPending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiSend className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;
