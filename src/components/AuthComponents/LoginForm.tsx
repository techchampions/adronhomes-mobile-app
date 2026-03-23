import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import InputField from "../InputField";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-4">
      <div className="">
        <label htmlFor="" className="text-gray-400 text-sm">
          Email
        </label>
        <InputField
          name="email"
          type="email"
          placeholder="Email Address"
        //   className="p-4!"
        />
      </div>
      <div className="">
        <label htmlFor="" className="text-gray-400 text-sm">
          Password
        </label>

        <InputField
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        //   className="p-4!"
          rightIcon={
            showPassword ? (
              <Eye
                className="text-gray-500 w-5 h-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeOff
                className="text-gray-500 w-5 h-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )
          }
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center space-x-2 text-xs px-6">
          <input type="checkbox" id="remember" className="text-adron-green" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <span
          className="text-[#FF4A1B] text-xs cursor-pointer"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot password?
        </span>
      </div>
      <div className="text-sm flex gap-1 items-center text-center justify-center mt-10">
        Are you new?{" "}
        <Button
          label="Create an Account"
          className="!text-adron-green bg-transparent font-medium !w-fit underline"
          onClick={() => {
            navigate("/signup");
          }}
        />
      </div>
    </div>
  );
};
export default LoginForm;