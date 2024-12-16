import React from "react";
import * as rd from "react-router-dom";
import "./MobileHeader.css";

function MobileHeader() {
    return (
        <header className="mobile-header">
            <input type="checkbox" name="" id="menu-checkbox" hidden />
            <label className="menu-overlay" htmlFor="menu-checkbox"></label>
            <div className="menu-drawer">
                <ul id="mobile-nav">
                    <li>
                        <rd.Link to="/">
                            <i className="fa-solid fa-house-user"></i><span className="name1">Home</span>
                        </rd.Link>
                    </li>
                    <li><rd.Link to="/myflights">
                        <i className="fa-solid fa-plane-departure"></i><span className="name2">My flights</span></rd.Link></li>
                    <li><rd.Link to="/news">
                    <i className="fa-solid fa-newspaper"></i><span className="name3">News</span></rd.Link></li>
                    <li className="special-link"><rd.Link to="/destination">
                    <i className="fa-solid fa-location-dot"></i><span className="name4">Destination</span></rd.Link></li>
                </ul>
            </div>
        </header>
    )
}

export default MobileHeader;