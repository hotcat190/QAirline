import React from "react";
import * as rd from 'react-router-dom'
import "./Featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="content">
        <header>
          <h2 className="sub-title">Popular Destination</h2>
          <div className="row">
            <p className="desc">
              Explore the world's most popular spots, find your dream getaway
              and book your next adventure with ease!
            </p>
            <rd.Link to="/destination" className="link">
              <span>View All Destinations</span>
              <i className="fa-solid fa-arrow-right arrow"></i>
            </rd.Link>
          </div>
        </header>

        <div className="list">
          <div className="item">
            <a href="#!">
              <img src="img/pd_1.jpg" alt="Nikko Apartments" className="thumb" />
            </a>
            <div className="body">
              <div className="body-top">
                <a className="location">
                  <i className="fa-regular fa-compass"></i>
                  <span>Paris, France</span>
                </a>
                <h3 className="title">
                  <a href="#!">The City of Love</a>
                </h3>
              </div>

              <div className="info">
                <div className="price">
                  <span className="label">From</span>
                  <span className="value">$1.300</span>
                </div>
                <a href="" className="btn book-now">Book Now</a>
              </div>
            </div>
          </div>

          <div className="item">
            <a href="#!">
              <img src="img/pd_2.jpg" alt="Nikko Apartments" className="thumb" />
            </a>
            <div className="body">
              <div className="body-top">
                <a className="location">
                  <i className="fa-regular fa-compass"></i>
                  <span>Rome, Italy</span>
                </a>
                <h3 className="title">
                  <a href="#!">A Journey Through History</a>
                </h3>
              </div>

              <div className="info">
                <div className="price">
                  <span className="label">From</span>
                  <span className="value">$1.200</span>
                </div>
                <a href="" className="btn book-now">Book Now</a>
              </div>
            </div>
          </div>

          <div className="item item3">
            <a href="#!">
              <img src="img/pd_3.jpg" alt="Nikko Apartments" className="thumb" />
            </a>
            <div className="body">
              <div className="body-top">
                <a className="location">
                  <i className="fa-regular fa-compass"></i>
                  <span>Sydney, Australia</span>
                </a>
                <h3 className="title">
                  <a href="#!">Gateway to Sydney</a>
                </h3>
              </div>

              <div className="info">
                <div className="price">
                  <span className="label">From</span>
                  <span className="value">$550</span>
                </div>
                <a href="" className="btn book-now">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured;