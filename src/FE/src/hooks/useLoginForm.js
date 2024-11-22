import { useState } from "react";

export const useLoginForm = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  const onLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const jsonData = { email, password }; // Prepare JSON payload

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        // Handle success
      } else {
        console.error("Login failed:", response.status);
        // Handle error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    onLoginSubmit,
  };
};
