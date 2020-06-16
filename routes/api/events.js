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

// // @route   GET api/events/invites
// // @desc    Get all event invites for a specific user
// // @access  Private
// router.get('/invites', auth, async (req, res) => {
//   try {
//   const events = await Event.find({user: req.user.id}).sort({
//     date: -1,});
//   if (!events) throw Error('No items');
//   res.status(200).json(events);
// } catch (e) {
//   res.status(400).json({ msg: e.message });
// }
// });
// @route   POST api/events/
// @desc    POST event
// @access  Private
router.post('/', auth, async (req, res) => {
  const {title, location, dateStart, dateEnd} = req.body

  try{  
    const newEvent = new Event({
        title,
        location,
        dateStart,
        dateEnd,
        user: req.user.id, 
    });

    const event = await newEvent.save();
    if (!event) throw Error('Something went wrong saving the event');

    res.status(200).json(event);

    // const attendeeRegistered = await User.findOne({ user: req.user.email });
    // if(!attendeeRegistered) throw Error('Fart in a can');
    // Send email
    // Else, send attendee invite notification with accept/decline
    } 
  catch (e) {
  res.status(400).json({ msg: e.message });
}
});

// @route    PUT api/events/attendee
// @desc     Add event attendee
// @access   Private
router.put( '/attendee', auth, async (req, res) => {
    const {
      email,
      name,
      status
    } = req.body;

    const newAttendee = {
      email,
      name,
      status
    };

    try {
      const event = await Event.findOne({ event: req.event.id });

      event.attendee.unshift(newAttendee);

      await event.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    DELETE api/events/attendee/:att_id
// @desc     Delete attendee from event
// @access   Private

router.delete('/attendee/:att_id', auth, async (req, res) => {
  try {
    const foundEvent = await Event.findOne({ event: req.event.id });

    foundEvent.attendee = foundEvenet.attendee.filter(
      (att) => att._id.toString() !== req.params.att_id
    );

    await foundEvent.save();
    return res.status(200).json(foundEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
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
