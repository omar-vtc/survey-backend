const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db"); // Import the MongoDB connection function
const { UserSchema } = require("./models/UserSchema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// 📌 Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Database connection established"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// 📌 Define User Model
const User = mongoose.model("User", UserSchema);

app.get("/", async (req, res) => {
  console.log("hello");
});

// 📌 API to Save User Data (without Word file generation)
app.post("/submit", async (req, res) => {
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

// 📌 Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
