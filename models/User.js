const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  // name: {
  //   type: String,
  //   required: false
  // },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  _id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  points:{
    type: Number,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
