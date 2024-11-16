import React from 'react';
import '../css/ProfileCard.css'; 

const ProfileCard = ({ profile, handleCardClick, handleSummaryClick, showSummaryButton = true, isAdmin = false }) => {

    const imageUrl = profile.photograph 
        ? `http://localhost:5000/uploads/${profile.photograph}` 
        : 'https://via.placeholder.com/100'; 

    return (
        <div 
            className={`profile-card card shadow-sm p-3 mb-4 bg-white rounded ${isAdmin ? 'admin-profile-card' : ''}`} 
            onClick={() => !isAdmin && handleCardClick(profile)}  
            style={{ cursor: isAdmin ? 'default' : 'pointer' }} 
        >
            <div className="profile-image text-center">
                <img 
                    src={imageUrl} 
                    alt={profile.name} 
                />
            </div>
            <h5 className="text-center font-weight-bold">{profile.name}</h5>
            {!isAdmin && <p className="text-center text-muted">{profile.description}</p>}
            
            {showSummaryButton && (
                <div className="view-summary-button">
                    <button 
                        className="btn btn-primary btn-sm" 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            handleSummaryClick(profile);  
                        }} >
                        View Summary
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
