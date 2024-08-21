import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import axios from 'axios';

const HackEntry = ({ hack }) => {
  const [upvotes, setUpvotes] = useState(hack.upvotes.length);

  const handleUpvote = async () => {
    try {
      await axios.post(`/api/hacks/${hack._id}/upvote`);
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error('Error upvoting hack:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{hack.title}</h2>
        <p className="text-gray-400 mb-4">{hack.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {hack.collaborators.map((collaborator) => (
            <Link 
              key={collaborator._id} 
              to={`/profile/${collaborator._id}`} 
              className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500 text-white hover:bg-purple-600 transition duration-300"
            >
              {collaborator.firstName} {collaborator.lastName}
            </Link>
          ))}
        </div>
        <button 
          onClick={handleUpvote}
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

const HackList = ({ trackId }) => {
  const [hacks, setHacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchHacks = async () => {
      setLoading(true);
      try {
        console.log(`HackList: Fetching hacks for track ${trackId}`);
        const url = `${BACKEND_URL}/api/hacks${trackId ? `?track=${trackId}` : ''}`;
        console.log('Fetching URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('HackList: Response received', data);
        setHacks(data);
        setError(null);
      } catch (err) {
        console.error('HackList: Error fetching hacks', err);
        setError(err.message || 'An error occurred while fetching hacks');
      } finally {
        setLoading(false);
      }
    };

    fetchHacks();
  }, [trackId]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (hacks.length === 0) {
    return <div className="text-white">No hacks found for this track.</div>;
  }

  return (
    <div className="space-y-6">
      {hacks.map(hack => (
        <HackEntry key={hack._id} hack={hack} />
      ))}
    </div>
  );
};

export default HackList;