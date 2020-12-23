const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Event = require('../../models/Event');
// const User = require('../../models/User');
// const format = require("date-fns");
var sender = require('../../email/mailer');
const config =require( '../../config');
const bodyParser = require('body-parser');

const { VERIFICATION_TOKEN } = config;

// @route   GET api/events/
// @desc    Get all events for a specific user
// @access  Private
router.get('/', async (req, res) => {
  const auth = req.currentUser;
if(auth){
  try {
  const events = await Event.find({user: req.currentUser.uid}).sort({
    date: -1,});
  // const events = await Event.find();
  if (!events) throw Error('No items');
  res.status(200).json(events);

  // if (auth) {
  //   console.log('authenticated!', auth);
  //   var events = 10;
  //   return res.send('Hi, from within the phones router POST');}

} catch (e) {
  res.status(400).json({ msg: e.message });
}
return;
}

});


// @route   get api/events/:id
// @desc    get specific event
// @access  Private

router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event));
});

// @route   POST api/events/
// @desc    POST event
// @access  Private

router.post('/', async (req, res) => {
  const auth = req.currentUser;

  if(auth){
    const {title, location, dateStart, dateEnd,
      attendees
    } = req.body
  try{ 
    // const user = await User.findById(req.user.id);
    const newEvent = new Event({
        title,
        location,
        dateStart,
        dateEnd,
        // isOrganizer: true,
        // user: req.user.id,
        // organizer: {email: user.email, name: user.name},
        attendees:  attendees.map(x => ({
          email: x.email,
          name: x.name,
          status: x.status,
        })),
    });
    
    const event = await newEvent.save();
    if (!event) throw Error('Something went wrong saving the event');
    res.status(200).json(event);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}
return;
}
return res.status(403).send('Not authorized');
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
  

// @route   DELETE api/events/:id
// @desc    DELETE events
// @access  Private


// const auth = req.currentUser;
//   const {title, location, dateStart, dateEnd,
//     attendees
//   } = req.body

//   if(auth){
//   try{ 

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



// router.post('/', bodyParser.raw({ type: 'application/json' }), (req, res) => {

//   let event;

//   try {
//       event = JSON.parse(req.body);
//   } catch (err) {
//       res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   // Check to see if you received the event or not.
//   console.log(event)
//   if (req.headers.authorization === VERIFICATION_TOKEN) {
//       res.status(200);
//       console.log("Meeting Started Webhook Recieved.") 

//               // const msg = {
//               //     to: 'hayhoky@gmail.com',
//               //     from: 'info@tardyapp.com',
//               //     subject: 'We are sorry that we missed you.',
//               //     text: 'Please, let us know if the timing of these webinars do not work for you. We hope you can join us next time.'
//               // };
          
//               // sgMail.send(msg);
          
//               // console.log("Email sent.")
          
//           // .catch(function (err) {
//           //     // API call failed...
//           //     console.log('API call failed, reason ', err);
//           // });
//   } else {
//       res.status(403).end('Access forbidden');
//       console.log("Invalid Post Request.")
//   }
// });


module.exports = router;

