const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // Import the Admin model

// Get the current page configuration
router.get("/config", async (req, res) => {
  try {
    const config = await Admin.getPageConfig();
    res.status(200).json(config);
  } catch (err) {
    console.error("Error fetching page config:", err);
    res.status(500).json({ error: "Failed to fetch page configuration." });
  }
});

// Update the page configuration
router.post("/config", async (req, res) => {
  const { page, components } = req.body;

  if (!page || !Array.isArray(components) || components.length === 0) {
    return res.status(400).json({ error: "Invalid request format." });
  }

  if (page < 2 || page > 3) {
    return res.status(400).json({ error: "Page must be 2 or 3." });
  }

  try {
    await Admin.updatePageConfig(page, components);
    const updatedConfig = await Admin.getPageConfig();
    res.status(200).json({
      message: "Configuration updated successfully.",
      pageConfig: updatedConfig,
    });
  } catch (err) {
    console.error("Error updating page config:", err);
    res.status(500).json({ error: "Failed to update page configuration." });
  }
});

module.exports = router;
