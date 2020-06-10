const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Event = require('../../models/Event');
const User = require('../../models/User');

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
  const {title, location, dateStart, dateEnd, attendee} = req.body

  try{  
    const attendeeRegistered = await User.findOne({ email });
    if(!attendeeRegistered) throw Error('User doesnt exist');

    const newEvent = new Event({
        title,
        location,
        dateStart,
        dateEnd,
        attendee, 
        user: req.user.id
    });

    const event = await newEvent.save();
    if (!event) throw Error('Something went wrong saving the event');

    res.status(200).json(event);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message });
}
});
// @route   PUT api/events/:id
// @desc    Update specific event
// @access  Private
router.put('/:id', auth, async (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, {
      title: req.body.title,
      location: req.body.location,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      attendee: req.body.attendee
    },{new: true}, (error, event) => {
      if (error) {
        return next(error)
      } else {
        res.json(event)
        // console.log(event)
      }
    })
  })
//UPDATE arrivalTime
// @route   PUT api/events/:id
// @desc    Update specific
// @access  Private
router.put('/log/:id', auth, async (req, res) => {
  Event.findOneAndUpdate({_id: req.params.id}, {
    arrivalTime: req.body.arrivalTime,
  },{new: true}, (error, event) => {
    if (error) {
      return next(error)
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
