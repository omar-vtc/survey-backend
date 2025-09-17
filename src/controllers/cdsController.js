const DataModel = require("../models/cdsSchema");

exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores, totalResult } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let userData = await DataModel.findOne({ phone });

    if (userData) {
      userData.answers = answers;
      userData.scores = scores;
      if (totalResult) userData.totalResult = totalResult; // update if provided
      await userData.save();

      return res.json({
        message: "Data updated successfully",
        data: userData,
      });
    }

    // Create new user
    const newUser = new DataModel({ phone, answers, scores, totalResult });
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

    const userWithUpdatedData = {
      ...userData.toObject(),
      name: "cds", // more descriptive than "Team Work"
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
