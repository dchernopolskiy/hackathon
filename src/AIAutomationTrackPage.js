import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ThumbsUp } from 'lucide-react';
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

const AIAutomationTrackPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  const aiAutomationHacks = [
    {
      id: 1,
      title: "AI-Powered Code Review Assistant",
      description: "Developed an AI-driven code review tool that automatically detects potential bugs, security vulnerabilities, and style inconsistencies, improving code quality and reducing review time.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user9", name: "Emily Chen" },
        { id: "user10", name: "David Kim" },
      ],
      upvotes: 95
    },
    {
      id: 2,
      title: "Automated Test Case Generation",
      description: "Created an AI system that analyzes code and automatically generates comprehensive test cases, significantly reducing QA time and improving overall software reliability.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user11", name: "Sophie Taylor" },
        { id: "user12", name: "Ryan Garcia" },
      ],
      upvotes: 88
    },
  ];

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

        <main className="flex-grow p-8 overflow-y-auto bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-white">AI & Automation Track Submissions</h1>
          <p className="text-gray-400 mb-8">Harness the power of artificial intelligence and automation to solve complex problems. And remember, cake is a lie.</p>
          <div className="space-y-6">
            {aiAutomationHacks.map(hack => (
              <HackEntry key={hack.id} hack={hack} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAutomationTrackPage;