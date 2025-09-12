import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useOnboardingStore } from "../../zustand/OnboardingStore";
import Auth from "../../utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = ({
  isLogin = false,
  isForgotPassword = false,
  isResetPassword = false,
  isSignup = false,
}) => {
  const { setStep } = useOnboardingStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const from = localStorage.getItem("from");

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

const handleSubmit = (
  values: any, 
  { setSubmitting }: FormikHelpers<any>
) => {
  if (isForgotPassword) {
    Auth.handleForgotpassword(values, { setSubmitting }, navigate);
  } else if (isResetPassword) {
    Auth.handleResetPassword(
      { ...values, OTP: Number(values.OTP) },
      { setSubmitting },
      navigate
    );
  } else if (isLogin) {
    Auth.login(values, { setSubmitting }, navigate);
  } else if (isSignup) {
    Auth.register(values, { setSubmitting }, navigate);
  }
};


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-2 sm:space-y-3 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-md mx-auto">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-black text-center ">
            {isForgotPassword
              ? "Forgot Password"
              : isResetPassword
              ? "Reset Password"
              : isLogin
              ? "Login to Adron Homes"
              : "Signup on Adron Homes"}
          </h1>
          {!isLogin && !isForgotPassword && !isResetPassword && (
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
                Full Name
              </label>
              <InputField name="fullName" placeholder="Full Name" />
            </div>
          )}
          {!isResetPassword && (
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
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
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
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
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
                OTP Code
              </label>
              <InputField name="OTP" type="number" placeholder="OTP code" />
            </div>
          )}
          {(isLogin || isResetPassword || isSignup) && (
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
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
                      className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )
                }
              />
            </div>
          )}
          {isSignup && (
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
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
          {isResetPassword && (
            <div>
              <label className="text-gray-400 text-xs sm:text-sm">
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
                      className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )
                }
              />
            </div>
          )}
          {isLogin && (
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <div className="flex items-center space-x-2 px-4 sm:px-6">
                <input
                  type="checkbox"
                  id="remember"
                  className="text-adron-green"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span
                className="text-[#FF4A1B] cursor-pointer"
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
            className="bg-adron-green text-white w-full py-1.5 sm:py-2 rounded-full mt-4 sm:mt-6"
          />
          <div className="text-xs sm:text-sm flex gap-1 items-center text-center justify-center mb-4 sm:mb-6">
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
              <>
                Already have an account?{" "}
                <Button
                  label="Sign In"
                  className="!text-adron-green bg-transparent font-medium !w-fit underline"
                  onClick={() => {
                    setStep("login");
                    navigate("/login");
                  }}
                />
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;