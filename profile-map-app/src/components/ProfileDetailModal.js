import React from 'react';
import '../css/ProfileDetailModal.css'; 

const ProfileDetailModal = ({ profile, onClose }) => {
    if (!profile) return null;

    return (
        <div className="modal-overlay-detail" onClick={onClose}>
            <div className="modal-detail-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="profile-image">
                    <img 
                        src={profile.photograph ? `http://localhost:5000/uploads/${profile.photograph}` : 'https://via.placeholder.com/150'}
                        alt={profile.name}
                    />
                </div>

                <h2 className="profile-name">
                    {profile.name}
                </h2>

                <div className="profile-details">
                    <p><strong>Description:</strong> {profile.description}</p>
                    <p><strong>Contact:</strong> {profile.contact}</p>
                    <p><strong>Interests:</strong> {profile.interests}</p>
                    <p><strong>Location:</strong> {profile.location}</p>
                    <p><strong>Latitude:</strong> {profile.latitude}</p>
                    <p><strong>Longitude:</strong> {profile.longitude}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailModal;
