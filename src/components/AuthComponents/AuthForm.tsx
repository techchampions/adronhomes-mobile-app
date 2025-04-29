import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useOnboardingStore } from "../../zustand/OnboardingStore";
import { login, signup } from "../../utils/Auth";
import Toast from "../Toast";
import { useUserStore } from "../../zustand/UserStore";
import apiClient from "../../utils/AxiosInstance";

type AuthFormProps = {
  isLogin?: boolean;
  isSignup?: boolean;
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
};

const AuthForm = ({
  isLogin = false,
  isForgotPassword = false,
  isResetPassword = false,
  isSignup = false,
}: AuthFormProps) => {
  const { setStep } = useOnboardingStore();
  const {
    setToken,
    setReferralCode,
    setId,
    setEmail,
    setFirstName,
    setLastName,
    setPhoneNumber,
  } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    marketerReferralCode: "",
  };

  // Validation schema that changes based on the state (login, forgot, reset)
  const validationSchema = Yup.object({
    ...(isForgotPassword
      ? {
          email: Yup.string().email("Invalid email").required("Required"),
        }
      : isResetPassword
      ? {
          password: Yup.string().required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
        }
      : isLogin
      ? {
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        }
      : isSignup
      ? {
          fullName: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
          marketerReferralCode: Yup.string().optional(),
        }
      : {
          fullName: Yup.string().required("Required"),
          phone: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        }),
  });

  const handleToast = (msg: string, type: "success" | "error") => {
    setToastMsg(msg);
    setToastType(type);
  };

  // Handle SignUp
  const handleSignup = async (
    values: {
      fullName: string;
      email: string;
      phone: string;
      password: string;
      marketerReferralCode: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await apiClient.post("/register", {
        first_name: values.fullName,
        last_name: values.fullName,
        email: values.email,
        phone_number: values.phone,
        password: values.password,
        referral_code: values.marketerReferralCode,
      });

      if (response.data.success) {
        setToken(response.data.token); // Save token in store
        // setStore({
        //   id: response.data.user.id,
        //   name: response.data.user.store_name,
        //   address: "",
        //   description: "",
        //   logoUrl: "",
        // });
        setToastMsg("User registered successfully!");
        setToastType("success");
        setShowToast(true);

        // setPlanID(response.data.user.plan_id);
        setEmail(response.data.user.email);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setReferralCode(response.data.user.referral_code);
        setPhoneNumber(response.data.user.phone_number);
        setId(response.data.user.id);
        localStorage.setItem("otp", response.data.otp.otp);
        console.log(response.data.otp.otp); // Save OTP for verification
        setStep("verify OTP");
      } else if (response.data.errors) {
        const errorMessages = Object.values(response.data.errors)
          .flat()
          .join("\n"); // Combine errors into a readable string
        setToastMsg(errorMessages);
        setToastType("error");
        setShowToast(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join("\n"); // Extract and format error messages
        setToastMsg(errorMessages);
      } else {
        setToastMsg("Something went wrong. Please try again.");
      }
      setToastType("error");
      setShowToast(true);
      console.error("Signup failed:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleLogin = async (
    values: {
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await apiClient.post("/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.success) {
        setToken(response.data.token); // Save token in store
        setToastMsg("User LoggedIn successfully!");
        setToastType("success");
        setShowToast(true);
        // console.log(response.data.otp.otp); // Save OTP for verification
        setStep("verify OTP");
      } else if (response.data.errors) {
        const errorMessages = Object.values(response.data.errors)
          .flat()
          .join("\n"); // Combine errors into a readable string
        setToastMsg(errorMessages);
        setToastType("error");
        setShowToast(true);
      } else if (response.data.message) {
        setToastMsg(response.data.message);
        setToastType("error");
        setShowToast(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join("\n"); // Extract and format error messages
        setToastMsg(errorMessages);
      } else {
        setToastMsg("Something went wrong. Please try again.");
      }
      setToastType("error");
      setShowToast(true);
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle form submission based on state
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (isForgotPassword) {
      setStep("reset password");
      console.log("Sending reset password email to:", values.email);
    } else if (isResetPassword) {
      setStep("verify OTP");
      console.log("Resetting password:", values.password);
    } else if (isLogin) {
      handleLogin(values, { setSubmitting });
      console.log("Logging in with:", values);
    } else if (isSignup) {
      handleSignup(values, { setSubmitting });
      console.log("Registering with:", values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={handleSubmit}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3 flex flex-col">
          <h1 className="font-medium text-3xl text-black text-center py-4">
            {isForgotPassword
              ? "Forgot Password"
              : isResetPassword
              ? "Reset Password"
              : isLogin
              ? "Login"
              : "Register"}
          </h1>
          {/* Render based on state */}
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <InputField name="fullName" placeholder="Full Name" />
          )}
          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            className="input"
          />
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <InputField
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="input"
            />
          )}
          {/* Password and Confirm Password Fields */}
          {(isLogin || isResetPassword || isSignup) && (
            <InputField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              rightIcon={
                showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )
              }
            />
          )}
          {/* Marketer Referral Code (Only for Signup) */}
          {isSignup && (
            <InputField
              name="marketerReferralCode"
              type="text"
              placeholder="Marketer Referral Code"
              className="input"
            />
          )}
          {/* Confirm Password (Only for reset) */}
          {isResetPassword && (
            <InputField
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input"
              rightIcon={
                showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )
              }
            />
          )}
          {/* Forgot Password Link */}
          {isLogin && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm px-6">
                <input
                  type="checkbox"
                  id="remember"
                  className="text-adron-green"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span
                className="text-red-500 text-sm cursor-pointer"
                onClick={() => setStep("forgot password")}
              >
                Forgot password?
              </span>
            </div>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            label={
              isForgotPassword
                ? "Recover Password"
                : isResetPassword
                ? "Reset Password"
                : isLogin
                ? "Log In"
                : "Sign Up"
            }
            className="bg-adron-green text-white w-full py-2 rounded-full mt-10"
          />
          {/* Link to switch between forms */}
          <p className="text-sm flex items-center text-center justify-center">
            {isLogin ? (
              <>
                Are you new?{" "}
                <Button
                  label="Create an Account"
                  className="!text-adron-green font-medium !w-fit"
                  onClick={() => setStep("signup")}
                />
              </>
            ) : (
              <>
                Already have an account?
                <Button
                  label="Sign In"
                  className="!text-adron-green font-medium !w-fit"
                  onClick={() => setStep("login")}
                />
              </>
            )}
          </p>
          {/* Toast notification */}
          {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
