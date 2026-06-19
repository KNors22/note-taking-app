const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Collection = require("../models/collectionModel");

// GET /profile
// Show logged-in user's profile
const getProfile = async (req, res) => {
  try {
    res.render("user/profile", { user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile. Please try again.");
  }
};

// GET /profile/edit
// Show edit profile form
const getEditProfileForm = async (req, res) => {
  try {
    res.render("user/edit", { user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile edit form. Please try again.");
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
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).render("404");
    }

    res.redirect("/dashboard");    // SUCCESS!

    } catch (error) {
      console.error(error);

      // Check which field aleady exists
      const duplicateField = error.keyPattern?.username
        ? 'username'
        : error.keyPattern?.email ? 'email' : null;

      const errorMessage = duplicateField
        ? `That ${duplicateField} is already in use. Please choose another one.`
        : error.message;

      return res.status(400).render("user/edit", {
        error: errorMessage,
        user: req.user,
      });
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
