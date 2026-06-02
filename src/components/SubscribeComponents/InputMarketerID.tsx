import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useVerifyMarkerter } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import InputField from "../InputField";
import InputPersonalInfo from "./PersonalInfo";
import Start from "./Start";

const validationSchema = Yup.object().shape({
  marketerId: Yup.string().required("MarketerID is required"),
});
interface Props {
  property?: Property;
}

const InputMarketerId: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const { marketID, setSubscribeFormData } = useSubscribeFormData();
  const [ID, setID] = useState("");
  const initialValues = { marketerId: marketID };
  const { data, isLoading, isError } = useVerifyMarkerter(ID || "");
  const goBack = () => {
    action.openModal(<Start property={property} />);
  };

  const ValidateID = ({ marketerID }: { marketerID: string }) => {
    useEffect(() => {
      if (marketerID && marketerID !== ID) {
        setID(marketerID);
      }
    }, [marketerID]);

    return null;
  };

  const handleProceed = async (values: typeof initialValues) => {
    // setID(values.marketerId);
    // const result = await refetch();
    if (data?.success) {
      setSubscribeFormData({ marketID: values.marketerId });
      action.openModal(<InputPersonalInfo property={property} />);
    }
  };
  return (
    <div className="flex flex-col max-w-xs">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Input Marketer ID</div>
        <p className="text-gray-400 text-xs w-[80%]"></p>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
          // onSubmit={(values) => {
          //   setID(values.marketerId);
          //   if (data?.success) {
          //     setSubscribeFormData({ marketID: values.marketerId });
          //     action.openModal(<InputPersonalInfo property={property} />);
          //   }
          // }}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between min-h-[220px]">
              <ValidateID marketerID={values.marketerId} />
              <div className="flex flex-col gap-4">
                <InputField
                  name="marketerId"
                  type="text"
                  placeholder="Marketer ID"
                  className="text-2xl font-bold rounded-xl py-3"
                />
                <p className="text-xs text-gray-400 w-full">
                  Please enter the Marketer ID to proceed with the payment. This
                  is required to ensure that the payment is correctly attributed
                  to the right marketer. If you do not have a Marketer ID,
                  please contact your marketer for assistance.
                </p>
              </div>
              <div className="flex justify-center w-full gap-2 mt-4">
                <Button
                  label="Back"
                  icon={<ArrowLeft />}
                  className="bg-gray-800 rounded-lg hidden sm:flex"
                  onClick={goBack}
                />
                <Button
                  label={`${isError ? "Invalid Marketer code" : "Proceed"}`}
                  className={`${
                    isError ? "bg-red-700" : "bg-adron-green"
                  } rounded-lg`}
                  type="submit"
                  loadingText={`${
                    isError
                      ? "Invalid Marketer code"
                      : isLoading
                      ? "Verifying marketer code..."
                      : "Loading..."
                  }`}
                  isLoading={isLoading}
                  disabled={!isValid || isLoading || isError}
                  icon={isError ? <Info /> : null}
                  rightIcon={data?.success ? <ArrowRight /> : null}
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
