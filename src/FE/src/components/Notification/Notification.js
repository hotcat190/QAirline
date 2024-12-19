import React from "react";
import "./Notification.css";

const Notification = ({ message, show, isSuccessful = false }) => {
  return (
    <div
      className={`notification ${show ? "show" : ""} ${
        isSuccessful ? "success" : ""
      }`}
    >
      <div className={`wrap-icon ${isSuccessful ? "success" : ""}`}>
        <span>{isSuccessful ? "✔" : "!"}</span>
      </div>

      <div className="wrap-message">
        <h2 className="title-message">
          {isSuccessful ? "Success!" : "Warning!"}
        </h2>
        <p className="content-message">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
