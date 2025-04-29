import React from "react";
import AuthForm from "../components/AuthComponents/AuthForm";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";

const ResetPassword = () => {
  return <AuthForm isResetPassword={true} />;
};

export default ResetPassword;
