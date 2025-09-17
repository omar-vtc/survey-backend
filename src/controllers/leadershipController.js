const DataModel = require("../models/LeadershipSchema");

exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert answers object to Map for Mongoose
    const answersMap = new Map(Object.entries(answers));

    // Check if data already exists
    const existingData = await DataModel.findOne({ phone });
    if (existingData) {
      existingData.answers = answersMap;
      existingData.scores = scores;
      await existingData.save();
      return res.json({
        message: "Data updated successfully",
        data: existingData,
      });
    }

    const newData = new DataModel({ phone, answers: answersMap, scores });
    await newData.save();

    res.status(201).json({
      message: "Data saved successfully",
      data: newData,
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

    const userData = await DataModel.findOne({ phone });

    if (!userData) {
      return res.json({ message: "No data found", data: {} });
    }

    // Convert Mongoose Map back to plain object
    const answersObj = Object.fromEntries(userData.answers);

    const response = {
      ...userData.toObject(),
      answers: answersObj,
      name: "leadership", // replace with dynamic name if needed
    };

    res.json({
      message: "Data retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
