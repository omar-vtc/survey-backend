const Users = require("../models/UserRegisteration");

const authenticateUser = async (req, res, next) => {
  try {
    const phone = req.headers["x-user-phone"]; // Get phone number from headers
    if (!phone)
      return res.status(401).json({ message: "Phone number required" });

    const user = await Users.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = authenticateUser;
