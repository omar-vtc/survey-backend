const DataModel = require("../models/patternsSchema");

exports.addMachlanAns = async (req, res) => {
  try {
    const { phone, answers, scores } = req.body;

    if (!phone || !answers || !scores) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // upsert (create if not exists, update if exists)
    const updatedData = await DataModel.findOneAndUpdate(
      { phone },
      { answers, scores },
      { new: true, upsert: true } // return updated document & create if not exist
    );

    return res.json({
      message: "Data saved successfully",
      data: updatedData,
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

    // Add custom field
    const userWithUpdatedData = {
      ...userData.toObject(),
      name: "Team Work",
    };

    return res.json({
      message: "Data retrieved successfully",
      data: userWithUpdatedData,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
