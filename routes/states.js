const express = require("express");
const router = express.Router();
const States = require("../models/States"); // Import the States model

// Fetch all states
router.get("/", async (req, res) => {
  try {
    const states = await States.getAllStates();
    res.status(200).json(states);
  } catch (err) {
    console.error("Error fetching states:", err);
    res.status(500).json({ error: "Failed to fetch states." });
  }
});

module.exports = router;