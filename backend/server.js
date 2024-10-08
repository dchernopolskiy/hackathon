const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');
const config = require('./config');
const passport = require('passport');
const session = require('express-session');

const app = express();

require('./memoryManagement');

// CORS configuration
app.use(cors({ origin: config.frontend.url, credentials: true }));

// Session configuration
app.use(session(config.session));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

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

const PORT = config.server.port;

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
