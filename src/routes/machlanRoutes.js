const express = require("express");
const DataModel = require("../models/DataModel");

const router = express.Router();

router.post("/machlan", async (req, res) => {
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
});

module.exports = router;
