const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');

// @route   GET api/events/
// @desc    Get events
// @access  Public
router.get('/', async (req, res) => {
try {
  const events = await Event.find();
  if (!events) throw Error('No items');

  res.status(200).json(events);
} catch (e) {
  res.status(400).json({ msg: e.message });
}
});
// @route   get api/events/:id
// @desc    get specific event
// @access  Public
router.get('/:id',  (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event));
});
// @route   POST api/events/
// @desc    POST event
// @access  Public
router.post('/', async (req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        location: req.body.location,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        attendee: req.body.attendee
    });
try {
  const event = await newEvent.save();
  if (!event) throw Error('Something went wrong saving the event');

  res.status(200).json(event);
} catch (e) {
  res.status(400).json({ msg: e.message });
}
});
// @route   PUT api/events/:id
// @desc    Update specific
// @access  Public
router.put('/:id', (req, res) => {
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
// @access  Public
router.put('/log/:id', (req, res) => {
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
// @access  Public
router.delete('/:id', async (req, res) => {
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
