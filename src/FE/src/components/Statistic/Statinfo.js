import React from 'react';
import './Statinfo.css';

function Statinfo() {
    return (
        <div className="stats-info">
        <div className="content">
          <div className="stats">
            <div className="ex-stats">
              <img src="img/person.png" alt="" />
              <div className="share-ex">
                <p className="desc-share">Share your Experience</p>
                <div className="emojis">
                  <span className="emoji" role="img" aria-label="Love">😍</span>
                  <span className="emoji" role="img" aria-label="Happy">😃</span>
                  <span className="emoji" role="img" aria-label="Neutral">😐</span>
                  <span className="emoji" role="img" aria-label="Sad">🙁</span>
                  <span className="emoji" role="img" aria-label="Angry">😡</span>
                </div>
              </div>
            </div>
            <div className="num-stats">
              <h2 className="stats-title">Fly Smart, Travel Better</h2>
              <p className="stats-desc">
                At QAirline, we simplify flight booking, offering the best deals
                and personalized itineraries. With a user-friendly platform and
                round-the-clock support, your travel plans are just a click
                away. Start your journey with ease and confidence, knowing we've
                got you covered.
              </p>
              <div className="more-details">
                <div className="separator"></div>
                <div className="detailed">
                  <div className="stat-common">
                    <span className="num">20+</span>
                    <span className="num-desc">Years of Experience</span>
                  </div>

                  <div className="stat-common stat-commonn">
                    <span className="num">100 M+</span>
                    <span className="num-desc">Happy Travelers</span>
                  </div>

                  <div className="stat-common stat-commonn">
                    <span className="num">175</span>
                    <span className="num-desc">Countried Covered</span>
                  </div>
                </div>
              </div>
              <a href="" className="btn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Statinfo;