const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  organizerName:{
    type: String,
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
  attendees:[
    {email: {
      type: String
    },
    name: {
      type: String,
    },
    status: {
      type: String
    }}
  ],
  arrivalTime: {
    type: Date,
    required: false
  }
});

module.exports = Event = mongoose.model("event", EventSchema);