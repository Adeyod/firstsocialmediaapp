const express = require('express');
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');
const { 
  usersRegister_post, 
  usersRegister_get, 
  usersLogin_get, 
  usersLogin_post, 
  usersLogout } = require('../controllers/users.js');

// Login Page Route
router.get('/login', usersLogin_get);

// Register Page
router.get('/register', forwardAuthenticated, usersRegister_get);
// router.get('/example', forwardAuthenticated, examplePage)

// Register
router.post('/register', usersRegister_post)


// Login
router.post('/login', usersLogin_post, );

// Logout
router.get('/logout', usersLogout);

module.exports = router;