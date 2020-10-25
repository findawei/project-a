const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Event = require('../../models/Event');
const User = require('../../models/User');
// const format = require("date-fns");
var sender = require('../../email/mailer');
// @route   GET api/events/
// @desc    Get all events for a specific user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
  const events = await Event.find({user: req.user.id}).sort({
    date: -1,});
  if (!events) throw Error('No items');
  res.status(200).json(events);
} catch (e) {
  res.status(400).json({ msg: e.message });
}
});

// @route   GET api/events/invites
// @desc    Get all events for a specific user
// @access  Private
router.get('/invites', auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.id)
  const useremail = user.email
  // Get the current user email and search for all events that have email in attendees
  const events = await Event.find({"attendees.email": useremail, "isOrganizer": true, "attendees.status" : {$exists: false}}).sort({
    date: -1,});
  if (!events) throw Error('No items');
  res.status(200).json(events);
} catch (e) {
  res.status(400).json({ msg: e.message });
}
});

// @route   get api/events/:id
// @desc    get specific event
// @access  Private
router.get('/:id', auth, (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event));
});

// @route   POST api/events/
// @desc    POST event
// @access  Private
router.post('/', auth, async (req, res) => {
  const {title, location, dateStart, dateEnd,
    attendees
  } = req.body

  if (!title) {
    return res.status(400).json({ msg: 'Please enter a title' });
  }
  try{ 
    //Save event for organizer

    var eightdigitrandom = Math.floor(10000000 + Math.random() * 90000000);

    const user = await User.findById(req.user.id).select('-password');
    const newEvent = new Event({
        title,
        location,
        eventId: eightdigitrandom,
        dateStart,
        dateEnd,
        isOrganizer: true,
        user: req.user.id,
        organizer: {email: user.email, name: user.name},
        attendees:  attendees.map(x => ({
          email: x.email,
          name: x.name,
          status: x.status,
        })),
    });
    
    const email = attendees.map((a) => (a.email));
    //Registered users
    const attendeesFound = await User.find({email},{_id: 1, email: 1});
    const Registered = attendeesFound.map((a) => (a.email));
    
    //Send email to non registered users
    var notRegistered = email.filter(value => !Registered.includes(value));
    // if (notRegistered.length){
      notRegistered.forEach((element)=>{
      //Pull data for email
      var data = {
        //name of the email template that we will be using
        templateName: "newuser_invite",
        //sender's and receiver's email
        sender: "info@tardyapp.com",
        receiver: element,   
        //name of the user
        organizerName: user.name,
        title: title,
        location: location,
        dateStart: dateStart,
        dateEnd: dateEnd
          // {attendees:  attendees.map(x => ({
          //   email: x.email,
          //   name: x.name,
          //   status: x.status,
          // }))}
     };
     //pass the data object to send the email
     sender.sendEmail(data);
      })
    const event = await newEvent.save();
    if (!event) throw Error('Something went wrong saving the event');
    res.status(200).json(event);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
});

// @route   POST api/events/response
// @desc    POST event
// @access  Private
router.post('/response', auth, async (req, res) => {
  const {title, location, dateStart, dateEnd,
    attendees, eventId, organizer
  } = req.body

  // if (!title) {
  //   return res.status(400).json({ msg: 'Please enter a title' });
  // }
  try{ 
    //Save event for attendee
    const user = await User.findById(req.user.id).select('-password');
    const newEvent = new Event({
      title,
      location,
      eventId,
      dateStart,
      dateEnd,
      isOrganizer: false,
      user: req.user.id,
      organizer,
      attendees:  attendees.map(x => ({
        email: x.email,
        name: x.name,
        status: x.status,
      })),
  });    
    const event = await newEvent.save();
    if (!event) throw Error('Something went wrong saving the event');
    
    const useremail = user.email
    
    // Update status of original event
    const originalEvent = await Event.findOneAndUpdate({eventId: eventId, "isOrganizer": true, 
    "attendees": {$elemMatch: {email: useremail}}
  },
    { $set: { "attendees.$.status": "accepted"} }
      )
    
    res.status(200).json(event)
  
  } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
});

// @route    DELETE api/events/attendee/:att_id
// @desc     Delete attendee from event
// @access   Private

router.delete('/:id/:att_id', auth, async (req, res) => {
  try {
    // const foundEvent = await Event.findOne({event: req.event.id});

    const foundEvent = await Event.findById(req.event.id);

    foundEvent.attendees = foundEvent.attendees.filter(
      (att) => att._id.toString() !== req.params.att_id
    );
    await foundEvent.save();
    
    return res.status(200).json(foundEvent);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false })
  }
});

// @route   PUT api/events/:id
// @desc    Update specific event
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try{ 
    const updateEvent = await 
  Event.findOneAndUpdate({_id: req.params.id}, {
      title: req.body.title,
      location: req.body.location,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      attendees: req.body.attendees
    },{new: true});
    return res.status(200).json(updateEvent);
  } catch(e){
    res.status(400).json({ msg: e.message, success: false })
    }
  });
  
//UPDATE arrivalTime
// @route   PUT api/events/log/:id
// @desc    Update specific
// @access  Private
router.put('/log/:id', auth, async (req, res) => {
  Event.findOneAndUpdate({_id: req.params.id}, {
    arrivalTime: req.body.arrivalTime,
  },{new: true}, (error, event) => {
    if (error) {
      throw Error('Could not log event.')
    } else {
      res.json(event)
      // console.log(event)
    }
  })
})
// @route   DELETE api/events/:id
// @desc    DELETE events
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {  
  const event = await Event.findById(req.params.id);
  if (!event) throw Error('No event found');

  const removed = await event.remove();
  if (!removed)
    throw Error('Something went wrong while trying to delete the event');
  res.status(200).json({ success: true });
} catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
});

module.exports = router;
