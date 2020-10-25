const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pointsItem: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
