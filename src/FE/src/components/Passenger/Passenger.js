import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PassengerForm from '../PassengerForm/PassengerForm';
import PassengerFormChildren from '../PassengerFormChildren/PassengerFormChildren';
import './Passenger.css';

const Passenger = () => {
    const location = useLocation();
    const { booking, startDestination, endDestination, passengerSummary } = location.state || {};
    const [ adultCount, setAdultCount ] = useState(0);
    const [ childrenCount, setChildrenCount ] = useState(0);
    const [ infantCount, setInfantCount ] = useState(0);

    useEffect(() => {
        const extractPassengerCount = (summary) => {
            const adultMatch = summary.match(/(\d+)\s*adults/);
            const childrenMatch = summary.match(/(\d+)\s*children/);
            const infantMatch = summary.match(/(\d+)\s*infants/);
            if (adultMatch) {
                setAdultCount(parseInt(adultMatch[ 1 ], 10));
            }
            if (childrenMatch) {
                setChildrenCount(parseInt(childrenMatch[ 1 ], 10));
            }
            if (infantMatch) {
                setInfantCount(parseInt(infantMatch[ 1 ], 10));
            }
        };

        extractPassengerCount(passengerSummary);
    }, [ passengerSummary ]);

    const handleContinue = async () => {
        const requestBody = {
          idClassFlight: booking.idFlight,
          amount: adultCount + childrenCount + infantCount,
        };
    
        try {
          const response = await fetch("https://qairline.onrender.com/api/booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: "include",
          });
    
          if (!response.ok) {
            throw new Error("Booking failed");
          }
    
          const data = await response.json();
          console.log("Booking successful:", data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
    return (
        <div className="search-flight-container">
            <div className="content">
                <div className='all-forms' style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: "100px" }}>
                    {Array.from({ length: adultCount }).map((_, index) => (
                        <PassengerForm key={`adult-${index}`} stt={index + 1}/>
                    ))}
                    {Array.from({ length: childrenCount }).map((_, index) => (
                        <PassengerFormChildren key={`children-${index}`} stt={index + 1}/>
                    ))}
                </div>
                <div className='right-search-fs'>
                    <div className="sidebar-fs">
                        <div className="sidebar-fs-header">
                            <h3>BOOKING INFORMATION</h3>
                        </div>
                        <div className="sidebar-fs-customer">
                            <div>
                                <p>Customer information</p>
                            </div>
                        </div>
                        <div className='sidebar-fs-startTrip'>
                            <span>Start Trip</span>
                            <span>{booking.totalPrice} VND
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="jss4289">
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
                                <strong>{startDestination}</strong><img src='img/colorful_plane.svg' style={{ marginLeft: "10px", marginRight: "10px" }} /><strong>{endDestination}</strong>
                            </p>
                            <p>{booking.date} | {booking.time} | {booking.flightCode} | {booking.class}</p>
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
                        <div className="sidebar-fs-footer">
                            <strong>Total price</strong>
                            <strong>{booking.totalPrice} VND</strong>
                        </div>
                    </div>

                </div>
            </div>

            <div className='fs-continue'>
                <div className='continue-container'>
                    <div className='summary-price'>
                        <span className='special-des-price'>
                            Total price
                        </span>
                        <span className='special-price'>
                            {booking.totalPrice} VND
                        </span>
                    </div>
                    <button className='fs-btn-continue' onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default Passenger;