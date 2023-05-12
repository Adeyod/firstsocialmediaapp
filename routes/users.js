const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit')

const { forwardAuthenticated } = require('../config/auth');
const { 
  usersRegister_post, 
  usersRegister_get, 
  usersLogin_get, 
  usersLogin_post, 
  usersLogout, 
  forgetPassword_get,
  forgetPassword_post, 
  otp_post, otp_get} = require('../controllers/users.js');

  const registerLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 10 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: ""
  })

// Login Page Route
router.get('/login', usersLogin_get);

// Register Page
router.get('/register', forwardAuthenticated, usersRegister_get);
// router.get('/example', forwardAuthenticated, examplePage)

// Register
router.post('/register', registerLimiter, usersRegister_post)


// Login
router.post('/login', loginLimiter, usersLogin_post, );

router.get('/forget_password', forgetPassword_get);
router.post('/forget_password', forgetPassword_post);
router.get('/otp', otp_get);
router.post('/otp', otp_post);

// Logout
router.get('/logout', usersLogout);

module.exports = router;