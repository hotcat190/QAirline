import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SearchFlight.css';

const SearchFlight = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flightForwardData, flightBackwardData, selectedType, startAirport, endAirport } = location.state || {};
    const [ booking, setBooking ] = useState({
        from: startAirport,
        to: endAirport,
        date: "--",
        time: "--",
        flightCode: "--",
        class: "--",
        ticketPrice: "--",
        tax: "--",
        serviceFee: "0",
        totalPrice: "0",
    });

    const handleClassCardClick = (flight, classInfo) => {
        setBooking({
            from: flight.fromAirport,
            to: flight.toAirport,
            date: new Date(flight.timeStart).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            time: `${new Date(flight.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${new Date(flight.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
            flightCode: 'VJ198',
            class: classInfo.class,
            ticketPrice: (classInfo.currentPrice).toLocaleString('vi-VN'),
            tax: (classInfo.currentPrice / 20).toLocaleString('vi-VN'),
            serviceFee: '0',
            totalPrice: (classInfo.currentPrice + classInfo.currentPrice / 20 + 0).toLocaleString('vi-VN'),
        });
    };

    const handleContinue = () => {
        navigate("/passenger", { state: { booking: booking, startAirport, endAirport } });
    }


    return (
        <div className="search-flight-container">
            <div className="content">
                <div className='left-search-fs'>
                    <div className="main-fs-content">
                        <div className="left-fs-main-content">
                            {selectedType === 'oneWay' ? (
                                <h2 className="title">One-way flight</h2>
                            ) : (
                                <h2 className="title">Round-way flight</h2>
                            )}
                            {selectedType === 'oneWay' ? (
                                <div className='route-info'>
                                    <div class="jss2412"><img src="img/departure-icon.25d3557e.svg" alt="Departure Icon" style={{ width: "12px" }} /><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>Start Destination</span><span>{startAirport}</span></p></div>
                                    <div className='fs-arrow'>
                                        <svg
                                            width="57"
                                            height="55"
                                            viewBox="0 0 57 55"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ height: '100%' }}
                                        >
                                            <path d="M8 18H41L45.8182 21H8V18Z" fill="rgb(224, 54, 54)"></path>
                                            <path d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z" fill="rgb(224, 54, 54)"></path>
                                            <path d="M48 37L15 37L10.1818 34L48 34V37Z" fill="#ddd"></path>
                                            <path d="M19.1165 34L7.5 34C17 39 16 38 23 44V37L19.1165 34Z" fill="#ddd"></path>
                                        </svg>
                                    </div>
                                    <div class="jss2412"><img src="img/arrival-icon.a05c5d78.svg" alt="Departure Icon" style={{ width: "12px" }} /><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>End Destination</span><span>{endAirport}</span></p></div>
                                </div>
                            ) : (
                                <div className='route-info'>
                                    <div class="jss2412"><img src="img/departure-icon.25d3557e.svg" alt="Departure Icon" style={{ width: "12px" }} /><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>Start Destination</span><span>{startAirport}</span></p></div>
                                    <div className='fs-arrow'>
                                        <svg
                                            width="57"
                                            height="55"
                                            viewBox="0 0 57 55"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ height: '100%' }}
                                        >
                                            <path d="M8 18H41L45.8182 21H8V18Z" fill="rgb(224, 54, 54)"></path>
                                            <path d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z" fill="rgb(224, 54, 54)"></path>
                                            <path d="M48 37L15 37L10.1818 34L48 34V37Z" fill="rgb(224, 54, 54)"></path>
                                            <path d="M19.1165 34L7.5 34C17 39 16 38 23 44V37L19.1165 34Z" fill="rgb(224, 54, 54)"></path>
                                        </svg>
                                    </div>
                                    <div class="jss2412"><img src="img/arrival-icon.a05c5d78.svg" alt="Departure Icon" style={{ width: "12px" }} /><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>End Destination</span><span>{endAirport}</span></p></div>
                                </div>
                            )}
                        </div>

                        <div className="right-fs-main-content">
                            <div className="fs-icon1" style={{
                                background: "linear-gradient(72.74deg, #459B02 -15.27%, #AAFA6B 113.22%)",
                                display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "999px"
                            }}>
                                <svg className="MuiSvgIcon-root jss276 jss277" style={{ rotate: "90deg", fill: "white" }} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path></svg>
                            </div>
                            <div className='fs-icon'>
                                <svg class="MuiSvgIcon-root jss276" style={{ fill: "#F9A51A" }} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                            </div>
                            <div className='fs-icon'>
                                <svg class="MuiSvgIcon-root jss276" style={{ fill: "#F9A51A" }} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                            </div>
                            <div className='fs-icon'>
                                <svg class="MuiSvgIcon-root jss276" style={{ fill: "#F9A51A" }} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>
                            </div>
                        </div>

                    </div>


                    <div className='flight-list-container'>
                        <div className="MuiBox-root jss8422 jss7837">
                            <div className="jss7838"></div>
                            <div className="MuiBox-root jss8423 jss7836">
                                <div
                                    className="MuiBox-root jss8427"
                                    style={{
                                        border: '1px solid rgb(106, 183, 46)',
                                        backgroundColor: 'rgb(106, 183, 46)',
                                    }}
                                >
                                    <img
                                        src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/weco-1642435135644.svg"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="MuiBox-root jss8424"
                                    style={{
                                        border: '1px solid rgb(175, 137, 3)',
                                        backgroundColor: 'rgb(175, 137, 3)',
                                    }}
                                >
                                    <img
                                        src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/businesswhite-1689220127310.svg"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="MuiBox-root jss8425"
                                    style={{
                                        border: '1px solid rgb(218, 33, 40)',
                                        backgroundColor: 'rgb(224, 54, 54)',
                                    }}
                                >
                                    <img
                                        src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/wskyboss-1642435135647.svg"
                                        alt=""
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="flight-list">
                            {flightForwardData.map((flight) => (
                                <div className="flight-card" key={flight.idFlight}>
                                    <div className="flight-info">
                                        <p className='flight-code'>VJ198</p>
                                        <div className='time'>
                                            <span className='time-text'>{new Date(flight.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                            <span className='span-special'>to</span>
                                            <span className='time-text'>{new Date(flight.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                        </div>
                                        <div className='more-flight-info'>
                                            <p className='airbus'>Airbus A321 - <span>Direct flight</span></p>

                                        </div>
                                    </div>

                                    <div className="class-info">
                                        {Object.values(flight.classes).map((classInfo, index) => (
                                            <div className={`class-card ${classInfo.seatBooked >= classInfo.seatAmount ? 'sold-out' : ''}`} key={index} onClick={() => handleClassCardClick(flight, classInfo)}>
                                                {classInfo.seatBooked >= classInfo.seatAmount ? (
                                                    <p className="status">All tickets booked!!!</p>
                                                ) : (
                                                    <div className='price-info'>
                                                        <p className="price">{(classInfo.currentPrice / 1000).toLocaleString('vi-VN')}</p>
                                                        <p className='residue'>000 VND</p>
                                                    </div>

                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

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
                                <strong>{startAirport}</strong><img src='img/colorful_plane.svg' style={{ marginLeft: "10px", marginRight: "10px" }} /><strong>{endAirport}</strong>
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

};

export default SearchFlight;
