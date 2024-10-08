import React from 'react';

const MicrosoftLoginButton = () => {
  const handleLogin = () => {
    // Redirect to the backend auth route
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/microsoft`;
  };

  return (
    <button 
      onClick={handleLogin}
      className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition duration-300 inline-flex items-center"
    >
      Register Now / Sign In
      <ChevronRight className="ml-2" size={20} />
    </button>
  );
};

export default MicrosoftLoginButton;