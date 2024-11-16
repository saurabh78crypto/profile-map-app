import React, { useState, useEffect, useContext } from 'react';
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from '../api/profileApi';
import { Modal, Button } from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';
import { validateProfileData } from '../utils/helpers';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../contexts/ProfileContext';
import { FaHome } from 'react-icons/fa';
import Loader from '../components/Loader';
import '../css/AdminPage.css';

const AdminPage = () => {
    const { updateProfiles, deleteProfileFromContext } = useContext(ProfileContext);
    const [profiles, setProfiles] = useState([]);
    const [editingProfile, setEditingProfile] = useState(null);
    const [formProfile, setFormProfile] = useState({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        contact: '',
        interests: '',
        photograph: null,
        location: ''
    });
    const [progress, setProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = async () => {
        setProgress(20);
        try {
            const data = await fetchProfiles();
            setProfiles(data);
            setErrors(null);
            setProgress(100);
        } catch (err) {
            setErrors("Failed to load profiles.");
            setProgress(0);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();

        const validationErrors = validateProfileData(formProfile);
        if(validationErrors && Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let profileData;
        if (formProfile.photograph) {
            profileData = new FormData();
            Object.entries(formProfile).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    profileData.append(key, value);
                }
            });
        } else {
            profileData = { ...formProfile };
        }

        try {
            let newProfile;
            setProgress(20);
            if (editingProfile && editingProfile._id) {
                newProfile = await updateProfile(editingProfile._id, profileData);
            } else {
                newProfile = await createProfile(profileData);
            }
            updateProfiles(newProfile);
            loadProfiles();
            setFormProfile({
                name: '',
                description: '',
                latitude: '',
                longitude: '',
                contact: '',
                interests: '',
                photograph: null,
                location: ''
            });
            setEditingProfile(null);
            setShowModal(false);
            setErrors(null);
            setProgress(100);
        } catch (error) {
            setErrors("Failed to submit profile.");
            setProgress(0);
        }
    };

    const handleDelete = async (profileId) => {
        setProgress(20);
        await deleteProfile(profileId);
        deleteProfileFromContext(profileId);
        setProfiles((prevProfiles) => prevProfiles.filter(profile => profile._id !== profileId));
        setProgress(100);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Admin Panel</h1>

            <Loader progress={progress} />

            <div className="text-center mt-4">
                <Link to="/">
                    <button className="btn btn-secondary back-to-homepage-btn d-none d-sm-block">
                        Back To Homepage
                    </button>
                    <button className="btn btn-secondary back-to-homepage-btn-icon d-block d-sm-none">
                        <FaHome />
                    </button>
                </Link>
            </div>

            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-6">
                    <div
                        className="card p-4 shadow-lg rounded-3 cursor-pointer create-profile-card"
                        onClick={() => {
                            setEditingProfile(null);
                            setFormProfile({
                                name: '',
                                description: '',
                                latitude: '',
                                longitude: '',
                                contact: '',
                                interests: '',
                                photograph: null,
                                location: ''
                            });
                            setErrors({});
                            setShowModal(true);
                        }}
                    >
                        <h5 className="text-primary font-weight-bold">Create New Profile</h5>
                        <p className="text-muted">Click here to add a new profile to the system.</p>
                        <Button variant="primary" className="mt-3">
                            Create Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row">
                {profiles.map((profile) => (
                    <div
                        key={profile.id}
                        className="col-12 col-md-4 d-flex justify-content-center mb-4"
                    >
                        <div className="profile-card-container">
                            <ProfileCard
                                profile={profile}
                                showSummaryButton={false}
                                isAdmin={true}
                            />
                            <div className="d-flex flex-row justify-content-center mt-3 profile-card-button-gap">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => {
                                        setEditingProfile(profile);
                                        setFormProfile(profile);
                                        setShowModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(profile._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

<Modal
    show={showModal}
    onHide={() => {
        setShowModal(false);
        setErrors({});
    }}
    centered
    className="custom-modal"
>
    <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-gradient fw-bold fs-4">
            {editingProfile ? 'Edit Profile' : 'Create Profile'}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body className="py-4">
        <form
            id="profileForm"
            onSubmit={handleCreateOrUpdate}
            encType="multipart/form-data"
            className="row g-3"
        >
            <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    value={formProfile.name}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, name: e.target.value });
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.name; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="col-md-6">
                <label className="form-label">Contact</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter contact number"
                    value={formProfile.contact}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, contact: e.target.value });
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.contact; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.contact && <div className="invalid-feedback">{errors.contact}</div>}
            </div>

            <div className="col-md-6">
                <label className="form-label">Latitude</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Latitude"
                    value={formProfile.latitude}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, latitude: e.target.value })
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.latitude; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            </div>
            <div className="col-md-6">
                <label className="form-label">Longitude</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Longitude"
                    value={formProfile.longitude}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, longitude: e.target.value })
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.longitude; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
            </div>

            <div className="col-12">
                <label className="form-label">Location</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    value={formProfile.location}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, location: e.target.value })
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.location; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.location && <div className="invalid-feedback">{errors.location}</div>}
            </div>

            <div className="col-12">
                <label className="form-label">Interests</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter interests (comma-separated)"
                    value={formProfile.interests}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, interests: e.target.value })
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.interests; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.interests && <div className="invalid-feedback">{errors.interests}</div>}
            </div>

            <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Add a brief description"
                    rows="3"
                    value={formProfile.description}
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, description: e.target.value });

                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.description; 
                            return newErrors;
                        });
                    }}
                ></textarea>
                {errors?.description && ( <div className="invalid-feedback">{errors.description}</div> )}
            </div>

            <div className="col-12">
                <label className="form-label">Photograph</label>
                <input
                    type="file"
                    className="form-control"
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                        setFormProfile({ ...formProfile, photograph: e.target.files[0] });
                        setErrors((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.photograph; 
                            return newErrors;
                        });
                    }}
                />
                {errors?.photograph && (
                    <div className="invalid-feedback">{errors.photograph}</div>
                )}
            </div>

            <div className="col-12 text-center">
                <button className="btn btn-primary mt-3" type="submit">
                    {editingProfile ? 'Update Profile' : 'Create Profile'}
                </button>
            </div>
        </form>
    </Modal.Body>
</Modal>

        </div>
    );
};

export default AdminPage;
