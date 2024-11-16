import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../contexts/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import MapComponent from '../components/MapComponent';
import ProfileDetailModal from '../components/ProfileDetailModal'; 
import { GrUserAdmin } from 'react-icons/gr';
import Loader from '../components/Loader';
import '../css/HomePage.css';  

const HomePage = () => {
    const { profiles, loading, progress, error, selectedProfile, setSelectedProfile } = useContext(ProfileContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [showMap, setShowMap] = useState(false); 

    const mapRef = useRef(null);

    // Filter profiles based on the search term for name, location, and interests
    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(profile.interests) 
            ? profile.interests.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
            : profile.interests.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Function to open modal when a card is clicked
    const handleCardClick = (profile) => {
        setSelectedProfile(profile);
        setIsModalOpen(true);  
    };

    const closeModal = () => {
        setIsModalOpen(false);  
    };

    const handleSummaryClick = (profile) => {
        setSelectedProfile(profile);
        setShowMap(true);  
        setTimeout(() => {
            if(mapRef.current) {
                mapRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 200);
    };

    if (loading) return <Loader loading={loading} progress={progress}/>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Profiles</h1>

            <div className="text-center mt-4">
                <Link to="/admin">
                    <button className="btn btn-primary admin-button d-none d-sm-block">
                        Go To Admin Panel
                    </button>
                    <button className="btn btn-primary admin-button-icon d-block d-sm-none">
                        <GrUserAdmin />
                    </button>
                </Link>
            </div>

            <input
                type="text"
                className="form-control search-bar"
                placeholder="Search profiles by name, location, or interests"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="row profile-row">
                {filteredProfiles.length === 0 ? (
                    <p className="no-results">No results found</p>
                ) : (
                    filteredProfiles.map((profile, index) => (
                        <div key={profile.id || index} className="col-md-4 mb-4">
                            <ProfileCard 
                                profile={profile} 
                                handleCardClick={handleCardClick}  
                                handleSummaryClick={handleSummaryClick}  
                            />
                        </div>
                    ))
                )}
            </div>

            {showMap && selectedProfile && (
                <div className="mt-5" ref={mapRef}>
                    <MapComponent selectedProfile={selectedProfile} />  
                </div>
            )}

            {isModalOpen && selectedProfile && (
                <ProfileDetailModal 
                    profile={selectedProfile} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default HomePage;
