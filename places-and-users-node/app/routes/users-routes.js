const express = require('express');
const router = express.Router();

router.get('/users', (req, res, next) => {
  console.log('Get request in users');

  res.json({message: 'It works in users!'});
});

module.exports = router;