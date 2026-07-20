// Login.tsx
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import LoginForm from "../components/AuthComponents/LoginForm";
import Button from "../components/Button";
import Auth from "../utils/Auth";

interface OutletContextType {
  onStepChange: (step: "login" | "select") => void;
  setUserAccounts: (accounts: any[]) => void;
  setAuthValues: (values: { email: string; password: string }) => void;
}

const Login = () => {
  const { onStepChange, setUserAccounts, setAuthValues } =
    useOutletContext<OutletContextType>();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();
  const [lodaing, setlodaing] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    setlodaing(true);
    const accounts = await Auth.login(values, navigate);

    if (accounts) {
      setUserAccounts(accounts);
      setAuthValues(values);
      onStepChange("select");
    }
    setlodaing(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <div className="">
          <h1 className="font-black text-3xl text-center mb-5">
            Login to Adron Homes
          </h1>
          <Form className="space-y-2 flex flex-col px-4 md:px-10 lg:px-12 ">
            <LoginForm />
            <Button
              type="submit"
              isLoading={lodaing}
              disabled={lodaing || !isValid}
              loadingText="Loading..."
              label={"Log In"}
              className={`bg-adron-green text-white w-full py-2 rounded-full mt-3`}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
// if (step === "select") {
//   return <AccountSelect users={userAccounts} values={authvalues} />;
// }

export default Login;
