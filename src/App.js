import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import HackathonMainPage from './HackathonMainPage';
import TrackPage from './TrackPage';
import SchedulePage from './SchedulePage';
import MySubmissionsPage from './MySubmissionsPage';
import RulebookPage from './RulebookPage';
import ProfilePage from './ProfilePage';
import HackSubmissionPage from './HackSubmissionPage';
import AuthCallback from './components/AuthCallback';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token }); // decode the token to get user info
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-callback" element={<AuthCallback setUser={setUser} />} />
        <Route path="/hackathon" element={<ProtectedRoute><HackathonMainPage /></ProtectedRoute>} />
        <Route path="/tracks/:trackId" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><MySubmissionsPage /></ProtectedRoute>} />
        <Route path="/rulebook" element={<ProtectedRoute><RulebookPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/submit-hack" element={<ProtectedRoute><HackSubmissionPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;