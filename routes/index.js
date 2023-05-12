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
  res.render('dashboard', {users})
});

router.get ('/users/friends', ensureAuthenticated, async (req, res) => {
  let users = await User.find().sort({})
  res.render('friends', { users })
})

router.get('/about', (req, res) => {
  res.render('about')
})


module.exports = router;