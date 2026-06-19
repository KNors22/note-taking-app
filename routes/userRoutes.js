const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/profile', ensureAuthenticated, userController.getProfile);
router.get('/profile/edit', ensureAuthenticated, userController.getEditProfileForm);
router.put('/profile', ensureAuthenticated, userController.updateProfile);
router.delete('/profile', ensureAuthenticated, userController.deleteAccount);

module.exports = router;