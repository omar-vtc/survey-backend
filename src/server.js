const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db"); // Import the MongoDB connection function
const { UserSchema } = require("./models/UserSchema");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import routes
const authRoutes = require("./routes/authRoutes");
const bigFiveRoutes = require("./routes/bigFiveRoutes");
const MBTIRoutes = require("./routes/MBTIRoutes");
const machlanRoutes = require("./routes/machlanRoutes");

require("dotenv").config();

const app = express();
app.set("trust proxy", 1); // Add this line here
app.use(express.json());
const corsOptions = {
  origin: "*", // allow all domains (or specify a specific domain)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow the necessary methods
};
app.use(cors(corsOptions));
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
  res.send("Server is running");
});

app.use("/api/auth", authRoutes); //registeration route
app.use("/api/users", userRoutes); // Prefix '/api/users' for all user-related routes
app.use("/api", bigFiveRoutes); // Mount the routes
app.use("/api", MBTIRoutes);
app.use("/api", machlanRoutes);

// 📌 Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
