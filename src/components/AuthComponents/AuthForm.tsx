import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useOnboardingStore } from "../../zustand/OnboardingStore";
import Auth from "../../utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const from = localStorage.getItem("from");

  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    OTP: "",
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
          OTP: Yup.number().required("Required"),
          password: Yup.string().required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
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
          phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .min(11, "Phone number must be at least 10 digits")
            .max(15, "Phone number must be 15 digits or less")
            .required("Required"),
          password: Yup.string().required("Required"),
          marketerReferralCode: Yup.string().optional(),
        }
      : {
          fullName: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .min(11, "Phone number must be at least 10 digits")
            .max(15, "Phone number must be 15 digits or less")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        }),
  });

  // Handle form submission based on state
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (isForgotPassword) {
      Auth.handleForgotpassword(values, { setSubmitting }, navigate);
    } else if (isResetPassword) {
      // Auth.handleResetPassword(values, { setSubmitting });
      // When calling the function:
      Auth.handleResetPassword(
        {
          ...values,
          OTP: Number(values.OTP), // Convert string OTP to number
        },
        { setSubmitting },
        navigate
      );
      console.log("Resetting password:", values.password);
    } else if (isLogin) {
      Auth.login(values, { setSubmitting }, navigate);
    } else if (isSignup) {
      // handleSignup(values, { setSubmitting });
      Auth.register(values, { setSubmitting }, navigate);
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
        <Form className="space-y-3 flex flex-col px-4 md:px-10 lg:px-20">
          <h1 className="font-bold text-2xl font text-black text-center py-4">
            {isForgotPassword
              ? "Forgot Password"
              : isResetPassword
              ? "Reset Password"
              : isLogin
              ? "Login to Adron Homes"
              : "Signup on Adron Homes"}
          </h1>
          {/* Render based on state */}
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Full Name
              </label>

              <InputField name="fullName" placeholder="Full Name" />
            </div>
          )}
          {!isResetPassword && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Email
              </label>
              <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                className="input"
              />
            </div>
          )}
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Phone Number
              </label>

              <InputField
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="input"
              />
            </div>
          )}
          {isResetPassword && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                OTP Code
              </label>

              <InputField name="OTP" type="number" placeholder="OTP code" />
            </div>
          )}
          {/* Password and Confirm Password Fields */}
          {(isLogin || isResetPassword || isSignup) && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Password
              </label>

              <InputField
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
                rightIcon={
                  showPassword ? (
                    <FaEye
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )
                }
              />
            </div>
          )}
          {/* Marketer Referral Code (Only for Signup) */}
          {isSignup && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Marketer Referral Code
              </label>

              <InputField
                name="marketerReferralCode"
                type="text"
                placeholder="Marketer Referral Code"
                className="input"
              />
            </div>
          )}
          {/* Confirm Password (Only for reset) */}
          {isResetPassword && (
            <div className="">
              <label htmlFor="" className="text-gray-400 text-sm">
                Confirm Password
              </label>

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
            </div>
          )}
          {/* Forgot Password Link */}
          {isLogin && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-xs px-6">
                <input
                  type="checkbox"
                  id="remember"
                  className="text-adron-green"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span
                className="text-[#FF4A1B] text-xs cursor-pointer"
                onClick={() => {
                  setStep("forgot password");
                  navigate("/forgot-password");
                }}
              >
                Forgot password?
              </span>
            </div>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            loadingText="Loading..."
            label={
              isForgotPassword
                ? "Recover Password"
                : isResetPassword
                ? "Reset Password"
                : isLogin
                ? "Log In"
                : "Sign Up"
            }
            className={`bg-adron-green text-white w-full py-2 rounded-full mt-10`}
          />
          {/* Link to switch between forms */}
          <div className="text-sm flex gap-1 items-center text-center justify-center">
            {isLogin ? (
              <>
                Are you new?{" "}
                <Button
                  label="Create an Account"
                  className="!text-adron-green bg-transparent font-medium !w-fit underline"
                  onClick={() => {
                    setStep("signup");
                    navigate("/signup");
                  }}
                />
              </>
            ) : (
              <div className="mb-10">
                Already have an account?{" "}
                <Button
                  label="Sign In"
                  className="!text-adron-green bg-transparent font-medium !w-fit underline"
                  onClick={() => {
                    setStep("login");
                    navigate("/login");
                  }}
                />
              </div>
            )}
          </div>
          {/* Toast notification */}
          {/* {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )} */}
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
