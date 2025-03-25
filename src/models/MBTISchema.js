const mongoose = require("mongoose");

const mbtiSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  MBTI: {
    type: Map,
    of: {
      A: { type: Number, required: true },
      B: { type: Number, required: true },
    },
  },
  scores: {
    type: Map,
    of: Number, // Accepts dynamic keys with number values (e.g., { "E": 7, "S": 12 })
  },
});

const MBTIModel = mongoose.model("MBTI", mbtiSchema);

module.exports = MBTIModel;
