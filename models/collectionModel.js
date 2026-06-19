const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
      minlength: [1, 'Collection name cannot be empty'],
      maxlength: [50, 'Collection name cannot exceed 50 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [250, 'Collection description cannot exceed 250 characters'],
      default: '',
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,   // Used for creation and modification timestamp
  }
);

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
