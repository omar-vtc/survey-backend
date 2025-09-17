const DataModel = require("../models/PersonalComptenecySchema");

// Add or update survey answers
exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure answers is an object
    if (typeof answers !== "object" || Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format" });
    }

    // Validate scores keys
    const expectedSkills = [
      "linguistic",
      "musical",
      "social",
      "personal",
      "bodily_kinesthetic",
      "logical_mathematical",
      "visual_spatial",
    ];

    for (const skill of expectedSkills) {
      if (
        !scores[skill] ||
        typeof scores[skill].score !== "number" ||
        !scores[skill].level
      ) {
        return res
          .status(400)
          .json({ message: `Invalid or missing score for ${skill}` });
      }
    }

    // Check if phone already exists
    let existingData = await DataModel.findOne({ phone });

    if (existingData) {
      existingData.answers = answers;
      existingData.scores = scores;
      await existingData.save();
      return res.json({
        message: "Data updated successfully",
        data: existingData,
      });
    }

    // Create new document
    const newUser = new DataModel({
      phone,
      answers: new Map(Object.entries(answers)), // Convert to Map if necessary
      scores,
    });
    await newUser.save();

    res.json({
      message: "Data saved successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve survey answers by phone
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

    // Convert Map back to object for answers if needed
    const answersObj = Object.fromEntries(userData.answers);

    const userWithUpdatedData = {
      ...userData.toObject(),
      answers: answersObj,
      name: "personal_Competency", // replace with dynamic name if needed
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
