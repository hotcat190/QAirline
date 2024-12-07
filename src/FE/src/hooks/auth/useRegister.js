import { useState } from "react";
import { useInputValidation } from "hooks/input/useInputValidation";
import { BACKEND_BASE_URL } from "services/api";
import isEmail from "validator/es/lib/isEmail";
import isVietnameseMobilePhone from "utils/isVietnameseMobilePhone";

export const useRegister = () => {
  const { value: email, handleChange: setEmail} 
    = useInputValidation(
      "Please enter a valid email address or phone number.", 
      isEmail, isVietnameseMobilePhone
    );
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { value: retypePassword, handleChange: setRetypePassword } = useInputValidation(
    "Passwords don't match",
    (retypePassword) => { return (password === retypePassword); }
  );

  const onRegisterSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const jsonData = (isEmail(email)) ? { 
      email,
      password, 
      username,
      numberPhone: "",
    } : {
      email: "",
      numberPhone: email,
      password,
      username,
    }; // Prepare JSON payload

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const result = response.body;
        console.log("Register successful:", result);
        // Handle success
      } else {
        console.error("Register failed:", response.status);
        // Handle error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };

  return {
    onRegisterSubmit,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    retypePassword,
    setRetypePassword,
  };
};
