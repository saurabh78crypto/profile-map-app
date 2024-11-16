import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    photograph: { 
        type: String 
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    contact: {
        type: String
    },
    interests: [String],
    location: {
        type: String
    },  
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile; 
