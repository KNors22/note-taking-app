const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [4, 'Username must be at least 4 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
  },
  {
    timestamps: true,   // Used for creation and modification timestamp
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
