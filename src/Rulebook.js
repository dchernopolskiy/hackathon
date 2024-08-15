import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import LeftNavigationPane from './LeftNavigationPane';

const Rulebook = () => {
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
        <LeftNavigationPane isTracksExpanded={isTracksExpanded} setIsTracksExpanded={setIsTracksExpanded} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Hackathon Rules</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Please be civil and respectful to all people.</li>
              <li>Please do not use inappropriate language/send inappropriate picture, gifs, videos, etc.</li>
              <li>Please do not send inappropriate links or anything harmful.</li>
              <li>Any harassment or abuse of any kind will not be tolerated.</li>
              <li>No spam or self-promotion (server invites, advertisements, etc) without permission from a Hackathon staff member.</li>
              <li>Please adhere to the submission rules posted on the %place%</li>
              <li>If something/someone is bothering you, please report it immediately</li>
            </ol>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Submission Suggestion</h2>
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Inspiration! - What have We/I been inspired by</li>
              <li>What it does? - Our/my project addresses X issue</li>
              <li>How did we/I build it? - Describe the technologies and how it was deployed</li>
              <li>Challenges we/I ran into! - I haven't coded in 64 years and this project had brought me joy.</li>
              <li>What we/I learned? - How to code, etc</li>
              <li>What we/I are hoping for future of this project? - Development into a product, usage by people within the company, submitting for fun, etc</li>
            </ol>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">How Demos Work</h2>
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <ol className="text-white list-inside space-y-4 text-gray-300">
              <li>Demos should be around 3 minutes long</li>
              <li>Things your demo should include: the quick version of your submission write-up:</li>
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li>Your team name,</li>
                <li>What challenge(s) you’re responding to,</li>
                <li>How your project addresses the challenge,</li>
                <li>What technologies (languages, platforms, APIs, hardware, sponsored tools, etc.) you used,</li>
                <li>anything else you’re super proud about!,</li>
                <li>a video demo ≤ 3 minutes long showcasing the features of your project</li>
              </ol>
              <li>The best demos are the ones that engage the judges - so be sure to include a link to try out you app/project/hack if applicable while you explain to them how it works in your video and why it’s cool as heck. // PowerPoints aren’t forbidden but the best demos rely on showing off your project in action!</li>
            </ol>
          </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rulebook;