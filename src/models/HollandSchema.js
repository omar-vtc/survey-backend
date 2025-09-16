const mongoose = require("mongoose");

// Schema for each score detail
const ScoreDetailSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    level: {
      type: String,
      required: true,
      enum: ["Low", "Needs Improvement", "Strong"], // updated to your levels
    },
  },
  { _id: false }
);

// Final schema
const DataSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  answers: { type: [Number], required: true }, // flat array of answers
  scores: {
    type: Map,
    of: ScoreDetailSchema, // allows dynamic keys like "النمط واقعي"
    required: true,
  },
  totalResult: { type: String, required: true },
});

const HollandModal = mongoose.model("Holland", DataSchema);

module.exports = HollandModal;
