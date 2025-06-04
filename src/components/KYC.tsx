import { Form, Formik } from "formik";
import * as Yup from "yup";

import SelectField from "./SelectField";
import InputField from "./InputField";
import { RiUpload2Line } from "react-icons/ri";

const KYC = () => {
  const initialValues = {
    govId: "",
    govIdType: "",
    nextOfKinName: "",
    bankStatement: null,
    utilityBill: null,
    nextOfKinRelationship: "",
    nextOfKinPhone: "",
  };
  const validationSchema = Yup.object({
    govId: Yup.string().required("Required"),
    govIdType: Yup.string().required("Required"),
    nextOfKinName: Yup.string().required("Required"),
    bankStatement: Yup.mixed().required("Required"),
    utilityBill: Yup.mixed().required("Required"),
    nextOfKinRelationship: Yup.string().required("Required"),
    nextOfKinPhone: Yup.string().required("Required"),
  });
  const submit = () => {
    console.log("submittiing");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-10">
          <div className="bg-white p-6 rounded-3xl space-y-6">
            <h4 className="text-lg font-bold">Customer Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-sm col-span-2">
                  Government Issued ID
                </label>
                <SelectField
                  name="govIdType"
                  options={["National ID", "Passport", "Driver's License"]}
                />
                <InputField name="govId" />
              </div>
              <div>
                <label className="block text-sm">Next of Kin Full Name</label>
                <InputField name="nextOfKinName" />
              </div>
              <div>
                <label className="block text-sm">Bank Statement</label>
                <div className="flex justify-between w-full px-4 py-4 bg-adron-body rounded-3xl items-center">
                  <input
                    type="file"
                    name="bankStatement"
                    className="text-xs"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("bankStatement", e.target.files[0]);
                      }
                    }}
                  />
                  <RiUpload2Line />{" "}
                </div>
              </div>
              <div>
                <label className="block text-sm">Relationship</label>
                <InputField name="nextOfKinRelationship" />
              </div>
              <div>
                <label className="block text-sm">Utility Bill</label>
                <div className="flex justify-between w-full px-4 py-4 bg-adron-body rounded-3xl items-center">
                  <input
                    type="file"
                    name="utilityBill"
                    className="text-xs"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("utilityBill", e.target.files[0]);
                      }
                    }}
                  />
                  <RiUpload2Line />{" "}
                </div>
              </div>
              <div>
                <label className="block text-sm">Next of Kin Phone</label>
                <InputField name="nextOfKinPhone" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default KYC;
