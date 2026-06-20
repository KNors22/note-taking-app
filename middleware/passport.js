const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/userModel");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);

      if (!validPassword) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);

    } catch (error) {
      done(error);
    }
  }
);

module.exports = passport;