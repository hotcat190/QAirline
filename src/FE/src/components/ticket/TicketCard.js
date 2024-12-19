import React, { useEffect, useState } from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket, onSelectTicket, selectedTicket }) => {
  const [isSelected, setSelected] = useState(false);

  const formatDateAndTime = (isoDate) => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString("en-GB");

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };

  const calculateTimeDifference = (startIsoDate, endIsoDate) => {
    const startDate = new Date(startIsoDate);
    const endDate = new Date(endIsoDate);

    const diffInMilliseconds = Math.abs(endDate - startDate) - 30 * 60 * 1000;

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${minutes}m`;
  };

  const start = formatDateAndTime(ticket.timeStart);
  const end = formatDateAndTime(ticket.timeEnd);
  const time = calculateTimeDifference(ticket.timeStart, ticket.timeEnd);

  const handleClick = () => {
    if (onSelectTicket) {
      onSelectTicket(ticket);
      setSelected(!isSelected);
    }
  };

  const handleViewDetails = () => {
    console.log("View details clicked");
    // Logic xem chi tiết vé
  };

  const handleDeleteTicket = () => {
    console.log("Delete ticket clicked");
    // Logic xóa vé
  };

  useEffect(() => {
    if (isSelected && selectedTicket.idTicket != ticket.idTicket)
      setSelected(false);
  }, [selectedTicket]);

  return (
    <div
      className={`ticket-card ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className="airport-code">
        <div>{ticket.beginAirport.code}</div>
        <div className="right">{ticket.endAirport.code}</div>
      </div>

      <div className="city-name">
        <div>{ticket.beginAirport.city}</div>
        <div className="right">{ticket.endAirport.city}</div>
      </div>
      <div className="airport-info">
        <div>{ticket.beginAirport.name}</div>
        <div className="right">{ticket.endAirport.name}</div>
      </div>
      <div className="dot-container">
        <div className="dot start-dot"></div>
        <div className="dot end-dot"></div>
        <img className="plane-icon" src="img/plane.png" alt="plane" />
        <div className="dot start-overlay"></div>
        <div className="dot end-overlay"></div>
        <div className="line"></div>
      </div>
      <div className="flight-time">
        <div>Depart</div>
        <div>{time}</div>
        <div>Arrive</div>
      </div>

      <div className="date">
        <div>{start.formattedDate}</div>
        <div className="right">{end.formattedDate}</div>
      </div>

      <div className="time">
        <div>{start.formattedTime}</div>
        <div className="right">{end.formattedTime}</div>
      </div>

      <div className="line-solid"></div>

      <div className="total-price">
        <div>{ticket.class}</div>
        <div className={`${ticket.status.toLowerCase()}`}>{ticket.status}</div>
        <div className="right">{ticket.price.toLocaleString("vi-VN")} VND</div>
      </div>
      {isSelected && (
        <div className="action-box">
          <button className="btn view-details" onClick={handleViewDetails}>
            View Details
          </button>
          <button className="btn delete-ticket" onClick={handleDeleteTicket}>
            Delete Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
