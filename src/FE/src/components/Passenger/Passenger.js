import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PassengerForm from "../PassengerForm/PassengerForm";
import PassengerFormChildren from "../PassengerFormChildren/PassengerFormChildren";
import "./Passenger.css";
import { TotalBill } from "../SearchFlight/SearchFlight.js";
import Notification from "../Notification/Notification.js";
import { BACKEND_BASE_URL } from "services/api";

const Passenger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    booking,
    startDestination,
    endDestination,
    passengerSummary,
    isRoundWay,
  } = location.state || {};
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const [messageNotification, setMessageNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const checkValid = () => {
    return true;
  };

  const bookTicket = async () => {
    if (!checkValid()) {
      setMessageNotification("Please fill in all fields");
      setShowNotification(true); // Hiển thị thông báo
      setTimeout(() => {
        setShowNotification(false); // Ẩn thông báo sau 3 giây
      }, 3000);

      return;
    }
    const url = `${BACKEND_BASE_URL}/booking`;

    const body1 = {
      idClassFlight: booking.forward.idClassFlight,
      amount: adultCount + childrenCount,
    };
    console.log(booking);
    const body2 = isRoundWay
      ? {
          idClassFlight: booking.backward.idClassFlight,
          amount: adultCount + childrenCount,
        }
      : null;

    try {
      const requests = [
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body1),
          credentials: "include",
        }),
      ];

      if (body2) {
        requests.push(
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body2),
            credentials: "include",
          })
        );
      }

      const responses = await Promise.all(requests);

      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) {
          // Cần xử lý failed ở đây
          throw new Error(`Request ${i + 1} failed`);
        }
      }

      const [data1, data2] = await Promise.all(
        responses.map((res) => res.json())
      );
      console.log("Response 1:", data1);
      if (isRoundWay) console.log("Response 2:", data2);
      setSuccess(true);
      setMessageNotification("Book ticket successfully!!");
      setShowNotification(true); // Hiển thị thông báo
      setTimeout(() => {
        setShowNotification(false); // Ẩn thông báo sau 3 giây
      }, 3000);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-flight-container">
      <Notification
        message={messageNotification}
        show={showNotification}
        isSuccessful={success}
      />
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
          <button
            className="fs-btn-continue fs-btn-back"
            onClick={() => window.history.go(-1)}
          >
            Back
          </button>
          <div className="summary-price">
            <span className="special-des-price">Total price</span>
            <span className="special-price">{booking.totalPrice} VND</span>
          </div>
          <button className="fs-btn-continue" onClick={bookTicket}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passenger;
