import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MainContent.css";
import AirportSearch from "./AirportSearch.js";

function MainContent() {
  const airport2Id = {
    "Tan Son Nhat": 1,
    "Noi Bai": 2,
  };
  const [formData, setFormData] = useState({
    startAirport: "",
    endAirport: "",
    startDate: "",
    endDate: "",
  });
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
    if (type === "begin") {
      setIdBeginAirport(id);
    }
    else {
      setIdEndAirport(id);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFlightTypeChange = (type) => {
    setSelectedType(type);
    const returnDate = document.querySelector(".detail-return");
    if (type === "oneWay") {
      returnDate.classList.add("hidden-return");
    }

    if (type === "roundTrip") {
      returnDate.classList.remove("hidden-return");
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
      if (!startAirport || !endAirport || !startDate) {
        alert("Please fill in all fields");
      } else {
        const startDay = parseInt(startDate.split("-")[2], 10);
        const startMonth = parseInt(startDate.split("-")[1], 10);
        const startYear = parseInt(startDate.split("-")[0], 10);
        const idBeginAirport = airport2Id[startAirport];
        const idEndAirport = airport2Id[endAirport];
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
                  type="radio"
                  name="flightType"
                  value="roundTrip"
                  checked={selectedType === "roundTrip"}
                  onChange={() => handleFlightTypeChange("roundTrip")}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    width: "17px",
                    height: "17px",
                    cursor: "pointer",
                  }}
                />
                Round Way
              </label>

              <label
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
                  name="flightType"
                  value="oneWay"
                  checked={selectedType === "oneWay"}
                  onChange={() => handleFlightTypeChange("oneWay")}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    width: "17px",
                    height: "17px",
                    cursor: "pointer",
                  }}
                />
                One Way
              </label>
            </div>
            <div className="booking-container">
              <div className="flight-details">
                <div className="flight-details-from">
                  <div className="detail">
                    <div className="from">
                      <img src="img/airplane-takeoff-16.png" />
                      <label htmlFor="from">From</label>
                    </div>
                    <div className="location">
                      {/* <input
                        type="text"
                        id="from"
                        name="startAirport"
                        placeholder="Start Airport"
                        onChange={handleChange}
                      /> */}
                      <AirportSearch airports={airports} type="begin" onSelectAirport={handleSelectAirport}></AirportSearch>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="depart">
                      <span className="icon">📅</span>
                      <label htmlFor="depart">Depart</label>
                    </div>
                    <div className="date">
                      <input
                        type="date"
                        id="depart"
                        name="startDate"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flight-details-to">
                  <div className="detail">
                    <div className="to">
                      <img src="img/airplane-landing-16.png" />
                      <label htmlFor="to">To</label>
                    </div>
                    <div className="location">
                      {/* <input
                        type="text"
                        id="to"
                        name="endAirport"
                        placeholder="End Airport"
                        onChange={handleChange}
                      /> */}
                      <AirportSearch airports={airports} type="end" onSelectAirport={handleSelectAirport}></AirportSearch>
                    </div>
                  </div>

                  <div className="detail detail-return">
                    <div className="return">
                      <span className="icon">📅</span>
                      <label htmlFor="return">Return</label>
                    </div>
                    <div className="date">
                      <input
                        type="date"
                        id="return"
                        name="endDate"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

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
