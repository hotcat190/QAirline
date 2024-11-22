import React from 'react';
import './MainContent.css';

function MainContent() {
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
              DISCOVER <span className="red-text">PREMIUM</span><br />
              <span className="red-text">FLIGHTS</span> WITH EASE!
            </h1>
            <p className="des">
              Find top destination and look effortlessly with out seamless
              flight search and booking experience
            </p>

            <div className="main-booking">
              <div className="flight-options">
                <select className="dropdown">
                  <option value="round-trip">Round Way</option>
                  <option value="one-way">One Way</option>
                  <option value="multi-city">Multi-City</option>
                </select>
                <select className="dropdown">
                  <option value="economy">Economy class</option>
                  <option value="business">Business class</option>
                  <option value="first-className">First class</option>
                </select>
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
                        <input
                          type="text"
                          id="from"
                          placeholder="Dhaka, Bangladesh"
                        />
                      </div>
                    </div>
                    <div className="detail">
                      <div className="depart">
                        <span className="icon">📅</span>
                        <label htmlFor="depart">Depart</label>
                      </div>
                      <div className="date">
                        <input type="date" id="depart" />
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
                        <input
                          type="text"
                          id="to"
                          placeholder="New York, USA"
                        />
                      </div>
                    </div>

                    <div className="detail">
                      <div className="return">
                        <span className="icon">📅</span>
                        <label htmlFor="return">Return</label>
                      </div>
                      <div className="date">
                        <input type="date" id="return" />
                      </div>
                    </div>
                  </div>

                  <div className="bottom">
                    <button className="search-flights">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-rightcontent">
            <img
              src="img/plane.svg"
              alt=""
              className="plane"
              width="110px"
            />
            <img
              src="img/cloud.svg"
              alt=""
              width="100px"
              className="cloud"
            />
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
    )
}

export default MainContent;