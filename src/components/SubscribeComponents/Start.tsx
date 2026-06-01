import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useGetPropertyByID } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { Property as PropertySimple } from "../../data/types/propertiesPageTypes";
import { useModalStore } from "../../zustand/useModalStore";
import { useUserStore } from "../../zustand/UserStore";
import Button from "../Button";
import RadioGroup from "../FormComponents/RadioGroup";
import GuestPersonalInfo from "./GuestPersonalInfo";
import InputMarketerId from "./InputMarketerID";
import InputPersonalInfo from "./PersonalInfo";

const validationSchema = Yup.object({
  // For string values
  referred: Yup.string()
    .required("Please select an answer")
    .oneOf(["no", "yes"], "Invalid selection"),
});

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
interface Props {
  property?: Property | PropertySimple;
  clickProperty?: Property | PropertySimple;
}
const initialValues = {
  referred: "",
};
const Start: React.FC<Props> = ({ property, clickProperty }) => {
  const modal = useModalStore();
  const { isLoggedIn } = useUserStore();
  const { data, isLoading } = useGetPropertyByID(
    String(clickProperty?.id || property?.id)
  );
  if (isLoading) {
    return (
      <div className="w-sm max-w-xs md:max-w-sm h-60 flex flex-col gap-3 justify-center items-center">
        <div className="w-10 h-10 border-b-2 border-r-2 rounded-full border-adron-green animate-spin"></div>
        <div className="text-adron-green text-lg">Loading...</div>
      </div>
    );
  }
  const handleSubmit = (values: typeof initialValues) => {
    if (values.referred === "yes") {
      modal.openModal(<InputMarketerId property={data?.data.properties} />);
    } else {
      if (isLoggedIn) {
        modal.openModal(<InputPersonalInfo property={data?.data.properties} />);
      } else {
        modal.openModal(<GuestPersonalInfo property={data?.data.properties} />);
      }
    }
  };
  return (
    <div className="w-sm max-w-xs md:max-w-sm">
      <div className="flex items-center gap-2 cursor-pointer absolute top-4 left-4">
        <ArrowLeft /> Back
      </div>

      <h4 className="font-bold text-2xl mt-5">
        Subscribe to {data?.data?.properties.name}
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
        enableReinitialize
      >
        {({ isValid, dirty }) => (
          <Form className="mt-5 space-y-8">
            <div className=" space-y-4">
              <RadioGroup
                name="referred"
                options={options}
                label="Were you referred by a Marketer?"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button
                label="Cancel"
                className="bg-gray-700 hover:bg-adron-black rounded-lg"
                onClick={() => modal.closeModal()}
              />
              <Button
                label="Proceed"
                disabled={!isValid || !dirty}
                rightIcon={<ArrowRight />}
                type="submit"
                className="bg-adron-green hover:bg-adron-green/90 rounded-lg"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Start;
