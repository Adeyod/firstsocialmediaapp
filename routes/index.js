const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// const getAllUsers = require("../controllers/users")
const User = require("../models/User")
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) => {
  // const profileName = User.findById(req.body.userId)
  // console.log(profileName)
  let users = await User.find()
  res.render('dashboard', { title: "Dashboard", users})
});

router.get ('/users/friends', ensureAuthenticated, async (req, res) => {
  let users = await User.find()
  // let users = await User.find({ email: { $ne: req.body.email } })
  // let users = await User.find({ user: { $ne: req.user.name } })

  
 
  // db.collection.find({"email": "user.email"})
  // let users = await User.find({"name": "name"})
  res.render('friends', { title: "Mutual Friends", users })
})

router.get('/about', (req, res) => {
  res.render('about', { title: "About Us" })
})


module.exports = router;