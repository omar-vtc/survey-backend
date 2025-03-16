const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserRegisteration = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    birthday: { type: Date, required: true },
    job: { type: String, required: true },
    nationality: { type: String, required: true },
    education: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    token: { type: String, default: null }, // Store the authentication token
  },
  { timestamps: true }
);

// Hash password before saving
UserRegisteration.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
UserRegisteration.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a secure random token
UserRegisteration.methods.generateToken = function () {
  return crypto.randomBytes(32).toString("hex");
};

const Users = mongoose.model("User-Registeration", UserRegisteration);
module.exports = Users;
