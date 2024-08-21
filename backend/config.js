require('dotenv').config();

module.exports = {
  // mongodb: {
  //   uri: process.env.MONGODB_URI || 'mongodburi',
  // },
  server: {
    port: process.env.PORT || 3001,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};