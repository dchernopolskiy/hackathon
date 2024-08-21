import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';
import HackSubmissionForm from './HackSubmissionForm';

const HackSubmissionPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <span className="font-bold text-lg text-white">John Doe</span>
        <Link to="/profile" className="flex items-center text-purple-400 hover:text-purple-300 transition duration-300">
          <User size={20} className="mr-2" />
          Profile
        </Link>
      </header>

      <div className="flex flex-grow">
        <LeftNavigationPane isTracksExpanded={isTracksExpanded} setIsTracksExpanded={setIsTracksExpanded} />

        <main className="flex-grow p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Submit Your Hack</h1>
          <HackSubmissionForm />
        </main>
      </div>
    </div>
  );
};

export default HackSubmissionPage;