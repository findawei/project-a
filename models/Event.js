const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  attendee: {
    type: String,
    required: false
  },
  arrivalTime: {
    type: Date,
    required: false
  }
});

module.exports = Event = mongoose.model("event", EventSchema);