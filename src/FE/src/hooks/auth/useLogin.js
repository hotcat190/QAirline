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
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      const user = {role: userData.role, idCustomer: userData.idCustomer};
      // Use the login function from AuthContext to save user data
      login(user);
      if (user.role === 'admin') {
        navigate('/admin');
      }
      return { success: true };     

    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show error message to user)
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
