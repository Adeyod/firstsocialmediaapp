const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// const getAllUsers = require("../controllers/users")
const User = require("../models/User")
console.log(User)
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) => {
  // const profileName = User.findById(req.body.userId)
  console.log(req.body.user)
  // console.log(profileName)
  let users = await User.find()
  console.log(users)
  res.render('dashboard', {users})
  // console.log(user)
});

router.get ('/users/friends', ensureAuthenticated, async (req, res) => {
  let users = await User.find()
  console.log(users)
  res.render('friends', { users })
})

router.get('/about', (req, res) => {
  res.render('about')
})


module.exports = router;