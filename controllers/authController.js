const passport = require('passport');
const User = require('../models/userModel');

// GET /register
const getRegisterForm = (req, res) => {
  res.render('auth/register');
};

// POST /register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
    });

    await User.register(user, password);

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(400).render('auth/register', {
      error: error.message,
    });
  }
};

// GET /login
const getLoginForm = (req, res) => {
  res.render('auth/login');
};

// POST /login
const loginUser = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
});

// POST /logout
const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect('/');
  });
};

module.exports = {
  getRegisterForm,
  registerUser,
  getLoginForm,
  loginUser,
  logoutUser,
}