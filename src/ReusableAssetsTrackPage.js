import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ThumbsUp } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';

const rickAstleyImages = [
"https://i.imgur.com/TZoA7ht.png",
"https://i.imgur.com/qj55xAl.jpeg",
"https://i.imgur.com/9Aw4IoN.jpeg",
"https://i.imgur.com/D9WVl4T.jpeg",
"https://i.imgur.com/uZaP99v.jpeg",
"https://i.imgur.com/YPmY4QY.jpeg",
];

const getRandomRickImage = () => rickAstleyImages[Math.floor(Math.random() * rickAstleyImages.length)];

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
          {[...Array(5)].map((_, index) => (
            <img key={index} src={getRandomRickImage()} alt={`Hack ${index + 1}`} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReusableAssetsTrackPage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  const reusableAssetsHacks = [
    {
      id: 1,
      title: "Cross-Platform UI Component Library",
      description: "Developed a comprehensive UI component library that can be easily integrated into various projects across different clients, improving development speed and consistency.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user5", name: "Eva Brown" },
        { id: "user6", name: "Michael Lee" },
      ],
      upvotes: 92
    },
    {
      id: 2,
      title: "Reusable Data Analytics Dashboard",
      description: "Created a customizable data analytics dashboard that can be adapted for various industries and client needs, providing instant insights and reducing implementation time.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
      collaborators: [
        { id: "user7", name: "Sarah Davis" },
        { id: "user8", name: "Tom Wilson" },
      ],
      upvotes: 87
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
          <h1 className="text-3xl font-bold mb-6 text-white">Reusable Assets Track Submissions</h1>
          <p className="text-gray-400 mb-8">Design for business! This track focuses on empowering creation of reusable assets between Luxoft clients. If you think that something you created that isn't a property of the client has potential for internal development - you're in the right place!</p>
          <div className="space-y-6">
            {reusableAssetsHacks.map(hack => (
              <HackEntry key={hack.id} hack={hack} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReusableAssetsTrackPage;