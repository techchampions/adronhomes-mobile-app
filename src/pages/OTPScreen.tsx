import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import apiClient from "../utils/AxiosInstance";
import Button from "../components/Button";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useToastStore } from "../zustand/useToastStore";
import { useUserStore } from "../zustand/UserStore";

interface OTPProps {
  length?: number;
}

const OTPScreen: React.FC<OTPProps> = ({ length = 4 }) => {
  const { showToast } = useToastStore();
  const { setIsLoggedIn, token } = useUserStore();
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = useState<number>(59);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    setIsDisabled(otp.includes(""));
  }, [otp]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    const storedOtp = localStorage.getItem("otp");
    console.log(storedOtp);

    if (enteredOtp === storedOtp) {
      try {
        const response = await apiClient.post("/verify-otp", {
          otp: enteredOtp,
        });
        setIsSubmitting(true);

        if (response.data.success) {
          showToast("OTP verified successfully!", "success");
          if (token) {
            setStep("onboarding complete");
            setHasCompletedOnboarding(true);
            setIsLoggedIn(true);
          }
          setStep("signup completed");
        }
      } catch (error) {
        showToast("OTP verification failed. Please try again.", "error");
        console.error("OTP verification failed:", error);
      }
      setIsSubmitting(false);
    } else {
      showToast("Invalid OTP!", "error");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await apiClient.post("/resend-otp");

      if (response.data.success) {
        showToast("OTP resent successfully!", "success");
        setTimer(59);
        localStorage.setItem("otp", response.data.otp);
        console.log(response.data.otp);
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (error) {
      showToast("Failed to resend OTP. Please try again.", "error");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full m-auto">
      <h4 className="text-3xl font-bold text-adron-green">
        00:{timer < 10 ? `0${timer}` : timer}
      </h4>
      <p className="text-gray-500 text-sm mb-8 w-[200px] text-center">
        Type the verification code sent to your email
      </p>

      <div className="flex space-x-1">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value}
            maxLength={1}
            placeholder="0"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-15 h-16 border-2 text-center text-lg text-adron-green font-brand-bold rounded-[15px] focus:outline-none transition-all mb-20 focus:border-brand active:text-brand ${
              value
                ? "bg-adron-green text-white border-brand"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex rounded-full w-62 overflow-hidden gap-2">
        <Button
          label="Proceed"
          className={`w-full py-2 font-medium rounded-sm transition ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-adron-green text-white"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
          isLoading={isSubmitting}
        />
        {/* <button
          className={`w-full py-2 font-medium rounded-sm transition ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-brand text-white hover:bg-blue-600"
          }`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Proceed
        </button> */}
      </div>

      <p className="text-sm text-gray-500">
        Didn’t get the code?{" "}
        <button
          className="text-adron-green"
          onClick={handleResendOTP}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </button>
      </p>
    </div>
  );
};

export default OTPScreen;
