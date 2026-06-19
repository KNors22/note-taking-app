const passport = require('passport');
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// GET /register
const getRegisterForm = (req, res) => {
  res.render('auth/register');
};

// POST /register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword
    });

    res.redirect('/login');
  } catch (error) {
    console.error(error);

    res.status(400).render('auth/register', {
      error: error.code === 11000   // MONGODB error 'E11000 duplicate key error collection'
        ? 'This username or email is already registered. Please try again.'
        : error.message
    });
  }
};

// GET /login
const getLoginForm = (req, res) => {
  res.render('auth/login');
};

// POST /login
const loginUser = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).render('auth/login', {
        error: info?.message || 'Invalid username or password',
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.redirect('/dashboard');
    });

  })(req, res, next);
};

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