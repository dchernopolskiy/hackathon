import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import HackathonMainPage from './HackathonMainPage';
import ClassicTrackPage from './ClassicTrackPage';
import ReusableAssetsTrackPage from './ReusableAssetsTrackPage';
import AIAutomationTrackPage from './AIAutomationTrackPage';
import SchedulePage from './SchedulePage';
import MySubmissionsPage from './MySubmissionsPage';
import Rulebook from './Rulebook'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/hackathon" element={<HackathonMainPage />} />
        <Route path="/tracks/classic" element={<ClassicTrackPage />} />
        <Route path="/tracks/reusable-assets" element={<ReusableAssetsTrackPage />} />
        <Route path="/tracks/ai-automation" element={<AIAutomationTrackPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/submissions" element={<MySubmissionsPage />} />
        <Route path="/rulebook" element={<Rulebook />} />
      </Routes>
    </Router>
  );
};

export default App;