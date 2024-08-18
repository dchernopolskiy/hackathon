import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import HackathonMainPage from './HackathonMainPage';
import TrackPage from './TrackPage';
import SchedulePage from './SchedulePage';
import MySubmissionsPage from './MySubmissionsPage';
import RulebookPage from './RulebookPage';
import ProfilePage from './ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/hackathon" element={<HackathonMainPage />} />
        <Route path="/tracks/:trackId" element={<TrackPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/submissions" element={<MySubmissionsPage />} />
        <Route path="/rulebook" element={<RulebookPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;