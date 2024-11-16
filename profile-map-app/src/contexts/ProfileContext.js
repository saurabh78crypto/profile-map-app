import React, { createContext, useState, useEffect } from 'react';
import { fetchProfiles } from '../api/profileApi';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                
                const data = await fetchProfiles();  
                const totalProfiles = data.length;
                let loadedProfiles = 0;

                setProgress(0);

                // Simulate loading progress
                for (let i = 0; i < totalProfiles; i++) {
                    loadedProfiles++;
                    setProgress(Math.floor((loadedProfiles / totalProfiles) * 100)); 
                    await new Promise(resolve => setTimeout(resolve, 100)); 
                }

                setProfiles(data);
            } catch (error) {
                setError("Failed to load profiles.");
            } finally {
                setLoading(false);
            }
        };
        loadProfiles();
    }, []);
    

     // Function to update profiles after adding/updating
     const updateProfiles = (newProfile) => {
        setProfiles(prevProfiles => [...prevProfiles, newProfile]); 
    };

    // Function to delete profile from context
    const deleteProfileFromContext = (profileId) => {
        setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== profileId));
    };

    const value = { profiles, selectedProfile, setSelectedProfile, loading, progress, error, updateProfiles, deleteProfileFromContext  };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
