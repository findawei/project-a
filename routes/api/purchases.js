const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Item = require('../../models/Item');
const Purchase = require('../../models/Purchase');

// @route   GET api/purchases/
// @desc    Get all purchases for a specific user
// @access  Private
router.get('/', async (req, res) => {
  const auth = req.currentUser;
if(auth){
  try {
  const purchases = await Purchase.find({user: req.currentUser.uid}).sort({
    date: -1,});
  if (!purchases) throw Error('No purchases');
  res.status(200).json(purchases);
} catch (e) {
  res.status(400).json({ msg: e.message });
}
return;
}
});

// @route   POST api/purchases/
// @desc    POST item
// @access  Private
router.post('/', async (req, res) => {
  const auth = req.currentUser;
if(auth){
    // const user = await User.findById(req.user.id).select('-password');
    // const item = await Item.findById(req.item.id)
    const newPurchase = new Purchase({
        user: req.currentUser.uid,
        item: req.body._id,
        name: req.body.name,
        pointsItem: req.body.pointsItem
    });
    try{ 
    const purchase = await newPurchase.save();
    if (!purchase) throw Error('Something went wrong saving the purchase');
    res.status(200).json(purchase);
    } 
  catch (e) {
  res.status(400).json({ msg: e.message, success: false });
}}
});

module.exports = router;
