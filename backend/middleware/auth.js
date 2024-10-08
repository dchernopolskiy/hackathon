const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const config = require('../config');
const { User } = require('../models');

const options = {
  identityMetadata: config.microsoft.identityMetadata,
  clientID: config.microsoft.clientID,
  validateIssuer: config.microsoft.validateIssuer,
  passReqToCallback: config.microsoft.passReqToCallback,
  loggingLevel: 'info',
  scope: config.microsoft.scope
};

passport.use(new BearerStrategy(options, async (token, done) => {
  try {
    let user = await User.findOne({ email: token.preferred_username });
    if (!user) {
      user = new User({
        email: token.preferred_username,
        firstName: token.given_name,
        lastName: token.family_name
      });
      await user.save();
    }
    return done(null, user, token);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport.authenticate('oauth-bearer', { session: false });