import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Briefcase, MapPin, Github, Twitter, Edit, ArrowLeft } from 'lucide-react';
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

const ProfilePage = () => {
  const [isTracksExpanded, setIsTracksExpanded] = useState(false);

  // Mock user data
  const user = {
    name: "Rick Astley",
    title: "Professional Singer & Hackathon Enthusiast",
    email: "rick.astley@example.com",
    location: "Newton-le-Willows, England",
    bio: "Never gonna give you up, never gonna let you down. Always passionate about creating innovative solutions and contributing to open-source projects. You know the rules, and so do I!",
    github: "rickastley",
    twitter: "rickastley",
    skills: ["Singing", "Dancing", "JavaScript", "React", "Node.js", "Python", "GraphQL", "Docker"],
    achievements: [
      "Winner of Hackathon 2023: 'Never Gonna Give You Up' Edition",
      "Open Source Contributor of the Year 2022: RickRoll.js",
      "5x Certified Cloud Architect (and 1980s Pop Icon)"
    ]
  };

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
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={getRandomRickImage()} alt="Rick Astley" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                    <p className="text-purple-400 text-xl mb-4">{user.title}</p>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                <div className="text-gray-300 mb-4">{user.bio}</div>
                <div className="flex flex-wrap items-center text-sm text-gray-400">
                  <div className="flex items-center mr-4 mb-2">
                    <Mail size={16} className="mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <MapPin size={16} className="mr-2" />
                    {user.location}
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Github size={16} className="mr-2" />
                    <a href={`https://github.com/${user.github}`} className="hover:text-purple-400 transition duration-300">
                      {user.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-8 py-6">
              <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
              <ul className="list-disc list-inside text-gray-300">
                {user.achievements.map((achievement, index) => (
                  <li key={index} className="mb-2">{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;