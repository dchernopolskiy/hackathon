require('dotenv').config();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://hackadmin:hackadmin@hackathon.yey40.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon',
  },
  server: {
    port: process.env.PORT || 6000,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  microsoft: {
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    tenantID: process.env.MICROSOFT_TENANT_ID,
    identityMetadata: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0/.well-known/openid-configuration`,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.MICROSOFT_REDIRECT_URL || 'http://localhost:6000/api/auth/microsoft/callback',
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
    passReqToCallback: false,
    scope: ['profile', 'email', 'openid']
    // allowedDomain: process.env.ALLOWED_DOMAIN || 'yourdomain.com',

  },
  session: {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }
};