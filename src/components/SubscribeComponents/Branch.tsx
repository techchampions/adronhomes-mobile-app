import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useGetCittaBranches } from "../../data/hooks";
import { Property } from "../../data/types/GetPropertyByIdResponse";
import { useSubscribeFormData } from "../../zustand/subscribeFormData.state";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import InlineLoading from "../InlineLoading";
import SelectFieldInput from "../SelectFieldInput";
import InputIdentityInfo from "./InputIdentity";
import PropertySpecifications from "./PropertySpecifications";

const validationSchema = Yup.object().shape({
  branch: Yup.string().required("required"),
});
interface Props {
  property?: Property;
}

const Branches: React.FC<Props> = ({ property }) => {
  const action = useModalStore();
  const { data, isLoading, isError } = useGetCittaBranches();
  const BRANCHES =
    data?.data.map((item) => ({
      label: item.pName,
      value: item.pCode,
    })) || [];
  const { setSubscribeFormData, contract_branch_code, contract_branch_name } =
    useSubscribeFormData();
  const initialValues = {
    branch: "",
  };
  const goBack = () => {
    action.openModal(<InputIdentityInfo property={property} />);
  };
  return (
    <div className="flex flex-col w-sm max-w-sm mx-h-[65vh]">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Select your branch</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            const branch = data?.data.find(
              (item) => item.pCode === values.branch
            );

            setSubscribeFormData({
              contract_branch_code: values.branch,
              contract_branch_name: branch?.pName,
            });
            action.openModal(<PropertySpecifications property={property} />);
          }}
        >
          {({ isValid, values }) => {
            const branch = data?.data.find(
              (item) => item.pCode === values.branch
            );
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-[220px]">
                <div className="space-y-7">
                  <div className="space-y-1">
                    {isLoading || isError ? (
                      <div className="">
                        <div className="text-sm font-bold text-gray-700">
                          select branch
                        </div>
                        <div className="p-3 rounded-xl bg-gray-100">
                          <InlineLoading text="Loading branches" />
                        </div>
                      </div>
                    ) : (
                      <SelectFieldInput
                        label="Select branch"
                        name="branch"
                        options={BRANCHES}
                        placeholder="select branch"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    )}
                  </div>
                  <div className="">
                    <div className="text-sm font-bold mb-2 text-gray-700">
                      Branch Code:
                    </div>
                    <div className="p-3 rounded-xl bg-gray-100 cursor-not-allowed">
                      {branch?.pCode ? (
                        branch.pCode
                      ) : (
                        <div className="flex items-center text-sm gap-2 text-gray-700">
                          <Info size={15} />
                          <div className="">Select a branch</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  {/* <Button
                  div="Back"
                  icon={<ArrowLeft />}
                  className="bg-black rounded-lg"
                  onClick={goBack}
                /> */}
                  <Button
                    label="Proceed"
                    className="bg-adron-green rounded-lg"
                    type="submit"
                    disabled={!isValid}
                    rightIcon={<ArrowRight />}
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

export default Branches;
