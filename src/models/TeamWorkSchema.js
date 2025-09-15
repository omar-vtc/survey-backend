const mongoose = require("mongoose");

// Schema for each section's answers (array of numbers)
const AnswerSectionSchema = new mongoose.Schema(
  {
    A: { type: [Number], required: true },
    B: { type: [Number], required: true },
    C: { type: [Number], required: true },
    D: { type: [Number], required: true },
    E: { type: [Number], required: true },
  },
  { _id: false }
);

// Schema for each section's score details
const ScoreDetailSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    level: { type: String, required: true, enum: ["Low", "High"] },
  },
  { _id: false }
);

// Schema for all scores grouped by section
const ScoreSchema = new mongoose.Schema(
  {
    A: { type: ScoreDetailSchema, required: true },
    B: { type: ScoreDetailSchema, required: true },
    C: { type: ScoreDetailSchema, required: true },
    D: { type: ScoreDetailSchema, required: true },
    E: { type: ScoreDetailSchema, required: true },
  },
  { _id: false }
);

// Final data schema
const DataSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  answers: { type: AnswerSectionSchema, required: true },
  scores: { type: ScoreSchema, required: true },
});

const TeamWorkModel = mongoose.model("TeamWork", DataSchema);

module.exports = TeamWorkModel;
