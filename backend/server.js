const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');
const config = require('./config');

const app = express();

require('./memoryManagement');

// CORS configuration
app.use(cors({
  origin: 'https://luxhack.netlify.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query Params:', JSON.stringify(req.query, null, 2));
  next();
});

app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = config.server.port || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();