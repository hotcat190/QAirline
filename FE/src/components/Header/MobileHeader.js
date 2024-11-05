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
                    <li><rd.Link to="/">Home</rd.Link></li>
                    <li><rd.Link to="/myflights">My flights</rd.Link></li>
                    <li><rd.Link to="/about">About</rd.Link></li>
                    <li><rd.Link to="/destination">Destination</rd.Link></li>
                </ul>
            </div>
        </header>
    )
}

export default MobileHeader;