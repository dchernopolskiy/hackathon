import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebugPanel = () => {
  const [corsInfo, setCorsInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://hackathon-1-6kpk.onrender.com/hacks';

  const performCorsChecks = async () => {
    setLoading(true);
    setError(null);
    const checks = {};

    try {
      // Simple GET request
      const getResponse = await axios.get(API_URL);
      checks.getRequest = {
        status: getResponse.status,
        corsHeaders: {
          'Access-Control-Allow-Origin': getResponse.headers['access-control-allow-origin'],
          'Access-Control-Allow-Methods': getResponse.headers['access-control-allow-methods'],
          'Access-Control-Allow-Headers': getResponse.headers['access-control-allow-headers'],
        }
      };
    } catch (err) {
      checks.getRequest = { error: err.message };
    }

    try {
      // OPTIONS request to check preflight
      const optionsResponse = await axios.options(API_URL);
      checks.optionsRequest = {
        status: optionsResponse.status,
        corsHeaders: {
          'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
          'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
          'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers'],
        }
      };
    } catch (err) {
      checks.optionsRequest = { error: err.message };
    }

    try {
      // POST request to check if it's allowed
      const postResponse = await axios.post(API_URL, { test: 'data' });
      checks.postRequest = {
        status: postResponse.status,
        corsHeaders: {
          'Access-Control-Allow-Origin': postResponse.headers['access-control-allow-origin'],
          'Access-Control-Allow-Methods': postResponse.headers['access-control-allow-methods'],
          'Access-Control-Allow-Headers': postResponse.headers['access-control-allow-headers'],
        }
      };
    } catch (err) {
      checks.postRequest = { error: err.message };
    }

    // Check if credentials are allowed
    try {
      const credentialsResponse = await axios.get(API_URL, { withCredentials: true });
      checks.credentialsAllowed = credentialsResponse.headers['access-control-allow-credentials'] === 'true';
    } catch (err) {
      checks.credentialsAllowed = { error: err.message };
    }

    setCorsInfo(checks);
    setLoading(false);
  };

  useEffect(() => {
    performCorsChecks();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm overflow-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">CORS Debug Panel</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h3 className="text-xl font-semibold mb-2">CORS Checks:</h3>
          <pre className="bg-gray-700 p-2 rounded overflow-x-auto text-xs">
            {JSON.stringify(corsInfo, null, 2)}
          </pre>
        </div>
      )}
      <button
        onClick={performCorsChecks}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        Refresh CORS Checks
      </button>
    </div>
  );
};

export default DebugPanel;