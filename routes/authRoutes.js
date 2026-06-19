const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/authMiddleware');

// EnsureGuest is used for public pages only.
// If user is authenticated, they will not access them until they log out.
router.get('/register', ensureGuest, authController.getRegisterForm);
router.post('/register', ensureGuest, authController.registerUser);

router.get('/login', ensureGuest, authController.getLoginForm);
router.post('/login', ensureGuest, authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;