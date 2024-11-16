import Profile from '../models/Profile.js';
import multer from '../utils/multer.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get all profiles
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error });
    }
};

// Get a single profile by ID
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

// Create a new profile
const createProfile = async (req, res) => {
    try {
        if (req.file && !['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Only JPEG or PNG files are allowed' });
        }

        const profileData = { ...req.body };
        // Store the photograph field with the correct filename
        if (req.file) {
            profileData.photograph = req.file.filename; 
        }

        console.log('Request File Path:', req.file.filename);

        const profile = new Profile(profileData);
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds limit' });
        }
        if (error.message === 'Only JPEG or PNG files are allowed') {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(400).json({ message: 'Error creating profile', error });
    }
};

// Update an existing profile
const updateProfile = async (req, res) => {
    try {
        const profileData = { ...req.body };
        if (req.file) {
            profileData.photograph = req.file.filename; 
        }

        const profile = await Profile.findByIdAndUpdate(req.params.id, profileData, { new: true });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds limit' });
        }
        if (error.message === 'Only JPEG or PNG files are allowed') {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(400).json({ message: 'Error updating profile', error });
    }
};

// Delete a profile and its associated photograph
const deleteProfile = async (req, res) => {
    try {
        console.log('ID:', req.params.id);

        
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Delete the photograph file if it exists
        if (profile.photograph) {
            console.log(profile.photograph);
            // Resolve the full path of the photograph file
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, '..', 'uploads', profile.photograph);
            console.log('Trying to delete file at:', filePath);

            try {
                await fs.unlink(filePath); 
                console.log('File deleted successfully.');
            } catch (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: 'Error deleting photograph file', error: err });
            }
        }

        
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Error deleting profile', error });
    }
};


export { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile };