const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database')
const helpers = require('./encryptPassword')

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]) // Get the complete user data.
  if (user.length > 0 ){
    const validPassword = await helpers.matchPassword(password, user[0].password) //Validate if it is the same password
    if (validPassword) {
      done(null, user[0]);
    }
    else done (null, false)
  }
  else done(null, false);
}))

// Sign up
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const fullname = req.body.fullname
  const email = req.body.email

  const user = {
    fullname,
    username,
    email,
    password
  }

  user.password = await helpers.encryptPassword(password);
  try {
    await pool.query('INSERT INTO users SET ?', [user])
    return done(null, user);
  } catch(err) {done (null, false)}
}))

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (id, done) => {
  const user = await pool.query('SELECT * FROM users WHERE username = ?', [id]);
  if (user[0]) done(null, user[0]);
  else done(null, false)
});