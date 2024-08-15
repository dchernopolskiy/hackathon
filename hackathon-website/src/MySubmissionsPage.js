import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ThumbsUp, PlusCircle } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';

const HackEntry = ({ hack }) => {
  const [upvotes, setUpvotes] = useState(hack.upvotes);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{hack.title}</h2>
        <p className="text-gray-400 mb-4">{hack.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {hack.collaborators.map((collaborator, index) => (
            <Link 
              key={index} 
              to={`/profile/${collaborator.id}`} 
              className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500 text-white hover:bg-purple-600 transition duration-300"
            >
              {collaborator.name}
            </Link>
          ))}
        </div>
        <button 
          onClick={() => setUpvotes(upvotes + 1)} 
          className="flex items-center text-purple-400 hover:text-purple-300 transition duration-300"
        >
          <ThumbsUp size={20} className="mr-2" />
          Upvote ({upvotes})
        </button>
      </div>
      <div className="bg-gray-700 p-4">
        <iframe 
          width="100%" 
          height="315" 
          src={hack.videoUrl} 
          title={hack.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="mb-4"
        ></iframe>
        <div className="grid grid-cols-5 gap-2">
          {hack.images.map((img, index) => (
            <img key={index} src={img} alt={`Hack ${index + 1}`} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

const MySubmissionsPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  const sampleHack = {
    id: 1,
    title: "AI-Powered Predictive Maintenance System",
    description: "Developed an AI-driven predictive maintenance system for a major automotive manufacturer, reducing downtime by 30% and maintenance costs by 25%.",
    videoUrl: "https://www.youtube.com/embed/5GOibtZZzy4?list=PLjCLg32Aazj1BFCA3HLmAnlpGr5g22UKA",
    images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
    collaborators: [
      { id: "user1", name: "John Doe" },
      { id: "user2", name: "Jane Smith" },
    ],
    upvotes: 42
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">My Submissions</h1>
            <Link to="/submit-hack" className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold hover:bg-purple-600 transition duration-300 flex items-center">
              <PlusCircle size={20} className="mr-2" />
              Submit a New Hack
            </Link>
          </div>
          
          <HackEntry hack={sampleHack} />
        </main>
      </div>
    </div>
  );
};

export default MySubmissionsPage;