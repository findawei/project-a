const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: String,
    ref: 'users'
  },
  eventId:{
    type: Number,
    required: false
  },
  isOrganizer:{
    type: Boolean,
    required: false
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
  },
  endTime: {
    type: Date,
    required: false
  }
//   organizer: {
//       email: {
//         type: String,
//         ref: 'users'
//       },
//       name: {
//         type: String,
//         ref: 'users'
//     }
// }

})

module.exports = Event = mongoose.model("event", EventSchema);