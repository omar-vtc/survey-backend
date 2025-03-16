const mongoose = require("mongoose");

const BigFiveSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    answers: {
      type: Map, // Allows storing key-value pairs dynamically
      of: Number, // Ensures the values are numbers
      required: true,
      default: {},
    },
    scores: {
      E: { type: Number, required: true },
      A: { type: Number, required: true },
      C: { type: Number, required: true },
      N: { type: Number, required: true },
      O: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const DataModel = mongoose.model("BigFiveData", BigFiveSchema);

module.exports = DataModel;
