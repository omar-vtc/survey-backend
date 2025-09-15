const mongoose = require("mongoose");

// Schema for a single answer (frequency + importance)
const AnswerSchema = new mongoose.Schema(
  {
    freq: { type: Number, required: true },
    imp: { type: Number, required: true },
  },
  { _id: false }
);

// Schema for answers keyed by question ID (as strings)
const AnswersSchema = new mongoose.Schema({}, { strict: false, _id: false });
// This allows dynamic keys like "1", "2", "3" each storing an AnswerSchema
AnswersSchema.add({ type: Map, of: AnswerSchema });

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
  answers: { type: Map, of: AnswerSchema, required: true }, // Map of questionId => AnswerSchema
  scores: { type: ScoreSchema, required: true },
});

const LeadershipModel = mongoose.model("Leadership", DataSchema);

module.exports = LeadershipModel;
