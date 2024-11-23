import { useState } from "react";
import { useInputValidation } from "hooks/input/useInputValidation";
import { BACKEND_BASE_URL } from "services/api";
import isEmail from "validator/es/lib/isEmail";
import isVietnameseMobilePhone from "utils/isVietnameseMobilePhone";

export const useLogin = () => {
  const { value, handleChange: setEmail} = useInputValidation(
    "Please enter a valid email address or phone number.",
    isEmail, isVietnameseMobilePhone);
  const [password, setPassword] = useState("");  

  const onLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const jsonData = (isEmail(value)) ? { 
      email: value,
      password, 
    } : {
      numberPhone: value,
      password,
    }; // Prepare JSON payload

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result.role);
        // Handle success
      } else {
        console.error("Login failed:", (await response.text()).toString());
        // Handle error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };

  return {
    onLoginSubmit,
    value,
    setEmail,
    password,
    setPassword,
  };
};
