import React, { useState } from "react";
import './PassengerFormChildren.css';

const PassengerFormChildren = ({stt}) => {
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
    });

    const [ isExpanded, setIsExpanded ] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [ name ]: value }));

        if (value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [ name ]: `Please fill in ${name.replace(/([A-Z])/g, ' $1')}`,
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [ name ]: "" }));
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

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`form-passenger-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <form className="form-passenger" onSubmit={handleSubmit}>
                <div className="form-header">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div class="jss5461"><i class="fa fa-child"></i></div>
                        <p className="people-des" style={{ fontSize: "18px" }}>Children {stt}</p>
                    </div>
                    <div className="expand" onClick={toggleExpand}>
                        <svg className="MuiSvgIcon-root jss2826" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path d="M7 14l5-5 5 5z"></path>
                        </svg>
                    </div>
                </div>
                <div className="to-choose">
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
                </div>

                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.firstName ? 'filled' : ''} ${errors.firstName ? 'error' : ''}`}
                            placeholder=""
                            required
                        />
                        <div className="placeholder" htmlFor="inputField">First Name</div>
                        {errors.firstName && <p className="form-passenger-error">{errors.firstName}</p>}
                    </div>
                    <div className="form-passenger-group">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.lastName ? 'filled' : ''} ${errors.lastName ? 'error' : ''}`}
                            placeholder=""
                            required
                        />
                        <div className="placeholder" htmlFor="inputField">Last Name</div>
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
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Phone Number</div>
                    </div>
                    <div className="form-passenger-group">
                        <input type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.email ? 'filled' : ''} ${errors.email ? 'error' : ''}`}
                            placeholder=""
                            required />
                        <div className="placeholder" for="inputField">Email</div>
                    </div>
                </div>

                <div className="form-passenger-row">
                    <div className="form-passenger-group">
                        <input type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                            className={`form-passenger-input ${formData.idNumber ? 'filled' : ''} ${errors.idNumber ? 'error' : ''}`}
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
                            placeholder=""
                        />
                        <div className="placholder-not-required" for="inputField">Current Address</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PassengerFormChildren;
