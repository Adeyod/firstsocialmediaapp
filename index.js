const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const helmet = require('helmet')


const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const postRouter = require('./routes/post.js');

const app = express();

app.use(helmet())
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI

// Passport Config
require('./config/passport')(passport);

// DB Config
// const db = require('./config/env').mongoURI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully !'))
  .catch(err => console.log(err));

  
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"))
// app.use(express.static("public"))

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// I created this middleware to allow for header to change login to logout when need arises
// This middleware is depending on passport authentication to work
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create-post', postRouter);

const PORT = process.env.PORT || 6001;

app.listen(PORT, console.log(`Server running on  ${PORT}`));