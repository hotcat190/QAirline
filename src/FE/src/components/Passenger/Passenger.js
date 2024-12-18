import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PassengerForm from "../PassengerForm/PassengerForm";
import { TotalBill } from "../SearchFlight/SearchFlight.js";
import PassengerFormChildren from "../PassengerFormChildren/PassengerFormChildren";
import "./Passenger.css";

const Passenger = () => {
  const location = useLocation();
  const {
    booking,
    startDestination,
    endDestination,
    passengerSummary,
    isRoundWay,
  } = location.state || {};
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    const extractPassengerCount = (summary) => {
      const adultMatch = summary.match(/(\d+)\s*adults/);
      const childrenMatch = summary.match(/(\d+)\s*children/);

      if (adultMatch) {
        setAdultCount(parseInt(adultMatch[1], 10));
      }
      if (childrenMatch) {
        setChildrenCount(parseInt(childrenMatch[1], 10));
      }
    };

    extractPassengerCount(passengerSummary);
  }, [passengerSummary]);
  return (
    <div className="search-flight-container">
      <div className="content">
        <div
          className="all-forms"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "100px",
          }}
        >
          {Array.from({ length: adultCount }).map((_, index) => (
            <PassengerForm key={`adult-${index}`} stt={index + 1} />
          ))}
          {Array.from({ length: childrenCount }).map((_, index) => (
            <PassengerFormChildren key={`children-${index}`} stt={index + 1} />
          ))}
        </div>
        <TotalBill
          booking={booking}
          startDestination={startDestination}
          endDestination={endDestination}
          isRoundWay={isRoundWay}
        />
      </div>

      <div className="fs-continue">
        <div className="continue-container">
          <div className="summary-price">
            <span className="special-des-price">Total price</span>
            <span className="special-price">{booking.totalPrice} VND</span>
          </div>
          <button className="fs-btn-continue">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Passenger;
