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

const ClassicTrackPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  const classicTrackHacks = [
    {
      id: 1,
      title: "Innovative Mobile App for Personal Finance",
      description: "Developed a user-friendly mobile app that helps individuals manage their personal finances, set budgets, and achieve savings goals.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user1", name: "John Doe" },
        { id: "user2", name: "Jane Smith" },
      ],
      upvotes: 78
    },
    {
      id: 2,
      title: "Smart Home Energy Management System",
      description: "Created an IoT-based solution for optimizing energy consumption in homes, reducing electricity bills by up to 30%.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user3", name: "Alice Johnson" },
        { id: "user4", name: "Bob Williams" },
      ],
      upvotes: 65
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
          <h1 className="text-3xl font-bold mb-6 text-white">Classic Track Submissions</h1>
          <p className="text-gray-400 mb-8">Get a chance to focus on crafting a new experience. This could be a feature in an app, a useful hack for daily use, or an entirely new product!</p>
          <div className="space-y-6">
            {classicTrackHacks.map(hack => (
              <HackEntry key={hack.id} hack={hack} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassicTrackPage;