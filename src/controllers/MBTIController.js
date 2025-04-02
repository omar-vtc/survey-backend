const MBTIModel = require("../models/MBTISchema");

exports.addMBTIAns = async (req, res) => {
  try {
    const { phone, MBTI, scores } = req.body;
    if (!phone || !MBTI || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await MBTIModel.findOne({ phone });
    if (existingUser) {
      existingUser.MBTI = MBTI;
      existingUser.scores = scores;
      await existingUser.save();
      return res.json({
        message: "Data updated successfully",
        data: existingUser,
      });
    }

    const newData = new MBTIModel({ phone, MBTI, scores });
    await newData.save();
    res.status(201).json({ message: "Data saved successfully", data: newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMBTIAns = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Find user by phone number
    const userData = await MBTIModel.findOne({ phone });

    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.json({ message: "Data retrieved successfully", data: userData });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
