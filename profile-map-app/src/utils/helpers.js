export const validateProfileData = (profile) => {
    let name, description, latitude, longitude, contact, interests, photograph, location;

    if (profile instanceof FormData) {
        name = profile.get("name");
        description = profile.get("description");
        latitude = profile.get("latitude");
        longitude = profile.get("longitude");
        contact = profile.get("contact");
        interests = profile.get("interests");
        photograph = profile.get("photograph");
        location = profile.get("location");
    } else {
        ({ name, description, latitude, longitude, contact, interests, photograph, location } = profile);
    }

    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
        errors.name = "Name must contain only letters and spaces.";
    }

    const contactRegex = /^\d{10}$/;
    if (!contact || !contactRegex.test(contact)) {
        errors.contact = "Contact must be a 10-digit number.";
    }

    const interestsRegex = /^([A-Za-z\s]+,)*[A-Za-z\s]+$/;
    if (!interests || !interestsRegex.test(interests)) {
        errors.interests = "Interests must be comma-separated strings.";
    }

    if (!latitude || isNaN(Number(latitude))) {
        errors.latitude = 'Latitude is required and must be a number.';
    } else if (Number(latitude) < -90 || Number(latitude) > 90) {
        errors.latitude = 'Latitude must be between -90 and 90.';
    }
    
    if (!longitude || isNaN(Number(longitude))) {
        errors.longitude = 'Longitude is required and must be a number.';
    } else if (Number(longitude) < -180 || Number(longitude) > 180) {
        errors.longitude = 'Longitude must be between -180 and 180.';
    }

    if (!photograph) {
        errors.photograph = "Photograph is required.";
    } else if (photograph && !(photograph.type === "image/jpeg" || photograph.type === "image/png")) {
        errors.photograph = "Photograph must be a JPG or PNG file.";
    }

    if (!description) {
        errors.description = "Description is required.";
    }

    if (!location) {
        errors.location = "Location is required.";
    }

    return errors;
};



// Function to format profile data for display
export const formatProfileData = (profile) => {
    return {
        ...profile,
        name: profile.name.toUpperCase(),
        location: `${profile.latitude}, ${profile.longitude}`
    };
};
