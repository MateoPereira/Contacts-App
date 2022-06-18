const express = require('express');
const app = express();
const MySQLStore = require('express-mysql-session');
const session = require('express-session')
const { database } = require('./keys')
const cors = require("cors"); // cors to handle request with React
const passport = require('passport')

const port = process.env.PORT || 8000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
app.use(session({
  secret: 'mateomysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))

// Passport 
require('./lib/passport')
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user; //User data from authentication
  next()
})

// Routes
app.use(require('./routes/authentication'))
app.use(require('./routes/contacts'))

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})