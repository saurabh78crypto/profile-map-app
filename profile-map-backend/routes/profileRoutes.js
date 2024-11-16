import express from 'express';
import upload from '../utils/multer.js';
import { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile } from '../controllers/profileController.js'

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.delete('/:id', deleteProfile);

// Apply multer middleware to handle file uploads
router.post('/', upload.single('photograph'), createProfile); 
router.put('/:id', upload.single('photograph'), updateProfile);

export default router;
