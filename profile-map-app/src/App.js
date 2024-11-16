import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProfileProvider } from './contexts/ProfileContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ProfileCard from './components/ProfileCard';

const App = () => (
    <ProfileProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfileCard />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    </ProfileProvider>
);

export default App;
