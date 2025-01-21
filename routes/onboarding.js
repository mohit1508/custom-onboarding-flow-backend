const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    res.status(200).json({
      current_step: user.current_step,
      user_data: {
        email: user.email,
        about_me: user.about_me,
        street_address: user.street_address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        birthdate: user.birthdate ? user.birthdate.split("T")[0] : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to log in user." });
  }
});

// Create a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = await User.createUser({ email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Update user's onboarding step
router.post("/step", async (req, res) => {
  const { email, step } = req.body;

  if (!email || !step || typeof step !== "number") {
    return res.status(400).json({ error: "Email and step are required." });
  }

  try {
    const updatedUser = await User.updateUser(email, { current_step: step });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update onboarding step." });
  }
});

// Get user's current onboarding step
router.get("/step/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ current_step: user.current_step });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's onboarding step." });
  }
});

// Update user's additional information (e.g., About Me, Address, Birthdate)
router.post("/update", async (req, res) => {
  const { email, about_me, street_address, city, state, zip, birthdate } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const updatedUser = await User.updateUser(email, {
      about_me,
      street_address,
      city,
      state,
      zip,
      birthdate,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user information." });
  }
});

module.exports = router;
