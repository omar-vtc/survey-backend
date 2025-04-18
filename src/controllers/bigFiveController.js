const DataModel = require("../models/BigFiveSchema");

exports.addBigFiveAns = async (req, res) => {
  try {
    const { phone, answers, scores } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAnswers = answers.questions;
    // Find existing document by phone
    const existingUser = await DataModel.findOne({ phone });

    if (existingUser) {
      // Update existing user
      existingUser.answers = newAnswers;
      existingUser.scores = scores;
      await existingUser.save();
      return res.json({
        message: "Data updated successfully",
        data: existingUser,
      });
    }

    // Create a new document if user does not exist
    const newUser = new DataModel({ phone, newAnswers, scores });
    await newUser.save();

    res.status(201).json({ message: "Data saved successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBigFiveAns = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Find user by phone number
    let userData = await DataModel.findOne({ phone });

    if (!userData) {
      return res.json({ message: "No data found", data: {} });
    }

    // Convert Mongoose document to a plain object
    const userWithUpdatedData = userData.toObject();

    // Convert Map fields to plain objects
    if (userWithUpdatedData.answers instanceof Map) {
      userWithUpdatedData.answers = Object.fromEntries(
        userWithUpdatedData.answers
      );
    }

    if (userWithUpdatedData.scores instanceof Map) {
      userWithUpdatedData.scores = Object.fromEntries(
        userWithUpdatedData.scores
      );
    }

    userWithUpdatedData.name = userWithUpdatedData.name || "BigFive"; // Default to "MBTI" if not available

    res.json({
      message: "Data retrieved successfully",
      data: userWithUpdatedData,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
