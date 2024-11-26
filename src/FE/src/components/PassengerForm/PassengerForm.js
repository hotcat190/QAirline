import React, { useState } from "react";
import './PassengerForm.css';

const PassengerForm = () => {
    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        country: "",
        phoneNumber: "",
        email: "",
        idNumber: "",
        expirationDate: "",
        currentAddress: ""
    });

    const [ errors, setErrors ] = useState({
        firstName: "Please fill in first name",
        lastName: "Please fill in last name",
        dateOfBirth: "Please fill in date of birth",
        country: "Please fill in country",
        phoneNumber: "Please fill in phone number",
        email: "Please fill in email",
        idNumber: "",
        expirationDate: "",
        currentAddress: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    
        if (value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `Please fill in ${name.replace(/([A-Z])/g, ' $1')}`,
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        for (const field in formData) {
            if (formData[ field ].trim() === "") {
                newErrors[ field ] = `Please fill in ${field.replace(/([A-Z])/g, ' $1')}`;
            }
        }
        setErrors(newErrors);
    };


    return (
        <div className="form-passenger-container">
            <form className="form-passenger" onSubmit={handleSubmit}>
                <div className="form-group-gender">
                    <label>
                        <input type="radio" name="gender" value="male" />
                        Nam
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" />
                        Nữ
                    </label>
                    <label>
                        <input type="radio" name="gender" value="other" />
                        Khác
                    </label>
                </div>
                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.firstName ? 'filled' : ''} ${errors.firstName ? 'error' : ''}`}
                            id="firstName"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">First Name</div>
                        {errors.firstName && <p className="form-passenger-error">{errors.firstName}</p>}
                    </div>
                    <div className="form-passenger-group">
                        <input type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.lastName ? 'filled' : ''} ${errors.lastName ? 'error' : ''}`}
                            id="lastName"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Last Name</div>
                        {errors.lastName && <p className="form-passenger-error">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.dateOfBirth ? 'filled' : ''} ${errors.dateOfBirth ? 'error' : ''}`}
                            id="dateOfBirth"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Day/Month/Year</div>
                        {errors.dateOfBirth && <p className="form-passenger-error">{errors.dateOfBirth}</p>}
                    </div>
                    <div className="form-passenger-group">
                        <input type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.country ? 'filled' : ''} ${errors.country ? 'error' : ''}`}
                            id="country"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Country</div>
                        {errors.country && <p className="form-passenger-error">{errors.country}</p>}
                    </div>
                </div>

                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.phoneNumber ? 'filled' : ''} ${errors.phoneNumber ? 'error' : ''}`}
                            id="phoneNumber"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Phone Number</div>
                        {errors.phoneNumber && <p className="form-passenger-error">{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-passenger-group">
                        <input type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.email ? 'filled' : ''} ${errors.email ? 'error' : ''}`}
                            id="email"
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Email</div>
                        {errors.email && <p className="form-passenger-error">{errors.email}</p>}
                    </div>
                </div>

                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.idNumber ? 'filled' : ''} ${errors.idNumber ? 'error' : ''}`}
                            id="idNumber"
                            placeholder=""
                        />
                        <div className="placholder-not-required" for="inputField">ID Number</div>
                    </div>
                    <div className="form-passenger-group">
                        <input type="text"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.expirationDate ? 'filled' : ''} ${errors.expirationDate ? 'error' : ''}`}
                            id="expirationDate"
                            placeholder=""
                        />
                        <div className="placholder-not-required" for="inputField">Expiration Date</div>
                    </div>
                </div>

                <div className="form-passenger-row single">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.currentAddress ? 'filled' : ''} ${errors.currentAddress ? 'error' : ''}`}
                            id="currentAddress"
                            placeholder=""
                        />
                        <div className="placholder-not-required" for="inputField">Current Address</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PassengerForm;
