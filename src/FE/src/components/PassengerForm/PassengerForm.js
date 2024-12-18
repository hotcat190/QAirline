import React, { useState } from "react";
import './PassengerForm.css';

const PassengerForm = ({stt}) => {
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
                        <div class="jss4140"><i class="fa fa-male"></i></div>
                        <p className="people-des" style={{ fontSize: "18px" }}>Adult {stt}</p>
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
                        {errors.phoneNumber && <p className="form-passenger-error">{errors.phoneNumber}</p>}
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

                <p style={{ fontSize: "11px", color: "#333", marginTop: "10px" }}>The journey information is received via OTT messages to the phone number (Service Fee: Zalo: 0 VND, WhatsApp: 0 VND)</p>
                <div className="receive-info">

                    <button className="MuiTab-root" style={{border: "1px solid red", color: "red"}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3779 3.31317C14.7955 3.73073 14.7955 4.40774 14.3779 4.8253L6.89327 12.3099C6.69275 12.5105 6.42079 12.6231 6.13721 12.6231C5.85363 12.6231 5.58167 12.5105 5.38115 12.3099L1.59113 8.5211C1.17357 8.10354 1.21955 7.47857 1.63711 7.06101C2.05467 6.64344 2.68628 6.59083 3.10385 7.00839L6.13721 10.0418L12.8658 3.31317C13.2834 2.89561 13.9604 2.89561 14.3779 3.31317Z" fill="#EC2029"></path></svg>
                    No selected</button>
                    <button
                        className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit jss7901"
                        tabIndex="0"
                        type="button"
                        role="tab"
                        aria-selected="false"
                    >
                        <span className="MuiTab-wrapper">
                            <div className="jss7742">
                                <div className="jss7743">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path
                                            d="M20.873 9.05641C20.7931 7.21926 20.4522 6.03414 19.8807 4.96799C19.2349 3.74867 18.2364 2.7517 17.0153 2.10685C15.7862 1.45179 14.3957 1.10093 12.0234 1.10093H10.2996C9.51577 1.09262 8.73237 1.14295 7.95604 1.25151C6.93563 1.36724 5.94617 1.67375 5.03935 2.15503C3.79926 2.81052 2.78515 3.82311 2.12869 5.06135C1.45758 6.31574 1.10016 7.72673 1.10016 10.1361V11.8905C1.10016 14.2998 1.45758 15.7138 2.12869 16.9667C2.78515 18.205 3.79926 19.2176 5.03935 19.873C6.2941 20.5432 7.7087 20.9 10.1232 20.9H11.8771C14.2901 20.9 15.7062 20.5432 16.961 19.873C18.2011 19.2176 19.2152 18.205 19.8716 16.9667C20.5427 15.7138 20.9002 14.3013 20.9002 11.8905V10.1361C20.9002 9.75363 20.8911 9.39523 20.873 9.05641Z"
                                            fill="white"
                                        ></path>
                                        <mask id="mask0_3084_5916" maskUnits="userSpaceOnUse" x="1" y="1" width="20" height="20" style={{ maskType: 'alpha' }}>
                                            <path
                                                d="M20.873 9.05641C20.7931 7.21926 20.4522 6.03414 19.8807 4.96799C19.2349 3.74867 18.2364 2.7517 17.0153 2.10685C15.7862 1.45179 14.3957 1.10093 12.0234 1.10093H10.2996C9.51577 1.09262 8.73237 1.14295 7.95604 1.25151C6.93563 1.36724 5.94617 1.67375 5.03935 2.15503C3.79926 2.81052 2.78515 3.82311 2.12869 5.06135C1.45758 6.31574 1.10016 7.72673 1.10016 10.1361V11.8905C1.10016 14.2998 1.45758 15.7138 2.12869 16.9667C2.78515 18.205 3.79926 19.2176 5.03935 19.873C6.2941 20.5432 7.7087 20.9 10.1232 20.9H11.8771C14.2901 20.9 15.7062 20.5432 16.961 19.873C18.2011 19.2176 19.2152 18.205 19.8716 16.9667C20.5427 15.7138 20.9002 14.3013 20.9002 11.8905V10.1361C20.9002 9.75363 20.8911 9.39523 20.873 9.05641Z"
                                                fill="white"
                                            ></path>
                                        </mask>
                                        <g mask="url(#mask0_3084_5916)">
                                            <path
                                                d="M17.0357 19.842C15.6797 20.5677 14.1999 20.8646 11.9277 20.8646H10.081C7.81038 20.8646 6.33051 20.5677 4.9729 19.842C3.75651 19.1983 2.76303 18.2021 2.12273 16.9839C1.39709 15.6342 1.10016 14.1623 1.10016 11.8837V10.0339C1.10016 7.76171 1.39709 6.28184 2.12273 4.92583C2.71934 3.79557 3.62169 2.85581 4.72679 2.21379C1.96871 5.74674 1.93854 12.1632 4.63469 15.7501C5.07929 16.4107 4.64581 17.5571 3.97415 18.2256C3.86777 18.332 3.91064 18.3939 4.06783 18.4114C5.02054 18.5146 6.21777 18.2431 7.06409 17.8302C10.5034 19.7356 15.7512 19.7706 19.2667 17.9509C18.6683 18.735 17.9072 19.3802 17.0357 19.842Z"
                                                fill="#0068FF"
                                            ></path>
                                        </g>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14.7047 12.4417V7.535H13.8591V12.1604C13.8599 12.3154 13.9854 12.4409 14.1404 12.4417H14.7047ZM9.12287 12.1088V11.6524H6.24979L8.78679 8.46666C8.82275 8.42133 8.89622 8.33692 8.92904 8.2994L8.94624 8.28064C9.0725 8.09743 9.1346 7.87758 9.12287 7.65538V7.53502H5.17903V8.38069H7.91299L5.20873 11.7305C5.10288 11.8744 5.05088 12.0509 5.06179 12.2292V12.448H8.78367C8.97101 12.448 9.12287 12.2962 9.12287 12.1088ZM11.2553 8.62134C11.6641 8.6213 12.0621 8.75162 12.3917 8.99337V8.7292H13.1827V12.4417H12.7309C12.546 12.4417 12.3951 12.2936 12.3917 12.1087C11.7169 12.6012 10.8016 12.6028 10.125 12.1127C9.44836 11.6227 9.16454 10.7525 9.42208 9.9577C9.67962 9.16293 10.4199 8.62458 11.2553 8.62446V8.62134ZM10.1216 10.5488C10.1216 9.92286 10.629 9.41546 11.2549 9.41546C11.8808 9.41546 12.3882 9.92286 12.3882 10.5488C12.3882 11.1747 11.8808 11.682 11.2549 11.682C10.629 11.682 10.1216 11.1747 10.1216 10.5488ZM17.2062 8.59799C18.2779 8.59713 19.1475 9.4647 19.1492 10.5363C19.151 11.6079 18.2841 12.4783 17.2125 12.4809C16.1409 12.4835 15.2698 11.6173 15.2664 10.5457C15.2647 10.03 15.4683 9.53479 15.8322 9.16939C16.1962 8.80399 16.6905 8.5984 17.2062 8.59799ZM16.0651 10.5395C16.0651 9.90924 16.576 9.39835 17.2062 9.39835C17.8364 9.39835 18.3473 9.90924 18.3473 10.5395C18.3473 11.1697 17.8364 11.6806 17.2062 11.6806C16.576 11.6806 16.0651 11.1697 16.0651 10.5395Z"
                                            fill="#0068FF"
                                        ></path>
                                    </svg>
                                    Zalo OA
                                </div>
                            </div>
                        </span>
                        <span className="MuiTouchRipple-root"></span>
                    </button>

                    <button
                        className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit jss7901"
                        tabIndex="0"
                        type="button"
                        role="tab"
                        aria-selected="false"
                    >
                        <span className="MuiTab-wrapper">
                            <div className="jss7742">
                                <div className="jss7743">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path
                                            d="M13.1123 12.4807L15.0889 13.4673C14.9952 13.9354 14.742 14.3566 14.3725 14.6589C14.0029 14.9612 13.5399 15.1259 13.0625 15.125C11.422 15.1232 9.84927 14.4707 8.68929 13.3107C7.5293 12.1507 6.87682 10.578 6.875 8.9375C6.87487 8.46065 7.03997 7.99848 7.34221 7.62965C7.64445 7.26082 8.06516 7.00811 8.53273 6.91453L9.5193 8.89109L8.67969 10.1406C8.61695 10.2347 8.5784 10.3429 8.56745 10.4555C8.55651 10.568 8.57351 10.6816 8.61695 10.786C9.10885 11.9551 10.0389 12.8851 11.208 13.377C11.3127 13.4224 11.4271 13.441 11.5408 13.4311C11.6546 13.4212 11.764 13.3831 11.8594 13.3203L13.1123 12.4807ZM19.9375 11C19.9378 12.543 19.5387 14.0599 18.7789 15.4029C18.0191 16.7459 16.9245 17.8693 15.6017 18.6638C14.2789 19.4582 12.773 19.8967 11.2304 19.9365C9.68791 19.9763 8.16136 19.616 6.79938 18.8908L3.8732 19.8662C3.63093 19.947 3.37095 19.9587 3.12239 19.9C2.87383 19.8414 2.64652 19.7146 2.46593 19.5341C2.28535 19.3535 2.15862 19.1262 2.09997 18.8776C2.04131 18.629 2.05303 18.3691 2.13383 18.1268L3.10922 15.2006C2.47169 14.002 2.11561 12.6739 2.068 11.3171C2.02039 9.96029 2.2825 8.61048 2.83445 7.37011C3.3864 6.12975 4.21366 5.03142 5.25346 4.15851C6.29326 3.28559 7.51825 2.66103 8.83546 2.33224C10.1527 2.00344 11.5275 1.97904 12.8555 2.2609C14.1836 2.54276 15.43 3.12347 16.5001 3.95894C17.5702 4.79442 18.4359 5.8627 19.0315 7.08271C19.6271 8.30271 19.9369 9.64237 19.9375 11ZM16.5 13.0625C16.5001 12.9348 16.4646 12.8096 16.3975 12.7009C16.3304 12.5922 16.2344 12.5043 16.1202 12.4472L13.3702 11.0722C13.2619 11.0182 13.1413 10.9938 13.0206 11.0014C12.8999 11.0089 12.7833 11.0482 12.6827 11.1152L11.4202 11.9573C10.8407 11.6388 10.3638 11.1619 10.0452 10.5823L10.8874 9.31992C10.9544 9.21923 10.9937 9.10265 11.0012 8.98194C11.0088 8.86123 10.9843 8.74067 10.9304 8.63242L9.55539 5.88242C9.4984 5.76733 9.41031 5.6705 9.3011 5.60291C9.19189 5.53531 9.06593 5.49967 8.9375 5.5C8.02582 5.5 7.15148 5.86216 6.50682 6.50682C5.86216 7.15148 5.5 8.02582 5.5 8.9375C5.50227 10.9425 6.29977 12.8647 7.71752 14.2825C9.13527 15.7002 11.0575 16.4977 13.0625 16.5C13.5139 16.5 13.9609 16.4111 14.378 16.2383C14.795 16.0656 15.174 15.8124 15.4932 15.4932C15.8124 15.174 16.0656 14.795 16.2383 14.378C16.4111 13.9609 16.5 13.5139 16.5 13.0625Z"
                                            fill="#25D366"
                                        />
                                    </svg>
                                    WhatsApp
                                </div>
                            </div>
                        </span>
                        <span className="MuiTouchRipple-root" />
                    </button>


                </div>
            </form>
        </div>
    );
};

export default PassengerForm;
