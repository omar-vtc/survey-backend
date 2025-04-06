const mongoose = require("mongoose");

// Sub-schema for answers (possess and need values)
const answerSchema = new mongoose.Schema({
  possess: { type: Number, required: true },
  need: { type: Number, required: true },
});

// Main schema for the competency data
const CompetencySchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, // Ensuring phone is unique
  answers: {
    type: Map,
    of: {
      type: Map,
      of: {
        type: Map,
        of: answerSchema,
      }, // Default to empty Map if not provided
    },
  },
  scores: {
    type: Map,
    of: { type: Number, required: false },
  },
  totals: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Or another type like Object, depending on your needs
  },
});

// Model creation (if needed in future)
const Competency = mongoose.model("Competency", CompetencySchema);

module.exports = Competency;
