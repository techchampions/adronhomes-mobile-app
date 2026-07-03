import { Form, Formik } from "formik";
import { useOutletContext } from "react-router-dom";
import { useSendRequest } from "../../hooks/estateCommunity/useEstateCommunity";
import Button from "../Button";
import SelectInput from "../FormComponents/SelectInput";
import ImageUploadField from "../ImageUplaodField2";
import InputField from "../InputField";

const MaintainaceRequestForm = () => {
  const { mutate, isPending } = useSendRequest();
  const context: CommunityOutletContext = useOutletContext();
  const initialValues = {
    title: "",
    content: "",
    attached: null,
    estate_id: context.data?.estate_info.id,
    priority: "Medium",
  };
  const PRIORITY_OPTIONS = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];
  const submit = (values: RequestPaylaod) => {
    mutate(values);
  };
  return (
    <Formik initialValues={initialValues} validateOnMount onSubmit={submit}>
      {() => (
        <Form className="rounded-xl border border-gray-100 bg-white p-5">
          <h4 className="font-semibold text-gray-800">Submit a request</h4>
          <div className="mt-4 space-y-2">
            <div className="grid sm:grid-cols-2 gap-2">
              <InputField
                name="title"
                label="Title"
                className="rounded-xl bg-white border border-gray-300"
                placeholder="Title"
              />
              <SelectInput
                options={PRIORITY_OPTIONS}
                name="priority"
                label="Priority"
              />
            </div>
            <InputField
              type="textarea"
              placeholder="Description of your request or problem."
              name="content"
              label="What Happened?"
              className="rounded-xl bg-white border border-gray-300"
            />
            <ImageUploadField name="attached" width={"100%"} height={150} />
          </div>
          <Button
            label="Submit"
            type="submit"
            className="mt-4"
            isLoading={isPending}
            disabled={isPending}
          />{" "}
        </Form>
      )}
    </Formik>
  );
};

export default MaintainaceRequestForm;
