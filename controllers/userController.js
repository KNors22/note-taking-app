const User = require("../models/User");
const Note = require("../models/Note");
const Collection = require("../models/Collection");

// GET /profile
// Show logged-in user's profile
const getProfile = async (req, res) => {
  try {
    res.render("users/profile", { user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile");
  }
};

// GET /profile/edit
// Show edit profile form
const getEditProfileForm = async (req, res) => {
  try {
    res.render("users/edit", { user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile edit form");
  }
};

// PUT /profile
// Update profile
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).render("404");
    }

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating profile");
  }
};

// DELETE /profile
// Delete user account and all their data
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Delete user's notes
    await Note.deleteMany({
      author: userId,
    });

    // Delete user's collections
    await Collection.deleteMany({
      author: userId,
    });

    // Delete user account
    await User.findByIdAndDelete(userId);

    // Log out after deleting account
    req.logout((error) => {
      if (error) {
        return next(error);
      }

      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting account");
  }
};

module.exports = {
  getProfile,
  getEditProfileForm,
  updateProfile,
  deleteAccount,
};
