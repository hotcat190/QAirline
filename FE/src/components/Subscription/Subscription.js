import React from "react";
import "./Subscription.css";


function Subscription() {
    return (
        <div className="subscription">
        <div className="content">
          <div className="newsletter">
            <img src="img/sunset.png" alt="" />
            <div className="main-form">
              <h2>Newsletter</h2>
              <p className="desc">
                Join our newsletter for the latest flight deals, travel tips,
                and updates on top destinations!
              </p>
              <div className="input-container">
                <input type="email" placeholder="Enter your mail address" className="email-input" />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Subscription;