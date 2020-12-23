const express = require('express');
const router = express.Router();

// const bcrypt = require('bcryptjs');
// const config = require('../../config');
// const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// User Model
const User = require('../../models/User');


/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    // if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        points: user.points
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/', async (req, res) => {
  const auth = req.currentUser;
if(auth){
  const _id  = req.body;
  try {
    const user = await User.findById(_id);
    if (user) throw Error('User already exists');

    const newUser = new User({
      _id: _id
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    res.status(200).json({
      user: {
        _id: savedUser._id,
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
return;
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PUT api/users
 * @desc    Update user points
 * @access  Public
 */

router.put('/points', auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({_id:req.user.id},
    {points: req.body.points}, {new:true}
    )
      if (!user) throw Error('Could not add points.');
        res.json(user)
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
});
  

module.exports = router;
