const express = require('express');
const passport = require('passport');
const router = express.Router();
const config = require('../../config');

router.get('/microsoft', passport.authenticate('azure-ad-oauth2'));

router.get('/microsoft/callback',
  passport.authenticate('azure-ad-oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    // Here, generate a JWT token or set up a session
    const token = generateToken(req.user); // Implement this function
    res.redirect(`${config.frontend.url}/auth-callback?token=${token}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(config.frontend.url);
});

module.exports = router;