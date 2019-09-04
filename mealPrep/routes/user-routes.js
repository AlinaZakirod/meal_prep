const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const passport = require("passport")
const ensureLogin = require("connect-ensure-login");


//signup route
router.get('/signup', (req, res, next) =>{
  res.render("user-views/signup")
})

router.post('/signup', (req, res, next) => {
  let username= req.body.theUsername;
  let pword = req.body.thePassword;


  // the new way with passport:
  if (!username || !pword) {
      req.flash('error', "please provide both username and password")
      res.redirect('/signup')
  }

  // variables for bcrypt
  let salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pword, salt);

  User
      .create({ username: username, password: hashedPassword })
      .then(() => {
          req.flash('sucess', "account successfully created")
          res.redirect('/profile')
      })
      .catch(err => console.log("error with furniture ", err))
})


//login route
router.get("/login", (req, res, next) => {
  res.render("user-views/login", {'message': req.flash('error') });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


// logout route
router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})



module.exports = router;