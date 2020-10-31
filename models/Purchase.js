const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PurchaseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  item:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  },
  name:{
    type: String,
    ref: 'items'
  },
  date:{
    type: Date,
    default: Date.now
  },
  pointsItem:{
    type: Number,
    ref: 'items'
  }
});

module.exports = Purchase = mongoose.model("purchases", PurchaseSchema);
