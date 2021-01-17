const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Item = require('../../models/Item');
const Organization = require('../../models/Organization');

// @route   POST api/purchases/
// @desc    POST item
// @access  Private
router.post('/', async (req, res) => {
  const auth = req.currentUser;
if(auth & auth.organization == null){
    // const user = await User.findById(req.user.id).select('-password');
    // const item = await Item.findById(req.item.id)
    const newOrganization = new Organization({
        name: req.body.name
    });
    try{ 
    const organization = await newOrganization.save();
    if (!organization) throw Error('Something went wrong saving the purchase');
    res.status(200).json(organization);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}}
});

module.exports = router;
