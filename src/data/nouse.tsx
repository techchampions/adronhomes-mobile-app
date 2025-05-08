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
    const [firstName, lastName] = values.fullName.trim().split(" ");

    // If only one name is provided (i.e., no space), handle it as a single part name
    const userFirstName = firstName || "";
    const userLastName = lastName || "";

    const response = await apiClient.post("/register", {
      first_name: userFirstName,
      last_name: userLastName,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      referral_code: values.marketerReferralCode,
    });

    if (response.data.success) {
      setToken(response.data.token); // Save token in store
      setToastMsg("User registered successfully!");
      setToastType("success");
      setShowToast(true);

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

    if (response.data.success && response.data.otpVerified) {
      // setToastMsg("User LoggedIn successfully!");
      // setToastType("success");
      // setShowToast(true);
      showToast("User LoggedIn successfully!", "success");
      setToken(response.data.token); // Save token in store
      setHasCompletedOnboarding(true); // Set onboarding state in store
      setIsLoggedIn(true); // Set logged-in state in store
      // console.log(response.data.otp.otp); // Save OTP for verification
      setStep("onboarding complete");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      // setToastMsg(errorMessages);
      // setToastType("error");
      // setShowToast(true);
      showToast(errorMessages, "error");
    } else if (response.data.message) {
      // setToastMsg(response.data.message);
      // setToastType("error");
      // setShowToast(true);
      showToast(response.data.message, "error");
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
