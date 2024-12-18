import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className='content'>
                <div
                    className="profile-header"
                    style={{
                        backgroundImage:
                            "url('img/backgroundprofile.png')",
                        borderRadius: "0px 0px 20px 20px"
                    }}
                >
                    <div className="profile-avatar-wrapper">
                        <img
                            src="img/default_avatar.png"
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                    </div>
                </div>

                <div className="profile-info">
                    <h2 className="profile-name">Hoàng Vũ Lê</h2>
                </div>

                <div className="profile-content">
                    <div className="profile-card">
                        <h3>Introduction</h3>
                        <p>
                            🧑‍💻 A member of <strong>QAirline</strong> since a few moments ago
                        </p>
                    </div>
                    <div className="profile-card">
                        <h3>Current activities</h3>
                        <p>No recent activities</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
