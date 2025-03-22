const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");

const UserRegisteration = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    job: { type: String, required: true },
    isLoggedIn: { type: Boolean, require: false, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
// UserRegisteration.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();s
// });

// // Compare entered password with stored hash
// UserRegisteration.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Generate a secure random token
// UserRegisteration.methods.generateToken = function () {
//   return crypto.randomBytes(32).toString("hex");
// };

const Users = mongoose.model("User-Registeration", UserRegisteration);
module.exports = Users;
