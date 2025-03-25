const express = require("express");
const MBTIModel = require("../models/MBTISchema");

const router = express.Router();

router.post("/mbti", async (req, res) => {
  try {
    const { phone, MBTI, scores } = req.body;
    console.log("phone", phone);
    console.log(MBTI);
    console.log(scores);
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
});

module.exports = router;
