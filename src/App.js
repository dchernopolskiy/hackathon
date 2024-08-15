import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import HackathonMainPage from './HackathonMainPage';
import TrackHacksPage from './TrackHacksPage';
import SchedulePage from './SchedulePage';
import MySubmissionsPage from './MySubmissionsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/hackathon" element={<HackathonMainPage />} />
        <Route path="/tracks/:trackId" element={<TrackHacksPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/submissions" element={<MySubmissionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;