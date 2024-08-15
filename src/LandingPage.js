import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BarChart2, Zap, ChevronRight } from 'lucide-react';

const Header = () => (
  <header className="bg-gray-900 text-white py-4">
    <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold">US Hackathon 2024</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-purple-400 transition duration-300">About</a></li>
          <li><a href="#tracks" className="hover:text-purple-400 transition duration-300">Tracks</a></li>
          <li><a href="#judges" className="hover:text-purple-400 transition duration-300">Judges</a></li>
          <li><a href="#contact" className="hover:text-purple-400 transition duration-300">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section className="bg-gray-900 text-white py-20">
    <div className="container mx-auto text-center px-4">
      <h2 className="text-5xl font-bold mb-4">US Hackathon 2024</h2>
      <p className="text-xl mb-8 text-gray-400">Join us for 48 hours of innovation, collaboration, and coding!</p>
      <Link to="/register" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition duration-300 inline-flex items-center">
        Register Now
        <ChevronRight className="ml-2" size={20} />
      </Link>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <Icon className="text-purple-500 w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features = () => (
  <section className="py-16 bg-gray-900">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Participate?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Code}
          title="Learn & Build"
          description="Gain hands-on experience with cutting-edge technologies and build innovative projects."
        />
        <FeatureCard 
          icon={BarChart2}
          title="Network"
          description="Connect with like-minded individuals, industry experts, and potential employers."
        />
        <FeatureCard 
          icon={Zap}
          title="Win Prizes"
          description="Showcase your skills and win amazing prizes, including internships and job opportunities."
        />
      </div>
    </div>
  </section>
);

const CategoryCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg text-center">
    <Icon className="text-purple-500 w-16 h-16 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Categories = () => (
  <section className="py-16 bg-gray-900" id="tracks">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4 text-white">The Tracks</h2>
      <p className="text-center mb-12 text-gray-400">Select a prompt from any one of the following tracks. The prompts will be released for each track on the day of the event.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard 
          icon={Code}
          title="Classic Track"
          description="Get a chance to focus on crafting a new experience. This could be a feature in an app, a useful hack for daily use, or an entirely new product!"
        />
        <CategoryCard 
          icon={BarChart2}
          title="Reusable Assets"
          description="Design for business! This track focuses on empowering creation of reusable assets between Luxoft clients. If you think that something you created that isn't a property of the client has potential for internal development - you're in the right place!"
        />
        <CategoryCard 
          icon={Zap}
          title="AI & Automation Track"
          description="Harness the power of artificial intelligence and automation to solve complex problems. And remember, cake is a lie."
        />
      </div>
    </div>
  </section>
);

const JudgeCard = ({ name, title, imageUrl }) => (
  <div className="text-center">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500" />
    <h3 className="text-lg font-semibold text-white">{name}</h3>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
);

const Judges = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">The Judges</h2>
      <p className="text-center mb-12">While main winners will be determined by democratic voting, our Judges will make a "Judges pick" for each track!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <JudgeCard 
          name="Ana Amari"
          title="Professor Emeritus"
          imageUrl="https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812757c205e1b4568bc321772096ed86.png"
        />
        <JudgeCard 
          name="Song Hana"
          title="Staff Designer"
          imageUrl="https://i.pinimg.com/736x/ca/c0/56/cac0561cd9336e8be40bee362afd6fef.jpg"
        />
        <JudgeCard 
          name="Shimada Genji"
          title="Engineering Lead, Account"
          imageUrl="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png"
        />
        <JudgeCard 
          name="Shimada Hanzo"
          title="Domain Chapter Lead"
          imageUrl="https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png"
        />
        <JudgeCard 
          name="Jamison Fawkes"
          title="Cleaning Manager"
          imageUrl="https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt5b92f99663062448/637da17932db130e11be7e29/junkrat-01.jpg"
        />
        <JudgeCard 
          name="Angela Ziegler"
          title="HR Head"
          imageUrl="https://storage.moemate.io/dcf7558114466cc55ce9403100678366f93766f4/-1503603350614.webp"
        />
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="bg-purple-600 text-white py-16">
    <div className="container mx-auto text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Ready to hack?</h2>
      <p className="text-xl mb-8">Join us for an unforgettable experience of innovation and collaboration.</p>
      <Link to="/register" className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center">
        Register Now
        <ChevronRight className="ml-2" size={20} />
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto text-center px-4">
      <p>&copy; 2024 US Hackathon. All rights reserved.</p>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Categories />
        <Judges />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;