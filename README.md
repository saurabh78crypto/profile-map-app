# Profile Map Application

## Overview

The **Profile Map Application** is a full-stack web application designed to display user profiles and their associated geographical locations interactively. This project implements an intuitive and responsive interface that allows users to explore profiles, view profile details, and locate profile addresses on a map.

The application comprises:
- **Frontend:** Built using React, integrated with Google Maps for address visualization.
- **Backend:** Built with Node.js and Express, using MongoDB for data storage.

## Key Features

1. Profile Display:
    Displays a list of user profiles, including name, photograph, and essential details.

2. Interactive Mapping:
    Dynamically renders a Google Maps component with markers for profile addresses.

3. Summary Button:
Highlights the geographic location of a selected profile on the map.

4. Profile Management (Admin Panel):
    Admins can add, edit, and delete profiles via a dedicated admin interface.

5. Search and Filter:
    Allows searching and filtering profiles by name, location, or other attributes.

6. Responsive Design:
    Fully mobile-friendly for use on smartphones and tablets.

7. Error Handling:
    Gracefully handles invalid inputs and map service errors.

8. Loading Indicators:
    Displays progress bars or spinners during data fetching or rendering.

9. Detailed Profile Views:
    Provides in-depth information about profiles when clicked.

## Tech Stack

### Frontend

- React.js
- React Router
- Google Maps API `(@react-google-maps/api)`
- Axios for API requests
- Bootstrap for responsive styling

### Backend

- Node.js with Express
- MongoDB with Mongoose
- Multer for file uploads
- Dotenv for environment variable management
- Nodemon for development

## Installation and Setup

### Prerequisites

- Node.js (v16+)
- npm (v7+)
- MongoDB (Running instance or cloud)

### Clone Repository

```bash
git clone <repository-url>
cd profile-map-app
```

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd 
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
    Create a `.env` file in the `frontend` directory

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=<Your Google Maps API Key>
REACT_APP_API_BASE_URL=<Your Backend Server URL>
```

4. Start the development server:

```bash
npm start
```

### Backend Setup

1. Navigate to the `backend` directory:

```bash
cd 
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
    Create a `.env` file in the `backend` directory

```bash
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
```

4. Start the server:

```bash
npm start
```

## Usage

1. Launch the Application:

- Access the frontend at http://localhost:3000.
- Ensure the backend server is running at http://localhost:5000.

2. Explore Profiles:

- View a list of user profiles with photographs.
- Click the "Summary" button to view their locations on a Google Map.

3. Admin Panel:

- Manage profiles (create, update, delete).
- Accessible from the admin interface.