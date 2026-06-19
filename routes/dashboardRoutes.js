const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.status(200).render('dashboard', {
    user: req.user,
  });
});

module.exports = router;