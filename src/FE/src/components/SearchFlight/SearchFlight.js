import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './SearchFlight.css';

const SearchFlight = () => {
    const location = useLocation();
    const { flightData, selectedType } = location.state || {}; // Lấy dữ liệu từ state trong URL
    flightData.push(flightData[0]);
    flightData.push(flightData[0]);
    const startDestination = flightData[ 0 ].beginAirport.name.replace("International Airport", "")
    const endDestination = flightData[ 0 ].endAirport.name.replace("International Airport", "");
    const [ selectedClass, setSelectedClass ] = useState(null);

    const handleSelectFlight = (flight, flightClass) => {
        setSelectedFlight(flight);
        setSelectedClass(flightClass);
    };

    const booking = {
        from: startDestination,
        to: endDestination,
        date: "T5, 28/11/2024",
        time: "05:20 - 07:30",
        flightCode: "VJ198",
        class: "Skyboss",
        ticketPrice: "3,229,200",
        tax: "583,400",
        serviceFee: "0",
        totalPrice: "3,812,600",
    };

    return (
        <div className="search-flight-container">
            <div className="content">
                <div className='right-search-fs'>
                    <div className="main-fs-content">
                        <div className="left-fs-main-content">
                            {selectedType === 'oneWay' ? (
                                <h2 className="title">One-way flight</h2>
                            ) : (
                                <h2 className="title">Round-way flight</h2>
                            )}
                            <div className='route-info'>
                                <div class="jss2412"><img src="img/departure-icon.25d3557e.svg" alt="Departure Icon" style={{width: "12px"}}/><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>Start Airport</span><span>{startDestination}</span></p></div>
                                <div class="jss2412"><img src="img/arrival-icon.a05c5d78.svg" alt="Departure Icon" style={{width: "12px"}} /><p class="MuiTypography-root jss2413 jss168 jss2431 MuiTypography-h5 MuiTypography-colorTextPrimary" variantmd="h3"><span className='airport'>End Airport</span><span>{endDestination}</span></p></div>
                            </div>

                        </div>

                        <div className="right-fs-main-content">
                            <div className="fs-icon1" style={{
                                width: "40px", height: "40px", background: "linear-gradient(72.74deg, #459B02 -15.27%, #AAFA6B 113.22%)",
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

                    <div className="flight-list">
                        {flightData.map((flight) => (
                            <div className="flight-card" key={flight.idFlight}>
                                <div className="flight-info">
                                    <p className="time">
                                        <span className='time-text'>{new Date(flight.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span className='span-special'>to</span>
                                        <span className='time-text'>{new Date(flight.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </p>
                                </div>

                                <div className="class-info">
                                    {Object.values(flight.classes).map((classInfo, index) => (
                                        <div className={`class-card ${classInfo.seatBooked >= classInfo.seatAmount ? 'sold-out' : ''}`} key={index}>
                                            <p className={`class-name ${classInfo.class.toLowerCase()}`}>{classInfo.class}</p>
                                            {classInfo.seatBooked >= classInfo.seatAmount ? (
                                                <p className="status">Hết chỗ</p>
                                            ) : (
                                                <p className="price">{classInfo.currentPrice.toLocaleString('vi-VN')} VND</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="sidebar-fs">
                    <div className="sidebar-fs-header">
                        <h3>THÔNG TIN ĐẶT CHỖ</h3>
                        <button>Thông tin hành khách</button>
                    </div>
                    <div className="sidebar-fs-summary">
                        <h4>Chuyến đi</h4>
                        <span className="sidebar-fs-total-price">{booking.totalPrice} VND</span>
                    </div>
                    <div className="sidebar-fs-details">
                        <p>
                            <strong>{booking.from}</strong> ✈ <strong>{booking.to}</strong>
                        </p>
                        <p>{booking.date} | {booking.time} | {booking.flightCode} | {booking.class}</p>
                    </div>
                    <div className="sidebar-fs-breakdown">
                        <div>
                            <span>Giá vé</span>
                            <span>{booking.ticketPrice} VND</span>
                        </div>
                        <div>
                            <span>Thuế, phí</span>
                            <span>{booking.tax} VND</span>
                        </div>
                        <div>
                            <span>Dịch vụ</span>
                            <span>{booking.serviceFee} VND</span>
                        </div>
                    </div>
                    <div className="sidebar-fs-footer">
                        <strong>Tổng tiền</strong>
                        <strong>{booking.totalPrice} VND</strong>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SearchFlight;
