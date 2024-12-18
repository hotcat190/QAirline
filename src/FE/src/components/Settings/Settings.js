import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import './Settings.css';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [ name, setName ] = useState(user.name || '');
    const [ address, setAddress ] = useState(user.address || '');
    const [ occupation, setOccupation ] = useState(user.occupation || '');
    const [ avatar, setAvatar ] = useState(user.avatar || 'img/default_avatar.png');
    const [ newAvatar, setNewAvatar ] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[ 0 ];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUser = {
            name,
            address,
            occupation,
            avatar: newAvatar || avatar,
        };
        updateUser(updatedUser);
        alert('Information updated successfully!');
    };

    const triggerFileInput = () => {
        document.getElementById('avatar-input').click();
    };

    return (
        <div className="settings-container">
            <div className='content'>
                <h1>Settings</h1>
                <div className="settings-form">
                    <div className="avatar-section">
                        <img
                            src={newAvatar || avatar}
                            alt="User Avatar"
                            className="avatar-img"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar-input"
                            onChange={handleAvatarChange}
                            className="avatar-input"
                            style={{ display: 'none' }}
                        />
                        <button type="button" className="change-avatar-btn" onClick={triggerFileInput}>
                            Change Avatar
                        </button>
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="occupation">Occupation</label>
                        <input
                            type="text"
                            id="occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="Enter your occupation"
                        />
                    </div>

                    <button className="save-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
