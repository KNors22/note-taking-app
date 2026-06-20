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

    color: {
      type: String,
      trim: true,
      enum: {
        values: [
          '#2563eb',
          '#7c3aed',
          '#db2777',
          '#dc2626',
          '#ea580c',
          '#ca8a04',
          '#16a34a',
          '#0891b2',
          '#475569',
          '#1f2937',
        ],
        message: 'Choose a colour from the available collection palette',
      },
      match: [/^#[0-9A-Fa-f]{6}$/, 'Collection colour must be a valid hex value'],
      default: '#2563eb',
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
