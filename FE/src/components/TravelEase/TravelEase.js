import React from "react";
import "./TravelEase.css";

function TravelEase() {
    return (
        <div className="travel-ease">
            <div className="content">
            <h2>Travel with Ease</h2>
            <p className="desc">
                Benefit from 24/7 support, easy bookings, and flexible refundable
                tickets for a hassle-free travel experience.
            </p>
            <div className="features">
                <div className="feature-card">
                <img
                    src="img/calendar.png"
                    alt="Easy Booking Process Icon"
                />
                <h3>Easy Booking Process</h3>
                <p>
                    Enjoy a seamless and straightforward booking experience with our
                    user-friendly platform.
                </p>
                </div>
                <div className="feature-card">
                <img
                    src="img/customer_service.png"
                    alt="24/7 Customer Support Icon"
                />
                <h3>24/7 Customer Support</h3>
                <p>
                    Get help anytime with our dedicated support team, ready to
                    assist you with any booking needs.
                </p>
                </div>
                <div className="feature-card">
                <img
                    src="img/refund.png"
                    alt="Refundable Tickets Icon"
                />
                <h3>Refundable Tickets</h3>
                <p>
                    Book with confidence knowing that many of our tickets are
                    refundable, giving you flexibility.
                </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default TravelEase;