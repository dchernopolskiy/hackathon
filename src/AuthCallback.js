import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store the token in localStorage or a secure storage method
      localStorage.setItem('authToken', token);
      setUser({ token }); // decode the token to get user info
      navigate('/hackathon');
    } else {
      navigate('/');
    }
  }, [location, navigate, setUser]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;

