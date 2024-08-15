import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';

const SchedulePage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  // Easily modifiable deadlines
  const deadlines = [
    { date: '2024-03-01', event: 'Registration Opens' },
    { date: '2024-03-15', event: 'Team Formation Deadline' },
    { date: '2024-04-01', event: 'Hackathon Kick-off' },
    { date: '2024-04-03', event: 'Project Submissions Due' },
    { date: '2024-04-05', event: 'Winners Announced' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <span className="font-bold text-lg text-white">John Doe</span>
        <Link to="/profile" className="flex items-center text-purple-400 hover:text-purple-300 transition duration-300">
          <User size={20} className="mr-2" />
          Profile
        </Link>
      </header>

      <div className="flex flex-grow">
        {/* Left Navigation Pane */}
        <LeftNavigationPane isTracksExpanded={isTracksExpanded} setIsTracksExpanded={setIsTracksExpanded} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Hackathon Schedule</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Stages of the Hackathon</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Registration: Sign up and form your teams</li>
              <li>Ideation: Brainstorm and refine your project ideas</li>
              <li>Development: Build your solutions</li>
              <li>Submission: Present your projects</li>
              <li>Judging: Evaluation of submissions</li>
              <li>Awards: Announcement of winners</li>
            </ol>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Key Deadlines</h2>
            <div className="space-y-4">
              {deadlines.map((deadline, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <Calendar className="mr-4 text-purple-400" />
                  <span className="mr-4 font-semibold">{deadline.date}:</span>
                  <span>{deadline.event}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulePage;