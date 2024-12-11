import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MainContent.css";
import AirportSearch from "./AirportSearch.js";
import DatePicker from "./DatePicker";

const PassengerSelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const MAX_PASSENGERS = 9; // Giới hạn tổng số hành khách
  const MIN_PASSENGERS = 1; // Giới hạn tối thiểu (>= 1)

  // Tính tổng số hành khách
  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  // Hàm toggle hiển thị dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Hàm xử lý tăng số lượng hành khách
  const handleIncrement = (type) => {
    if (getTotalPassengers() < MAX_PASSENGERS) {
      setPassengers((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    }
  };

  const handleDecrement = (type) => {
    if (getTotalPassengers() > MIN_PASSENGERS) {
      setPassengers((prev) => ({
        ...prev,
        [type]: Math.max(prev[type] - 1, 0),
      }));
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

function MainContent() {
  const airport2Id = {
    "Tan Son Nhat": 1,
    "Noi Bai": 2,
  };

  const startAirportInputRef = useRef(null);
  const endAirportInputRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [flightForwardData, setFlightForwardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("roundTrip");
  const [airports, setAirports] = useState([]);
  const [query, setQuery] = useState("");

  const [idBeginAirport, setIdBeginAirport] = useState(null);
  const [idEndAirport, setIdEndAirport] = useState(null);

  const beginAirportRef = useRef();
  const endAirportRef = useRef();
  const [formData, setFormData] = useState({
    startAirport: "",
    endAirport: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  // load all airport
  useEffect(() => {
    const fetchAirport = async () => {
      try {
        const res = await fetch("https://qairline.onrender.com/api/airport/", {
          method: "GET",
        });
        if (res.ok) {
          const result = await res.json();
          setAirports(result);
        } else {
          throw new Error("Failed to fetch airport data!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAirport();
  }, []);
  // console.log(airports);

  const handleSelectAirport = (type, id) => {
    if (type === "Start") {
      setIdBeginAirport(id);
    } else {
      setIdEndAirport(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFlightTypeChange = (type) => {
    setSelectedType(type);
    const returnDate = document.querySelector('.input-enddate');
    const endDes = document.querySelector('.input-enddes');
    if (type === "oneWay") {
      returnDate.classList.add("hidden-return");
      endDes.classList.add("hidden-end");
    }

    if (type === "roundTrip") {
      returnDate.classList.remove("hidden-return");
      endDes.classList.remove("hidden-end");
    }
  };

  const handleSubmit = async () => {
    const { startAirport, endAirport, startDate, endDate } = formData;

    if (selectedType === "roundTrip") {
      if (!idBeginAirport || !idEndAirport || !startDate || !endDate) {
        alert("Please fill in all fields");
      } else {
        const startDay = parseInt(startDate.split("-")[2], 10);
        const startMonth = parseInt(startDate.split("-")[1], 10);
        const startYear = parseInt(startDate.split("-")[0], 10);
        const endDay = parseInt(endDate.split("-")[2], 10);
        const endMonth = parseInt(endDate.split("-")[1], 10);
        const endYear = parseInt(endDate.split("-")[0], 10);
        // const idBeginAirport = airport2Id[startAirport];
        // const idEndAirport = airport2Id[endAirport];
        // setLoading(true);
        // setError(null);

        const url_forward = `https://qairline.onrender.com/api/flight/searchFlight?day=${startDay}&month=${startMonth}&year=${startYear}&idBeginAirport=${idBeginAirport}&idEndAirport=${idEndAirport}`;
        const url_backward = `https://qairline.onrender.com/api/searchFlight?day=${endDay}&month=${endMonth}&year=${endYear}&idBeginAirport=${idEndAirport}&idEndAirport=${idBeginAirport}`;

        try {
          const response_forward = await fetch(url_forward, { method: "GET" });

          if (response_forward.ok) {
            const data_forward = await response_forward.json();
            setFlightForwardData(data_forward);

            navigate("/searchflights", {
              state: { flightForwardData: data_forward, selectedType },
            });
          } else {
            setError("No flights found or an error occurred.");
          }
        } catch (err) {
          setError("An error occurred: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (!idBeginAirport || !endAirport || !startDate) {
        alert("Please fill in all fields");
      } else {
        const startDay = parseInt(startDate.split("-")[2], 10);
        const startMonth = parseInt(startDate.split("-")[1], 10);
        const startYear = parseInt(startDate.split("-")[0], 10);
        // const idBeginAirport = airport2Id[startAirport];
        // const idEndAirport = airport2Id[endAirport];
        // setLoading(true);
        // setError(null);

        const url = `http://localhost:8000/api/flight/searchFlight?day=${startDay}&month=${startMonth}&year=${startYear}&idBeginAirport=${idBeginAirport}&idEndAirport=${idEndAirport}`;

        try {
          const response = await fetch(url, { method: "GET" });

          if (response.ok) {
            const data = await response.json();
            setFlightForwardData(data);

            navigate("/searchflights", {
              state: { flightForwardData: data, selectedType },
            });
          } else {
            setError("No flights found or an error occurred.");
          }
        } catch (err) {
          setError("An error occurred: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="main-content">
      <div className="content">
        <div className="main-leftcontent">
          <img
            src="img/destination.svg"
            alt=""
            width="60px"
            className="destination"
          />
          <button className="ranking btn">
            World No.1 Flight Booking Platform
          </button>
          <h1 className="animate__animated animate__bounce">
            DISCOVER <span className="red-text">PREMIUM</span>
            <br />
            <span className="red-text">FLIGHTS</span> WITH EASE!
          </h1>
          <p className="des">
            Find top destination and look effortlessly with out seamless flight
            search and booking experience
          </p>

          <div className="main-booking">
            <div className="flight-options">
              <label
                className="radio-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                <input
                  className="custom-radio"
                  type="radio"
                  name="flightType"
                  value="roundTrip"
                  checked={selectedType === "roundTrip"}
                  onChange={() => handleFlightTypeChange("roundTrip")}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                />
                Round Way
              </label>

              <label
                className="radio-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                <input
                  type="radio"
                  className="custom-radio"
                  name="flightType"
                  value="oneWay"
                  checked={selectedType === "oneWay"}
                  onChange={() => handleFlightTypeChange("oneWay")}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                />
                One Way
              </label>
            </div>
            <div className="booking-container">
              <div className="flight-details">
                <div className="flight-search-bar">
                  <div className="input-group">
                    <span className="icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6 19.5456L8 19.5456L13 11.4172L18.5 11.4172C18.8978 11.4172 19.2794 11.2566 19.5607 10.9708C19.842 10.685 20 10.2974 20 9.89314C20 9.48894 19.842 9.10128 19.5607 8.81546C19.2794 8.52965 18.8978 8.36908 18.5 8.36908L13 8.36908L8 0.240722L6 0.240722L8.5 8.36908L3 8.36908L1.5 6.33699L-2.62268e-07 6.33699L1 9.89314L-5.68248e-07 13.4493L1.5 13.4493L3 11.4172L8.5 11.4172L6 19.5456Z"
                          fill="#333333"
                        />
                      </svg>
                    </span>
                    <AirportSearch
                      airports={airports}
                      type="Start"
                      idOther={idEndAirport}
                      onSelectAirport={handleSelectAirport}
                      nextInputRef={startDatePickerRef}
                      inputRef={startAirportInputRef}    
                    />
                  </div>

                  <DatePicker type="Departure Date" ref={startDatePickerRef} nextInputRef={endAirportInputRef} isEnd={false}  />
                </div>

                <div className="flight-search-bar input-enddes">
                  <div className="input-group">
                    <span className="icon">
                      <svg
                        width="13"
                        height="19"
                        viewBox="0 0 13 19"
                        fill="none"
                      >
                        <path
                          d="M10.6161 1.85455C9.44983 0.6671 7.86807 0 6.21875 0C4.56944 0 2.98767 0.6671 1.82143 1.85455C0.655188 3.04199 0 4.65252 0 6.33182C0 11.0807 6.21875 18.0909 6.21875 18.0909C6.21875 18.0909 12.4375 11.0807 12.4375 6.33182C12.4375 4.65252 11.7823 3.04199 10.6161 1.85455Z"
                          fill="#333333"
                        ></path>
                        <circle
                          cx="6.21879"
                          cy="6.21879"
                          r="2.8267"
                          fill="white"
                        ></circle>
                      </svg>
                    </span>
                    <AirportSearch
                      airports={airports}
                      type="End"
                      idOther={idBeginAirport}
                      onSelectAirport={handleSelectAirport}
                      nextInputRef={endDatePickerRef}
                      inputRef={endAirportInputRef}
                    />
                  </div>

                  <DatePicker type="Return Date" ref={endDatePickerRef} nextInputRef={null} isEnd={true}/>
                </div>

                <PassengerSelector />
                <div className="bottom">
                  <button className="search-flights" onClick={handleSubmit}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-rightcontent">
          <img src="img/plane.svg" alt="" className="plane" width="110px" />
          <img src="img/cloud.svg" alt="" width="100px" className="cloud" />
          <img
            className="person"
            src="img/main_image.jpeg"
            alt=""
            width="425px"
          />
          <div className="rating-container">
            <div className="avatars">
              <div className="avatar">
                <img src="img/avatar-2.jpg" alt="Avatar 1" />
              </div>
              <div className="avatar">
                <img src="img/avatar-7.jpeg" alt="Avatar 2" />
              </div>
              <div className="avatar">
                <img src="img/avatar-12.jpg" alt="Avatar 3" />
              </div>
              <div className="avatar">
                <img src="img/avatar-13.jfif" alt="Avatar 4" />
              </div>
            </div>
            <div className="rating-text">
              4.9
              <span className="star">★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
