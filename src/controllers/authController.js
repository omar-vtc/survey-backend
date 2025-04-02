const Users = require("../models/UserRegisteration");

exports.register = async (req, res) => {
  const { name, phone, age, gender, job } = req.body;

  // Validate required fields
  if (!name || !phone || !age || !gender || !job) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user = await Users.findOne({ phone });
    if (user)
      return res.status(400).json({ message: "Phone number already exists" });

    user = new Users({
      name,
      phone,
      age,
      gender,
      job,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await Users.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ userId: user._id });
    user.isLoggedIn = true;
    await user.save();
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.token = null; // Remove token from the database
    await req.user.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json(req.user); // Send user details based on phone authentication
  } catch (error) {
    console.error("❌ Profile error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
