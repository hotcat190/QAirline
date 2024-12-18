import React, { useState } from "react";
const PassengerSelector = ({ onPassengerChange }) => {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ passengers, setPassengers ] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const MAX_PASSENGERS = 9; 
    const MIN_PASSENGERS = 1;
 
    const getTotalPassengers = () => {
        return passengers.adults + passengers.children + passengers.infants;
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleIncrement = (type) => {
        if (getTotalPassengers() < MAX_PASSENGERS) {
            setPassengers((prev) => {
                const updatedPassengers = { ...prev, [ type ]: prev[ type ] + 1 };
                onPassengerChange(updatedPassengers);
                return updatedPassengers;
            });
        }
    };

    const handleDecrement = (type) => {
        if (getTotalPassengers() > MIN_PASSENGERS) {
            setPassengers((prev) => {
                const updatedPassengers = {
                    ...prev,
                    [ type ]: Math.max(prev[ type ] - 1, 0),
                };
                onPassengerChange(updatedPassengers);
                return updatedPassengers;
            });
        }
    };


    const getPassengerSummary = () => {
        const { adults, children, infants } = passengers;
        let summary = `${adults} adults`;
        if (children > 0) summary += `, ${children} children`;
        if (infants > 0) summary += `, ${infants} infants`;
        return summary;
    };

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <div
                onClick={toggleDropdown}
                style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: "40px",
                }}
            >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path
                        d="M8.5 0C9.62717 0 10.7082 0.447766 11.5052 1.2448C12.3022 2.04183 12.75 3.12283 12.75 4.25C12.75 5.37717 12.3022 6.45817 11.5052 7.2552C10.7082 8.05223 9.62717 8.5 8.5 8.5C7.37283 8.5 6.29183 8.05223 5.4948 7.2552C4.69777 6.45817 4.25 5.37717 4.25 4.25C4.25 3.12283 4.69777 2.04183 5.4948 1.2448C6.29183 0.447766 7.37283 0 8.5 0ZM8.5 10.625C13.1962 10.625 17 12.5269 17 14.875V17H0V14.875C0 12.5269 3.80375 10.625 8.5 10.625Z"
                        fill="#333333"
                    ></path>
                </svg>
                <span style={{ marginLeft: "10px", fontSize: "14px" }}>
                    {getPassengerSummary()}
                </span>
                <span style={{ marginLeft: "auto" }}>▼</span>
            </div>

            {isDropdownOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        width: "100%",
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",
                        zIndex: 30,
                    }}
                >
                    <div style={{ marginBottom: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div className="adult-container" style={{ display: "flex" }}>
                                <div className="adult-image">
                                    <img src="img/adult.svg" />
                                </div>
                                <div
                                    className="people-des"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                    }}
                                >
                                    <span
                                        style={{
                                            textAlign: "left",
                                            fontSize: "12px",
                                            fontWeight: "550",
                                        }}
                                    >
                                        Adult
                                    </span>
                                    <span style={{ textAlign: "left", fontSize: "12px" }}>
                                        More than 12 years old
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="people-button"
                                    onClick={() => handleDecrement("adults")}
                                >
                                    -
                                </button>
                                <span
                                    style={{
                                        display: "inline-block",
                                        margin: "0px 10px",
                                        width: "10px",
                                    }}
                                >
                                    {passengers.adults}
                                </span>
                                <button
                                    onClick={() => handleIncrement("adults")}
                                    className="people-button"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div className="children-container" style={{ display: "flex" }}>
                                <div className="children-image">
                                    <img src="img/children.svg" />
                                </div>
                                <div
                                    className="people-des"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                    }}
                                >
                                    <span
                                        style={{
                                            textAlign: "left",
                                            fontSize: "12px",
                                            fontWeight: "550",
                                        }}
                                    >
                                        Children
                                    </span>
                                    <span style={{ textAlign: "left", fontSize: "12px" }}>
                                        2-11 years old
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDecrement("children")}
                                    className="people-button"
                                >
                                    -
                                </button>
                                <span
                                    style={{
                                        display: "inline-block",
                                        margin: "0px 10px",
                                        width: "10px",
                                    }}
                                >
                                    {passengers.children}
                                </span>
                                <button
                                    onClick={() => handleIncrement("children")}
                                    className="people-button"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div className="infant-container" style={{ display: "flex" }}>
                                <div className="infant-image">
                                    <img src="img/infant.svg" />
                                </div>
                                <div
                                    className="people-des"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                    }}
                                >
                                    <span
                                        style={{
                                            textAlign: "left",
                                            fontSize: "12px",
                                            fontWeight: "550",
                                        }}
                                    >
                                        Infant
                                    </span>
                                    <span style={{ textAlign: "left", fontSize: "12px" }}>
                                        less than 2 years old
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDecrement("infants")}
                                    className="people-button"
                                >
                                    -
                                </button>
                                <span
                                    style={{
                                        display: "inline-block",
                                        margin: "0px 10px",
                                        width: "10px",
                                    }}
                                >
                                    {passengers.infants}
                                </span>
                                <button
                                    onClick={() => handleIncrement("infants")}
                                    className="people-button"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerSelector;