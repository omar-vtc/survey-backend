const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Users = require("../models/UserRegisteration");
const authenticateUser = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

// 📌 Register User (Sign Up)
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    age,
    gender,
    birthday,
    job,
    nationality,
    education,
    maritalStatus,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !age ||
    !gender ||
    !birthday ||
    !job ||
    !nationality ||
    !education ||
    !maritalStatus
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user = await Users.findOne({ phone });
    if (user)
      return res.status(400).json({ message: "Phone number already exists" });

    user = new Users({
      name,
      email,
      phone,
      password,
      age,
      gender,
      birthday,
      job,
      nationality,
      education,
      maritalStatus,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Login User (Sign In)
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await Users.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a secure random token
    const token = user.generateToken();
    user.token = token;
    await user.save();

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Logout User
router.post("/logout", authenticateUser, async (req, res) => {
  try {
    req.user.token = null; // Remove token from the database
    await req.user.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Protected Route Example (Profile)
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("❌ Profile error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
