// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
// import InputField from "../InputField";
// import Button from "../Button";
// import { useOnboardingStore } from "../../zustand/OnboardingStore";

// type AuthFormProps = {
//   isLogin?: boolean;
// };

// const AuthForm = ({ isLogin = false }: AuthFormProps) => {
//   const { setStep } = useOnboardingStore();
//   const initialValues = {
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const validationSchema = Yup.object({
//     ...(isLogin
//       ? {
//           email: Yup.string().email("Invalid email").required("Required"),
//           password: Yup.string().required("Required"),
//         }
//       : {
//           fullName: Yup.string().required("Required"),
//           email: Yup.string().email("Invalid email").required("Required"),
//           phone: Yup.string().required("Required"),
//           password: Yup.string().required("Required"),
//         }),
//   });

//   const handleSubmit = (values: typeof initialValues) => {
//     setStep("verify OTP");
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form className="space-y-3 flex flex-col">
//         <h1 className="font-bold text-3xl text-black text-center py-4">
//           {isLogin ? "Login" : "Register"}
//         </h1>
//         {!isLogin && <InputField name="fullName" placeholder="Full Name" />}
//         <InputField
//           name="email"
//           type="email"
//           placeholder="Email Address"
//           className="input"
//         />
//         {!isLogin && (
//           <InputField
//             name="phone"
//             type="tel"
//             placeholder="Phone Number"
//             className="input"
//           />
//         )}

//         <InputField
//           name="password"
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           className="input"
//           rightIcon={
//             showPassword ? (
//               <FaEyeSlash
//                 className="text-gray-500 w-5 h-5 cursor-pointer"
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <FaEye
//                 className="text-gray-500 w-5 h-5 cursor-pointer"
//                 onClick={() => setShowPassword(true)}
//               />
//             )
//           }
//         />
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2 text-sm px-6">
//             <input type="checkbox" id="remember" className="text-adron-green" />
//             <label htmlFor="remember">Remember me</label>
//           </div>
//           <span
//             className="text-red-500 text-sm cursor-pointer"
//             onClick={() => setStep("reset password")}
//           >
//             {" "}
//             Forgot password?
//           </span>
//         </div>
//         <Button
//           type="submit"
//           label={isLogin ? "Log In" : "Sign Up"}
//           className="bg-adron-green text-white w-full py-2 rounded-full mt-10"
//         />

//         <p className="text-sm flex items-center text-center justify-center">
//           {isLogin ? (
//             <>
//               Are you new?{" "}
//               <Button
//                 label="Create an Account"
//                 className="!text-adron-green font-medium !w-fit"
//                 onClick={() => setStep("signup")}
//               />
//             </>
//           ) : (
//             <>
//               Already have an account?
//               <Button
//                 label="Sign In"
//                 className="!text-adron-green font-medium !w-fit"
//                 onClick={() => setStep("login")}
//               />
//             </>
//           )}
//         </p>
//       </Form>
//     </Formik>
//   );
// };

// export default AuthForm;
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useOnboardingStore } from "../../zustand/OnboardingStore";

type AuthFormProps = {
  isLogin?: boolean;
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
};

const AuthForm = ({
  isLogin = false,
  isForgotPassword = false,
  isResetPassword = false,
}: AuthFormProps) => {
  const { setStep } = useOnboardingStore();
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "", // Add a confirm password field for reset
  };
  const [showPassword, setShowPassword] = useState(false);

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
      : {
          fullName: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        }),
  });

  // Handle form submission based on state
  const handleSubmit = (values: typeof initialValues) => {
    if (isForgotPassword) {
      setStep("reset password");
      console.log("Sending reset password email to:", values.email);
      // Add forgot password logic here
    } else if (isResetPassword) {
      setStep("verify OTP");
      console.log("Resetting password:", values.password);
      // Add reset password logic here
    } else if (isLogin) {
      setStep("verify OTP");
      console.log("Logging in with:", values);
      // Add login logic here
    } else {
      setStep("verify OTP");
      console.log("Registering with:", values);
      // Add signup logic here
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-3 flex flex-col">
        <h1 className="font-bold text-3xl text-black text-center py-4">
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
        {(isLogin || isResetPassword) && (
          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
            rightIcon={
              showPassword ? (
                <FaEyeSlash
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
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
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(true)}
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
      </Form>
    </Formik>
  );
};

export default AuthForm;
