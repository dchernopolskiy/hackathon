require('dotenv').config();

module.exports = {
  // mongodb: {
  //   uri: process.env.MONGODB_URI || 'mongodburi',
  // },
  server: {
    port: process.env.PORT || 5000,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'https://luxhack.netlify.app',
  },
};