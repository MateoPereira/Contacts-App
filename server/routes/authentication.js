const express = require('express');
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../lib/loggedIn')

// Sign up
router.get('/signup', (req, res)=>{
  res.send('Sign Up Page')
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/fail'
}))

// Sign in
router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/fail'
  })(req, res, next)
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.send(req.user)
})

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/signup');
  });
});


module.exports = router;