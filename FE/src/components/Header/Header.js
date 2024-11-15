import React from 'react';
import * as rd from 'react-router-dom'
// import Home from '../pages/Home'; 
// import About from '../pages/About';
// import Destination from '../pages/Destination';
// import Offers from '../pages/Offers';

import './Header.css';

function Header() {
  function openSignin() {
    document.querySelector('.overlay').style.display = 'block';
    const signinForm = document.querySelector('.signin-form');
    signinForm.style.display = 'flex';
    setTimeout(() => {
      signinForm.classList.add("showSign");
    }, 10);
    document.body.classList.add('no-scroll');
  }

  function openSignup() {
    document.querySelector('.overlay').style.display = 'block';
    const signupForm = document.querySelector('.signup-form');
    signupForm.style.display = 'flex';
    setTimeout(() => {
      signupForm.classList.add("showSign");
    }, 10);
    document.body.classList.add('no-scroll');
  }

  return (
    <header className="fixed-header">
      <div className="content">
        <nav className="navbar">
          <label htmlFor="menu-checkbox" className="toggle-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <a href="/">
            <img className="logo" src="img/LOGO.png" alt="Besnik." />
          </a>

          <ul id="pc-nav">
            <li><rd.Link to="/">Home</rd.Link></li>
            <li><rd.Link to="/myflights">My flights</rd.Link></li>
            <li><rd.Link to="/about">About</rd.Link></li>
            <li><rd.Link to="/destination">Destination</rd.Link></li>
          </ul>

          <div className="actions">
            <a href="#!" className="action-link" onClick={openSignup}>Sign up</a>
            <a href="#!" className="btn action-btn" onClick={openSignin}>Sign in</a>
          </div>

        </nav>
      </div>
    </header>
  );
}

export default Header;