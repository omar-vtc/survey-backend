const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  A: { type: [Number], required: true },
  B: { type: [Number], required: true },
  C: { type: [Number], required: true },
});

const ScoreSchema = new mongoose.Schema({
  A: { type: Number, required: true },
  B: { type: Number, required: true },
  C: { type: Number, required: true },
});

const DataSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  answers: { type: AnswerSchema, required: true },
  scores: { type: ScoreSchema, required: true },
});

const TeamWorkModel = mongoose.model("TeamWork", DataSchema);

module.exports = TeamWorkModel;
