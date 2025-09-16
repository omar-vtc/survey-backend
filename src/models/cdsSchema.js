const mongoose = require("mongoose");

const scoreCategorySchema = new mongoose.Schema({
  score: { type: Number, required: true },
  level: {
    type: String,
    enum: ["Strong", "Needs Improvement"],
    required: true,
  },
});

const teamWorkSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    answers: {
      type: [Number], // Array of numbers (1–5)
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length === 40,
        message: "Answers must contain 40 values.",
      },
    },
    scores: {
      "النقد الذاتي": scoreCategorySchema,
      "لوم الذات": scoreCategorySchema,
      العجز: scoreCategorySchema,
      اليأس: scoreCategorySchema,
      "الانشغال بالخطر": scoreCategorySchema,
    },
    totalResult: {
      type: String,
      default: "تم حساب النتائج",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cds", teamWorkSchema);
