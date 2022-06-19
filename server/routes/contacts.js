const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/contacts', async (req, res, next)=>{
  try {
    const contacts = await pool.query('SELECT * FROM contacts WHERE user = ?', [req.user.username]);
    await res.send(contacts)
  } catch(err){
    next()
  }
})

// Add new contact
router.post('/contacts/add', async (req, res, next)=>{
  try {
    await pool.query(`INSERT INTO contacts (name, email, user) VALUES ('${req.body.name}', '${req.body.email}', '${req.user.username}');`)
  } catch(err){
    console.log('ERROR')
    next()
  }
})

// Delete contact
router.post('/contacts/delete/:id', async (req, res, next) => {
  const id = (req.params.id)
  await pool.query(`DELETE FROM contacts WHERE contactId = ?`, [id]);
  next()
})

// Edit contact
router.post('/contacts/edit/:id', async (req, res, next) => {
  const id = (req.params.id) 
  await pool.query(`UPDATE contacts SET ? WHERE contactId = ?`, [req.body, id]);
  next()
})

module.exports = router