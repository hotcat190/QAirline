import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Notification from '../Notification/Notification';
import "./SearchFlight.css";

const EconomyTicketInfo = () => {
  return (
    <div className="ticket-info-container">
      <div className="ticket-info">
        <h3 className="ticket-info__title">Included:</h3>
        <ul className="ticket-info__list">
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Carry-on baggage: 07Kg.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Sky Care Insurance (not applicable to flights operated by Thai
            QAirline).
          </li>
        </ul>

        <h3 className="ticket-info__title">Not included:</h3>
        <ul className="ticket-info__list">
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            Checked baggage (optional).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            Meal
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            3-in-1 convenience kit.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            Seat selection in advance.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            Flight, date, or itinerary changes.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--cross">
              ❌
            </span>
            Fare difference upon changes (if any).
          </li>
        </ul>

        <a href="#" className="ticket-info__link">
          View ticket fare rules
        </a>

        <div className="ticket-info__status">
          <span className="ticket-info__icon ticket-info__icon--check">✔️</span>
          Selected
        </div>
      </div>
    </div>
  );
};

const BusinessTicketInfo = () => {
  return (
    <div className="ticket-info-container ticket-info-container--business">
      <div className="ticket-info">
        <h3 className="ticket-info__title">Included:</h3>
        <ul className="ticket-info__list">
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Carry-on baggage: 10kg.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Checked baggage: 30kg and 01 golf equipment set (if applicable).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Access to luxury lounges (not applicable on domestic flights in
            Thailand or airports with lounges that do not meet the required
            standards or are closed during flight operation hours).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority check-in.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority baggage handling.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority access through security checks (subject to conditions at
            each airport).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Private shuttle service to the aircraft (applicable for remote
            parking; not applicable at airports that do not provide private
            shuttle services).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority seat selection on the aircraft (not applicable to Business
            class seats).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Enjoy fresh and delicious cuisine throughout the flight.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Convenience kit (for flights lasting 04 hours or longer).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Refundable or transferable ticket credit valid for up to 02 (two)
            years from the scheduled departure date.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Sky Care Insurance (not applicable to flights operated by Thai
            QAirline).
          </li>
        </ul>

        <a href="#" className="ticket-info__link">
          View ticket fare rules
        </a>

        <div className="ticket-info__status">
          <span className="ticket-info__icon ticket-info__icon--check">✔️</span>
          Selected
        </div>
      </div>
    </div>
  );
};

const FirstClassTicketInfo = () => {
  return (
    <div className="ticket-info-container ticket-info-container--business ticket-info-container-firstclass">
      <div className="ticket-info">
        <h3 className="ticket-info__title">Included:</h3>
        <ul className="ticket-info__list">
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Carry-on baggage: 18kg.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Checked baggage: 40kg and 01 golf equipment set (if applicable).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Access to luxury lounges (not applicable on domestic flights in
            Thailand or airports with lounges that do not meet the required
            standards or are closed during flight operation hours).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority check-in.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority baggage handling.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority access through security checks (subject to conditions at
            each airport).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Private shuttle service to the aircraft (applicable for remote
            parking; not applicable at airports that do not provide private
            shuttle services).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Priority seat selection on the aircraft.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Enjoy fresh and delicious cuisine throughout the flight.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Convenience kit (for flights lasting 04 hours or longer).
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Refundable or transferable ticket credit valid for up to 02 years
            from the scheduled departure date.
          </li>
          <li className="ticket-info__item">
            <span className="ticket-info__icon ticket-info__icon--check">
              ✔️
            </span>
            Sky Care Insurance (not applicable to flights operated by Thai
            QAirline).
          </li>
        </ul>
        <a href="#" className="ticket-info__link">
          View ticker fare rules
        </a>
        <div className="ticket-info__status">
          <span className="ticket-info__icon ticket-info__icon--check">✔️</span>
          Selected
        </div>
      </div>
    </div>
  );
};

const BillFlight = ({
  booking,
  startDestination,
  endDestination,
  isBackward = false,
}) => {
  return (
    <div>
      <div
        className="sidebar-fs-startTrip"
        style={isBackward ? { backgroundColor: "#FFFBB3" } : {}}
      >
        <span>{isBackward ? "Return Flight" : "Departure Flight"}</span>
        <span>
          {booking.totalPrice} VND
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            className="jss4289"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1249 2.625L10.4999 0L8.49878 2.002L11.1238 4.627L13.1249 2.625ZM0 13.1144V10.4894L7.26162 3.23828L9.88663 5.86328L2.625 13.1144H0ZM14 15.7394H0V17.4894H14V15.7394Z"
              fill="#EC2029"
            />
          </svg>
        </span>
      </div>
      <div className="sidebar-fs-details">
        <p>
          <strong>{startDestination}</strong>
          <img
            src="img/colorful_plane.svg"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          />
          <strong>{endDestination}</strong>
        </p>
        <p>
          {booking.date} | {booking.time} | {booking.flightCode} |{" "}
          {booking.class}
        </p>
      </div>
      <div className="sidebar-fs-breakdown">
        <div>
          <span>Price</span>
          <span>{booking.ticketPrice} VND</span>
        </div>
        <div>
          <span>Tax, fare</span>
          <span>{booking.tax} VND</span>
        </div>
        <div>
          <span>Services</span>
          <span>{booking.serviceFee} VND</span>
        </div>
      </div>
    </div>
  );
};

export const TotalBill = ({
  booking,
  startDestination,
  endDestination,
  isRoundWay,
}) => {
  return (
    <div className="right-search-fs">
      <div className="sidebar-fs">
        <div className="sidebar-fs-header">
          <h3>BOOKING INFORMATION</h3>
        </div>
        <div className="sidebar-fs-customer">
          <div>
            <p>Customer information</p>
          </div>
        </div>
        <BillFlight
          booking={booking.forward}
          startDestination={startDestination}
          endDestination={endDestination}
        />
        {isRoundWay ? (
          <BillFlight
            booking={booking.backward}
            startDestination={endDestination}
            endDestination={startDestination}
            isBackward={true}
          />
        ) : null}
        <div className="sidebar-fs-footer">
          <strong>Total price</strong>
          <strong>{booking.totalPrice} VND</strong>
        </div>
      </div>
    </div>
  );
};

const SearchFlight = () => {
  const [ showNotification, setShowNotification ] = useState(false);
  const [ showTicketSelection, setShowTicketSelection ] = useState(false);
  const [ showBusinessInfo, setShowBusinessInfo ] = useState(false);
  const [ showEconomyInfo, setShowEconomyInfo ] = useState(false);
  const [ showFirstClassInfo, setShowFirstClassInfo ] = useState(false);
  const handleClickBusiness = () => {
    setShowBusinessInfo((prevState) => !prevState);
    setShowEconomyInfo(false);
    setShowFirstClassInfo(false);
  };
  const handleClickEconomy = () => {
    setShowEconomyInfo((prevState) => !prevState);
    setShowBusinessInfo(false);
    setShowFirstClassInfo(false);
  };
  const handleClickFirstClass = () => {
    setShowFirstClassInfo((prevState) => !prevState);
    setShowBusinessInfo(false);
    setShowEconomyInfo(false);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const {
    flightForwardData,
    flightBackwardData,
    startDestination,
    endDestination,
    selectedType,
    passengerSummary,
  } = location.state || {};
  const roundWay = flightBackwardData != undefined;
  const initialBooking = {
    totalPrice: "0",
    forward: {
      from: startDestination,
      to: endDestination,
      date: "--",
      time: "--",
      flightCode: "--",
      class: "--",
      ticketPrice: "--",
      tax: "--",
      serviceFee: "0",
      totalPrice: "0",
    },
  };

  if (roundWay) {
    initialBooking.backward = {
      from: endDestination,
      to: startDestination,
      date: "--",
      time: "--",
      flightCode: "--",
      class: "--",
      ticketPrice: "--",
      tax: "--",
      serviceFee: "0",
      totalPrice: "0",
    };
  }

  const [ booking, setBooking ] = useState(initialBooking);
  const [ isBackward, setIsBackward ] = useState(false);

  const [ adultCount, setAdultCount ] = useState(0);
  const [ childrenCount, setChildrenCount ] = useState(0);
  const [ infantsCount, setInfantsCount ] = useState(0);

  useEffect(() => {
    const extractPassengerCount = (summary) => {
      const adultMatch = summary.match(/(\d+)\s*adults/);
      const childrenMatch = summary.match(/(\d+)\s*children/);
      const infantsMatch = summary.match(/(\d+)\s*infants/);
      if (adultMatch) {
        setAdultCount(parseInt(adultMatch[ 1 ], 10));
      }
      if (childrenMatch) {
        setChildrenCount(parseInt(childrenMatch[ 1 ], 10));
      }
      if (infantsMatch) {
        setInfantsCount(parseInt(infantsMatch[ 1 ], 10));
      }
    };

    extractPassengerCount(passengerSummary);
  }, [ passengerSummary ]);

  const handleClassCardClick = (flight, classInfo) => {
    const type = roundWay && isBackward ? "backward" : "forward";
    if (adultCount + childrenCount + infantsCount <= (classInfo.seatAmount - classInfo.seatBooked)) {
      setBooking((prevBooking) => {
        const updatedType = {
          from: flight.fromAirport,
          to: flight.toAirport,
          date: new Date(flight.timeStart).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          time: `${new Date(flight.timeStart).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })} - ${new Date(flight.timeEnd).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}`,
          flightCode: "VJ198",
          class: classInfo.class,
          ticketPrice: classInfo.currentPrice.toLocaleString("vi-VN"),
          tax: (classInfo.currentPrice / 20).toLocaleString("vi-VN"),
          serviceFee: "0",
          totalPrice: (
            (classInfo.currentPrice + classInfo.currentPrice / 20 + 0) *
            adultCount +
            classInfo.currentPrice * 0.75 * childrenCount +
            classInfo.currentPrice * 0.5 * infantsCount
          ).toLocaleString("vi-VN"),
        };

        const forwardPrice =
          type === "forward"
            ? updatedType.totalPrice
            : prevBooking.forward?.totalPrice || "0";
        const backwardPrice =
          type === "backward"
            ? updatedType.totalPrice
            : prevBooking.backward?.totalPrice || "0";

        const totalPrice =
          parseInt(forwardPrice.replace(/\./g, "")) +
          parseInt(backwardPrice.replace(/\./g, ""));

        return {
          ...prevBooking,
          [ type ]: updatedType,
          totalPrice: totalPrice.toLocaleString("vi-VN"),
        };
      });
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const handleContinue = () => {
    if (roundWay && !isBackward) {
      setIsBackward(true);
      window.scrollTo(0, 0);
      window.history.pushState({}, "", window.location.href);
    } else
      navigate("/passenger", {
        state: {
          booking: booking,
          startDestination,
          endDestination,
          passengerSummary,
          isRoundWay: roundWay,
        },
      });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isBackward) {
        setIsBackward(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [ isBackward ]);

  return (
    <div className="search-flight-container">
      <Notification
        message="Not enough seats available"
        show={showNotification}
      />
      <Notification
        message="Please select a ticket class"
        show={showTicketSelection}
      />
      <div className="content">
        <div className="left-search-fs">
          <div className="main-fs-content">
            <div className="left-fs-main-content">
              {selectedType === "oneWay" ? (
                <h2 className="title">
                  One-way flight <span>| {passengerSummary}</span>
                </h2>
              ) : (
                <h2 className="title">
                  Round-way flight <span>| {passengerSummary}</span>
                </h2>
              )}
              {selectedType === "oneWay" ? (
                <div className="route-info">
                  <div class="jss2412">
                    <img
                      src="img/departure-icon.25d3557e.svg"
                      alt="Departure Icon"
                      style={{ width: "12px" }}
                    />
                    <p
                      class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary"
                      variantmd="h3"
                    >
                      <span className="airport"></span>
                      <span>{startDestination}</span>
                    </p>
                  </div>
                  <div className="fs-arrow">
                    <svg
                      width="57"
                      height="55"
                      viewBox="0 0 57 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "100%" }}
                    >
                      <path
                        d="M8 18H41L45.8182 21H8V18Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                      <path
                        d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                      <path
                        d="M48 37L15 37L10.1818 34L48 34V37Z"
                        fill="#ddd"
                      ></path>
                      <path
                        d="M19.1165 34L7.5 34C17 39 16 38 23 44V37L19.1165 34Z"
                        fill="#ddd"
                      ></path>
                    </svg>
                  </div>
                  <div class="jss2412">
                    <img
                      src="img/arrival-icon.a05c5d78.svg"
                      alt="Departure Icon"
                      style={{ width: "12px" }}
                    />
                    <p
                      class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary"
                      variantmd="h3"
                    >
                      <span className="airport"></span>
                      <span>{endDestination}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="route-info">
                  <div class="jss2412">
                    <img
                      src="img/departure-icon.25d3557e.svg"
                      alt="Departure Icon"
                      style={{ width: "12px" }}
                    />
                    <p
                      class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary"
                      variantmd="h3"
                    >
                      <span className="airport">Start Destination</span>
                      <span>{startDestination}</span>
                    </p>
                  </div>
                  <div className="fs-arrow">
                    <svg
                      width="57"
                      height="55"
                      viewBox="0 0 57 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "100%" }}
                    >
                      <path
                        d="M8 18H41L45.8182 21H8V18Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                      <path
                        d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                      <path
                        d="M48 37L15 37L10.1818 34L48 34V37Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                      <path
                        d="M19.1165 34L7.5 34C17 39 16 38 23 44V37L19.1165 34Z"
                        fill="rgb(224, 54, 54)"
                      ></path>
                    </svg>
                  </div>
                  <div class="jss2412">
                    <img
                      src="img/arrival-icon.a05c5d78.svg"
                      alt="Departure Icon"
                      style={{ width: "12px" }}
                    />
                    <p
                      class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary"
                      variantmd="h3"
                    >
                      <span className="airport">End Destination</span>
                      <span>{endDestination}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="right-fs-main-content">
              <div
                className="fs-icon1"
                style={{
                  background:
                    "linear-gradient(72.74deg, #459B02 -15.27%, #AAFA6B 113.22%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                }}
              >
                <svg
                  className="MuiSvgIcon-root jss276 jss277"
                  style={{ rotate: "90deg", fill: "white" }}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>
                </svg>
              </div>
              <div className="fs-icon">
                <svg
                  class="MuiSvgIcon-root jss276"
                  style={{ fill: "#F9A51A" }}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <div className="fs-icon">
                <svg
                  class="MuiSvgIcon-root jss276"
                  style={{ fill: "#F9A51A" }}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flight-list-container">
            <div className="MuiBox-root jss8422 jss7837">
              <div className="jss7838"></div>
              <div className="MuiBox-root jss8423 jss7836">
                <div
                  className="MuiBox-root jss8427"
                  style={{
                    border: "1px solid rgb(106, 183, 46)",
                    backgroundColor: "rgb(106, 183, 46)",
                  }}
                  onClick={handleClickEconomy}
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/weco-1642435135644.svg"
                    alt=""
                  />
                </div>
                <div
                  className="MuiBox-root jss8424"
                  style={{
                    border: "1px solid rgb(175, 137, 3)",
                    backgroundColor: "rgb(175, 137, 3)",
                  }}
                  onClick={handleClickBusiness}
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/businesswhite-1689220127310.svg"
                    alt=""
                  />
                </div>
                <div
                  className="MuiBox-root jss8425"
                  style={{
                    border: "1px solid rgb(218, 33, 40)",
                    backgroundColor: "rgb(224, 54, 54)",
                  }}
                  onClick={handleClickFirstClass}
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/wskyboss-1642435135647.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flight-list">
              <div className="show-ticket">
                {showEconomyInfo && <EconomyTicketInfo />}
                {showBusinessInfo && <BusinessTicketInfo />}
                {showFirstClassInfo && <FirstClassTicketInfo />}
              </div>
              {(isBackward ? flightBackwardData : flightForwardData).map(
                (flight) => (
                  <div className="flight-card" key={flight.idFlight}>
                    <div className="flight-info">
                      <p className="flight-code">VJ198</p>
                      <div className="time">
                        <span className="time-text">
                          {new Date(flight.timeStart).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                        <span className="span-special">to</span>
                        <span className="time-text">
                          {new Date(flight.timeEnd).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                      </div>
                      <div className="more-flight-info">
                        <p className="airbus">
                          Airbus A321 - <span>Direct flight</span>
                        </p>
                      </div>
                    </div>

                    <div className="class-info">
                      {Object.values(flight.classes).map((classInfo, index) => (
                        <div
                          className={`class-card ${classInfo.seatBooked >= classInfo.seatAmount
                            ? "sold-out"
                            : ""
                            }`}
                          key={index}
                          onClick={() =>
                            handleClassCardClick(flight, classInfo)
                          }
                        >
                          {classInfo.seatBooked >= classInfo.seatAmount ? (
                            <div class="jss1987"><img src="https://www.vietjetair.com/static/media/noflight.cee84207.svg" alt="" /><p class="MuiTypography-root jss1101 jss1109 MuiTypography-h5 MuiTypography-colorTextPrimary" customcolor="grey" weight="Bold">All Tickets Booked</p></div>
                          ) : (
                            <div className="price-info">
                              <p className="price">{(classInfo.currentPrice / 1000).toLocaleString('vi-VN')}</p>
                              <p className='residue'>000 VND</p>
                              <p className='tickets-stat' style={{ fontSize: "11px", color: "green", marginTop: "7px" }}>{classInfo.seatBooked}/{classInfo.seatAmount} Booked</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <TotalBill
          booking={booking}
          startDestination={startDestination}
          endDestination={endDestination}
          isRoundWay={roundWay}
        />
      </div>

      <div className="fs-continue">
        <div className="continue-container">
          <div className="summary-price">
            <span className="special-des-price">Total price</span>
            <span className="special-price">{booking.totalPrice} VND</span>
          </div>
          <button className="fs-btn-continue" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
