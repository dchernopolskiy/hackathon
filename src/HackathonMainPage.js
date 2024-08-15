import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Code, BarChart2, Zap, User, Calendar, FileText } from 'lucide-react';

const LeftNavigation = ({ isTracksExpanded, setIsTracksExpanded }) => (
  <nav className="w-64 bg-gray-800 h-full overflow-y-auto">
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-white">Hackathon 2024</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">Dashboard</Link></li>
        <li><Link to="/schedule" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">Schedule</Link></li>
        <li><Link to="/resources" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">Resources</Link></li>
        <li>
          <button 
            className="flex items-center justify-between w-full py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300"
            onClick={() => setIsTracksExpanded(!isTracksExpanded)}
          >
            Tracks
            {isTracksExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {isTracksExpanded && (
            <ul className="pl-4 mt-2 space-y-2">
              <li><Link to="/tracks/classic" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300"><Code size={16} className="mr-2" /> Classic Track</Link></li>
              <li><Link to="/tracks/reusable-assets" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300"><BarChart2 size={16} className="mr-2" /> Reusable Assets</Link></li>
              <li><Link to="/tracks/ai-automation" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300"><Zap size={16} className="mr-2" /> AI & Automation Track</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/submissions" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">My Submissions</Link></li>
      </ul>
    </div>
  </nav>
);

const HackathonMainPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

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
        <LeftNavigation isTracksExpanded={isTracksExpanded} setIsTracksExpanded={setIsTracksExpanded} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Welcome to Hackathon 2024</h1>
          <div className="bg-gray-800 rounded-lg p-6 space-y-4 text-gray-300">
            <p>This hackathon is something that no company had ever done before and is definitely not created to steal your useful things in exchange for a shiny medal</p>
            <p>TBH Dan was just bored and I</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>See issues with company identity</li>
              <li>The usual goody bags from HR with our limited budgets had been extremely limited in quantities</li>
              <li>There's not a lot of collaboration within Luxoft - and Domain Chapters are not doing the best job of bringing everybody together (but they do a good job of giving people trainings and career paths)</li>
            </ol>
            <blockquote className="border-l-4 border-purple-500 pl-4 italic mt-4">
              "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program."
              <footer className="text-right text-purple-400">- Linus Torvalds</footer>
            </blockquote>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HackathonMainPage;