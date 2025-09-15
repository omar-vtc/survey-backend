require("dotenv").config(); // Load environment variables from .env
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI; // Use environment variable for security
console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5s timeout
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
