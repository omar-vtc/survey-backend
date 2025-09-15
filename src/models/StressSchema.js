const mongoose = require("mongoose");

// Schema for total score
const TotalScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
  },
  { _id: false }
);

// Schema for all scores
const ScoreSchema = new mongoose.Schema(
  {
    total: { type: TotalScoreSchema, required: true },
  },
  { _id: false }
);

// Final data schema
const DataSchema = new mongoose.Schema({
  phone: { type: String, required: true }, // allow empty string, remove unique if multiple allowed
  answers: {
    type: [Number],
    required: true,
    validate: {
      validator: (arr) => arr.every((num) => num >= 1 && num <= 5),
      message: "Each answer must be between 1 and 5",
    },
  },
  scores: { type: ScoreSchema, required: true },
  totalResult: {
    type: String,
    required: true,
    enum: [
      "High level of professional stress",
      "Moderate level of professional stress",
    ],
  },
});

const StressModel = mongoose.model("stress", DataSchema);

module.exports = StressModel;
