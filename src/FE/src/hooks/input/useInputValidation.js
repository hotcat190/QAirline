import { useState } from "react";
import { validateInputAny } from "utils/validation/validateInput";

/**
 * Return a stateful value, and a function to handle its changes.
 * @param {...(value: string) => boolean} validators - The validators to validate the value with.
 * @returns {{value: string, handleChange: (e: HTMLInputElement) => void}}
 */
export const useInputValidation = (message, ...validators) => {
  const [value, setValue] = useState("");

  const handleChange = (element) => {
    const v = element.value.toString()
    setValue(v);
    var error = (validateInputAny(v, validators)) ? "" : message;
    element.setCustomValidity(error);
  };

  return {
    value,
    handleChange,
  };
};