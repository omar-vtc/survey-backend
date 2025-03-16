const Users = require("../models/UserRegisteration");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const user = await Users.findOne({ token });
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = authenticateUser;
