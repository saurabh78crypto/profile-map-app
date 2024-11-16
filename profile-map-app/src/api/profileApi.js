import axios from 'axios';
import {validateProfileData} from '../utils/helpers';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all profiles
export const fetchProfiles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new profile with validation
export const createProfile = async (profileData) => {
    try {
        if (!validateProfileData(profileData)) {
            throw new Error('Invalid profile data');
        }

        let response;
        if (profileData instanceof FormData) {
            response = await axios.post(API_URL, profileData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            response = await axios.post(API_URL, profileData);
        }

        return response.data;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error; 
    }
};

// Update an existing profile with validation
export const updateProfile = async (id, profileData) => {
    try {
        if (!validateProfileData(profileData)) {
            throw new Error('Invalid profile data');
        }

        let response;
        const headers = profileData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};

        if (profileData instanceof FormData) {
            response = await axios.put(`${API_URL}/${id}`, profileData, { headers });
        } else {
            response = await axios.put(`${API_URL}/${id}`, profileData);
        }

        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error; 
    }
};


// Delete a profile
export const deleteProfile = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
