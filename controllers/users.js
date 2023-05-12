const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.js');
const usersRegister_post = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
}

const usersRegister_get = (req, res) => res.render('register')
const usersLogin_get = (req, res) => res.render('login')
const usersLogin_post = async (req, res, next) => {
  passport.authenticate('local',  {
    
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}

const forgetPassword_get = (req, res) => {
res.render('forget_password')
}
const forgetPassword_post = (req, res) => {
const {email} = req.body;
let errors = []
if (!email) {
  // errors.push({ msg: "Fill in your email address" })
// }
// if (errors.length > 0) {
  req.flash(
    'error_msg',
    'Email is Required'
  );
  res.render('forget_password')
}
 else {

User.findOne({email: email }).then(user => {
    if(user) {
      req.flash(
        'success_msg',
        'An OTP Has been sent to your email address. Please enter it below'
      );
      res.redirect('otp')
    } else {
      req.flash(
        'error_msg',
        'This email does not exist. Please register an account first'
      );
      res.redirect('register')
    }
})
}
}
const otp_get = (req, res) => {
res.render('otp')
}
const otp_post = (req, res) => {
res.render('otp')
}

const usersLogout = (req, res) => {
  req.logout(function(err) {
    if(err) {return next(err)}
    res.redirect('/users/login');
    req.flash('success_msg', 'You are logged out');
  });
  
}

// const examplePage = (req, res) => {
//   const users = User.find()
//   console.log(users)
//   res.render('example', users)
// }



module.exports = {
  usersRegister_post, 
  usersRegister_get, 
  usersLogin_get, 
  usersLogin_post, 
  forgetPassword_get,
  forgetPassword_post,
  otp_post,otp_get,
  usersLogout }