const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Users = require("../models/UserRegisteration");
const router = express.Router();

// 📌 Register User (Sign Up)
router.post("/register", async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);

  try {
    let user = await Users.findOne({ phone });
    if (user)
      return res.status(400).json({ message: "Phone number already exists" });

    user = new Users({ phone, password });
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
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Logout User
router.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const user = await Users.findOne({ token });
    if (!user) return res.status(401).json({ message: "Invalid token" });

    user.token = null; // Remove token from the database
    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 📌 Protected Route Example
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const user = await Users.findOne({ token }).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
