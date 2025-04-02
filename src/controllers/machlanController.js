const DataModel = require("../models/DataModel");

exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingData = await DataModel.findOne({ phone });
    if (existingData) {
      existingData.answers = answers;
      existingData.scores = scores;
      await existingData.save();
      return res.json({
        message: "Data updated successfully",
        data: existingData,
      });
    }

    const newUser = new DataModel({ phone, answers, scores });
    await newUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMachlanAns = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Find user by phone number
    const userData = await DataModel.findOne({ phone });

    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    const userWithUpdatedData = {
      ...userData.toObject(), // Convert Mongoose document to plain object
      name: "Maslach", // Replace with dynamic name if available
    };

    res.json({
      message: "Data retrieved successfully",
      data: userWithUpdatedData,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
