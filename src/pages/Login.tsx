import React from "react";
import AuthForm from "../components/AuthComponents/AuthForm";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";

const Login = () => {
  return <AuthForm isLogin={true} />;
};

export default Login;
