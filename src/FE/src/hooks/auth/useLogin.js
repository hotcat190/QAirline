import { useState } from "react";
import { useInputValidation } from "hooks/input/useInputValidation";
import { BACKEND_BASE_URL } from "services/api";
import isEmail from "validator/es/lib/isEmail";
import isVietnameseMobilePhone from "utils/isVietnameseMobilePhone";
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export const useLogin = () => {
  const { value: email, handleChange: setEmail} = useInputValidation(
    "Please enter a valid email address or phone number.",
    isEmail, isVietnameseMobilePhone);
  const [password, setPassword] = useState("");  

  const navigate = useNavigate();
  const { login } = useAuth();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make your API call to authenticate
      const response = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });      

      if (!response.ok) {
        if (response.status === 500) {
          const error = await response.text();
          return { success: false, message: `Login failed: ${error}` };
        }
        else if (response.status === 400 || response.status === 401) {
          const errorBody = await response.json();
          if (errorBody.message) {
              return { success: false, message: `Login failed: ${errorBody.message}` };
          }
        }
      }
      
      const userData = await response.json();
      const user = {role: userData.role, username: userData.username};
      // Use the login function from AuthContext to save user data
      login(user);
      
      if (user.role === 'admin') {
        navigate('/admin');
      }
      return { success: true };     

    } catch (error) {
      if (error instanceof TypeError && error.message.includes("NetworkError")) {
        return { success: false, message: "Server is currently unavailable. Please try again later." };
      }
      console.error(error);
      // Handle error (show error message to user)
      return { success: false, message: error.message };
    }
  };

  return {
    onLoginSubmit,
    email,
    setEmail,
    password,
    setPassword,
  };
};
