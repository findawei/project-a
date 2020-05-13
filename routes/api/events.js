const express = require('express');
const router = express.Router();
// const passport = require("passport");

const Event = require('../../models/Event');

// @route   GET api/events/
// @desc    Get events
// @access  Public
router.get('/',  (req, res) => {
    Event.find()
        .sort({date: -1})
        .then(events => res.json(events));
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
router.post('/', (req, res) => {
    const newEvent = new Event(req.body
        // title: req.body.title,
        // location: req.body.location,
        // dateStart: req.body.dateStart,
        // dateEnd: req.body.dateEnd,
        // attendee: req.body.attendee
    );
    newEvent.save().then(event => res.json(event));
});
// @route   PUT api/events/:id
// @desc    Update specific
// @access  Public
router.route('/:id').put((req, res, next) => {
    Event.findOneAndUpdate(req.params.id, {
      $set: req.body
    }, (error, event) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(event)
        console.log("Event updated!")
      }
    })
  })
// @route   DELETE api/events/:id
// @desc    DELETE events
// @access  Public
router.delete('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event=>event.remove().then(()=>res.json({success: true})))
        .catch(err=>res.status(404).json({sucess:false}));
});

module.exports = router;
