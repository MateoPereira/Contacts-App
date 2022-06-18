const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/contacts', async (req, res, next)=>{
  try {
    const contacts = await pool.query('SELECT * FROM contacts WHERE user = ?', [req.user.username]);
    res.send(contacts)
  } catch(err){
    next()
  }
})

module.exports = router