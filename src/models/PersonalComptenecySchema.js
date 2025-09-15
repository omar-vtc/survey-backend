// models/TeamWorkSchema.js
const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  level: { type: String, required: true },
});

const personalCompetencySchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    answers: {
      type: Map,
      of: Number,
      required: true,
    },
    scores: {
      linguistic: { type: scoreSchema, required: true },
      musical: { type: scoreSchema, required: true },
      social: { type: scoreSchema, required: true },
      personal: { type: scoreSchema, required: true },
      bodily_kinesthetic: { type: scoreSchema, required: true },
      logical_mathematical: { type: scoreSchema, required: true },
      visual_spatial: { type: scoreSchema, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Personal-competency",
  personalCompetencySchema
);
