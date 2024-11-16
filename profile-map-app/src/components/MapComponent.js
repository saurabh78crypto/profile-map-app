import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import { ProfileContext } from '../contexts/ProfileContext';
import Loader from './Loader';
import '../css/MapComponent.css'; 


const MapComponent = () => {
    const { selectedProfile } = useContext(ProfileContext);
    const [infoOpen, setInfoOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        if(isLoaded) {
            setLoading(false);
        }
    }, [isLoaded]);

    if (!selectedProfile) return <div>Please select a profile to view its location on the map.</div>;

    const center = { lat: selectedProfile.latitude, lng: selectedProfile.longitude };

    const photoMarker = selectedProfile.photograph
        ? `http://localhost:5000/uploads/${selectedProfile.photograph}`
        : 'https://via.placeholder.com/100';

    if (loadError) return <div>Map failed to load. Please try again later.</div>;

    if(loading) return <Loader loading={true} progress={0} />;

    return (
        <GoogleMap
            mapContainerClassName= 'map-container'
            center={center}
            zoom={12}
        >
            <MarkerF
                position={center}
                title={selectedProfile.name}
                onClick={() => setInfoOpen(true)}
            />

            {infoOpen && (
                <InfoWindowF
                    position={center}
                    onCloseClick={() => setInfoOpen(false)}
                >
                    <div className="marker-info">
                        <img
                            src={photoMarker}
                            alt={selectedProfile.name}
                        />
                        <h6>{selectedProfile.name}</h6>
                        <p>
                            <strong>Location:</strong> {selectedProfile.location}
                            <br />
                            <strong>Latitude:</strong> {selectedProfile.latitude}
                            <br />
                            <strong>Longitude:</strong> {selectedProfile.longitude}
                        </p>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    );
};

export default MapComponent;
