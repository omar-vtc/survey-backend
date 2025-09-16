// models/PatternsSchema.js
const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({}, { strict: false });

const ScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    level: {
      type: String,
      enum: ["Strong", "Needs Improvement"],
      required: true,
    },
  },
  { _id: false }
);

const PatternsSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    answers: {
      type: Map,
      of: Number, // s1-A : 2, s2-B : 3
      required: true,
    },
    scores: {
      type: Map,
      of: ScoreSchema, // التوجيه : { score, level }
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patterns", PatternsSchema);
