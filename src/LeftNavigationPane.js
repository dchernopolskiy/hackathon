import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Code, BarChart2, Zap } from 'lucide-react';

const LeftNavigation = ({ isTracksExpanded, setIsTracksExpanded }) => (
  <nav className="w-64 bg-gray-800 h-full overflow-y-auto">
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-white">Hackathon 2024</h2>
      <ul className="space-y-2">
        <li><Link to="/" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">About</Link></li>
        <li><Link to="/rulebook" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-300">Submission Rules</Link></li>
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

export default LeftNavigation;