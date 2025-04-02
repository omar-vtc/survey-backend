const express = require("express");
const DataModel = require("../models/BigFiveSchema");
const bigFiveController = require("../controllers/bigFiveController");

const router = express.Router();

// Store or update user data
// router.post("/bigfive", async (req, res) => {
//   try {
//     const { phone, answers, scores } = req.body;

//     if (!phone || !answers || !scores) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newAnswers = answers.questions;
//     console.log("newAnswers => ", newAnswers);
//     // Find existing document by phone
//     const existingUser = await DataModel.findOne({ phone });

//     if (existingUser) {
//       // Update existing user
//       existingUser.answers = newAnswers;
//       existingUser.scores = scores;
//       await existingUser.save();
//       return res.json({
//         message: "Data updated successfully",
//         data: existingUser,
//       });
//     }

//     // Create a new document if user does not exist
//     const newUser = new DataModel({ phone, newAnswers, scores });
//     await newUser.save();

//     res.status(201).json({ message: "Data saved successfully", data: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.route("/bigfive").post(bigFiveController.addBigFiveAns);

module.exports = router;
