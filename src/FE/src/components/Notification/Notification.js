import React from 'react';
import './Notification.css'; 

const Notification = ({ message, show }) => {
  return (
    <div className={`notification ${show ? 'show' : ''}`}>
        <div className='wrap-icon'>
            <span>!</span>
        </div>
      
      <div className='wrap-message'>
        <h2 className='title-message'>Warning!</h2>
        <p className='content-message'>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
