import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import { useUserStore } from "../../zustand/UserStore";
import Button from "../Button";
import SelectInput from "../FormComponents/SelectInput";
import InputField from "../InputField";
import InputMarketerId from "./InputMarketerID";
import OwnershipInfo from "./OwnershipInfo";
import Start from "./Start";

const validationSchema = Yup.object().shape({
  contract_title: Yup.string().required("required"),
  fullName: Yup.string().required("required"),
  email: Yup.string().required("required"),
  phone: Yup.string().required("required"),
});
interface Props {
  property?: Property;
}

const InputPersonalInfo: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const { user } = useUserStore();
  // const [emailToCheck, setEmailToCheck] = useState("");
  // const { data, isLoading, isError } = useIsUserExist(emailToCheck);
  const {
    setSubscribeFormData,
    marketID,
    contract_subscriber_name_1,
    contract_email,
    contract_title,
    contract_sms,
  } = useSubscribeFormData();
  const TITLE_OPTIONS = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Miss", label: "Miss" },
    { value: "Mst", label: "Mst" },
  ];
  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`;
  const initialValues = {
    contract_title: contract_title || "",
    fullName: contract_subscriber_name_1 || fullName,
    email: contract_email || user?.email,
    phone: contract_sms || user?.phone_number,
  };
  const goBack = () => {
    if (marketID) {
      action.openModal(<InputMarketerId property={property} />);
    } else {
      action.openModal(<Start property={property} />);
    }
  };
  // const CheckEmail = ({ email }: { email: string }) => {
  //   useEffect(() => {
  //     if (email && email !== emailToCheck) {
  //       setEmailToCheck(email);
  //     }
  //   }, [email]);

  //   return null;
  // };
  return (
    <div className="flex flex-col w-sm max-w-xs md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Subscribe to {property?.name}</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setSubscribeFormData({
              contract_title: values.contract_title,
              contract_subscriber_name_1: values.fullName,
              contract_email: values.email,
              contract_sms: values.phone,
            });
            action.openModal(<OwnershipInfo property={property} />);
            // if (isError) {
            // }
          }}
        >
          {({ isValid, values }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
                {/* <CheckEmail email={values.email} /> */}
                <div className="space-y-7">
                  <div className="grid grid-cols-4 gap-2">
                    <SelectInput
                      name="contract_title"
                      options={TITLE_OPTIONS}
                      label="Title"
                      placeholder="Title"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                    <div className="col-span-3">
                      <InputField
                        name="fullName"
                        type="text"
                        label="Full name"
                        placeholder="Full Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <InputField
                      name="email"
                      type="text"
                      isReadOnly
                      label="What is your email address"
                      placeholder="Email address"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <InputField
                      name="phone"
                      type="text"
                      label="What is your phone number"
                      placeholder="Phone number"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-2 mt-4">
                  <Button
                    label="Back"
                    icon={<ArrowLeft />}
                    className="bg-gray-800 rounded-lg hidden sm:flex"
                    onClick={goBack}
                  />
                  <Button
                    label="Proceed"
                    className={"bg-adron-green rounded-lg"}
                    type="submit"
                    loadingText="Checking email..."
                    disabled={!isValid}
                    rightIcon={isValid && <ArrowRight />}
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

export default InputPersonalInfo;
