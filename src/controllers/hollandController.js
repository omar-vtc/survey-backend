const DataModel = require("../models/HollandSchema");

exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores, totalResult } = req.body;

    if (!phone || !answers || !scores || !totalResult) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingData = await DataModel.findOne({ phone });
    if (existingData) {
      existingData.answers = answers;
      existingData.scores = scores;
      existingData.totalResult = totalResult;
      await existingData.save();
      return res.json({
        message: "Data updated successfully",
        data: existingData,
      });
    }

    const newUser = new DataModel({ phone, answers, scores, totalResult });
    await newUser.save();

    return res.json({
      message: "Data saved successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Error saving data:", error);
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
      return res.json({ message: "No data found", data: {} });
    }

    const userWithUpdatedData = {
      ...userData.toObject(), // Convert Mongoose doc to plain object
      name: "Team Work", // Placeholder, can make dynamic if needed
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
