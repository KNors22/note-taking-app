const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [100, 'Note title cannot exceed 100 characters'],
    },

    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      default: null,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,   // Used for creation and modification timestamp
  }
);


async function createNote(properties) {
    const newNote = await Note.create(properties);
    return newNote.toObject();
}

async function readNote(filter) {
    const result = await Note.findOne(filter).lean();
    return result;
}

async function updateNote(filter, update) {
    const result = await Note.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
    }).lean();

    return result;
}

async function deleteNote(filter) {
    const result = await Note.deleteOne(filter);
    return result;
}


const Note = mongoose.model('Note', noteSchema);

module.exports = {
    Note,
    createNote,
    readNote,
    updateNote,
    deleteNote,
};
