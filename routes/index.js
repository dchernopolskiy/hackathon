const express = require("express");
const router = express.Router();

const userRoutes = require("./api/users");
const hackRoutes = require("./api/hacks");

router.use("/users", userRoutes);
router.use("/hacks", hackRoutes);

module.exports = router;
