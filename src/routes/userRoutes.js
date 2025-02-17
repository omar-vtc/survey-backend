// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { UserSchema } = require("../models/UserSchema");
const mongoose = require("mongoose");

const User = mongoose.model("User", UserSchema);

// 📌 POST route to save user data
router.post("/call", async (req, res) => {
  console.log("Request received at /submit:", req.body);
  try {
    const userData = req.body;

    // Save user data to MongoDB
    const newUser = new User(userData);
    await newUser.save();

    res.json({ message: "Data saved successfully", res: req.body });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
