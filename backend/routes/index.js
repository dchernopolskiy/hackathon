const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
const hackRoutes = require('./api/hacks');
const authRoutes = require('./api/auth');

router.use('/users', userRoutes);
router.use('/hacks', hackRoutes);
router.use('/auth', authRoutes);

module.exports = router;
