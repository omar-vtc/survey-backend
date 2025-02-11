const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  birthday: String,
  job: String,
  nationality: String,
  education: String,
  maritalStatus: String,
  scoresWithInterpretations: Object, // Store survey responses
});
module.exports = { UserSchema };
