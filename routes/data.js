const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all user data
router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data." });
  }
});

module.exports = router;
