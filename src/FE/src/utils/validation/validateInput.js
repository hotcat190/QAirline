/**
 * Validates the input value.
 * @param {string} value - The value to validate.
 * @param {...(value: string) => boolean} validators - The validators to validate the value with.
 * @returns {boolean} Returns true if value is an empty string, or if value passes *any* validator, return false otherwise.
 */
export const validateInputAny = (value, validators) => {
    if (!value) return true; // Empty input is valid (handled with `required`)

    var valid = false;
    validators.forEach(validate => {
        if (validate(value)) valid = true; // Value is accepted by any validators
    });

    return valid;
};
