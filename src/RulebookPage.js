import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Book, FileText, Video } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';

const RuleSection = ({ title, children, icon: Icon }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
      <Icon className="mr-2 text-purple-400" size={24} />
      {title}
    </h2>
    {children}
  </div>
);

const RulebookPage = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-white flex items-center">
            <Book className="mr-2 text-purple-400" size={32} />
            Hackathon Rules and Guidelines
          </h1>
          
          <RuleSection title="General Rules" icon={FileText}>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Be civil and respectful to all participants.</li>
              <li>Use appropriate language and content in all communications.</li>
              <li>Do not share harmful or inappropriate links.</li>
              <li>Harassment or abuse of any kind will not be tolerated.</li>
              <li>No spam or self-promotion without permission from Hackathon staff.</li>
              <li>Adhere to the submission rules posted in the designated area.</li>
              <li>Report any concerns or issues to the Hackathon staff immediately.</li>
            </ol>
          </RuleSection>

          <RuleSection title="Submission Guidelines" icon={FileText}>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Inspiration: Describe what inspired your project.</li>
              <li>Project Purpose: Explain what issue your project addresses.</li>
              <li>Implementation: Detail the technologies used and deployment process.</li>
              <li>Challenges: Discuss obstacles encountered during development.</li>
              <li>Learnings: Share new skills or knowledge gained.</li>
              <li>Future Plans: Outline potential future developments for your project.</li>
            </ol>
          </RuleSection>

          <RuleSection title="Demo Guidelines" icon={Video}>
            <ul className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Demos should be approximately 3 minutes long.</li>
              <li>Include in your demo:
                <ol className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>Your team name</li>
                  <li>The challenge(s) you're addressing</li>
                  <li>How your project tackles the challenge</li>
                  <li>Technologies used (languages, platforms, APIs, hardware, etc.)</li>
                  <li>Unique aspects you're proud of</li>
                  <li>A video demo ≤ 3 minutes showcasing your project's features</li>
                </ol>
              </li>
              <li>Engage the judges by including a link to try out your project if applicable.</li>
              <li>Focus on demonstrating your project in action rather than relying heavily on PowerPoint presentations.</li>
            </ul>
          </RuleSection>
        </main>
      </div>
    </div>
  );
};

export default RulebookPage;