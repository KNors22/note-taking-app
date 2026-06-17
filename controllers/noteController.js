const Note = require('../models/Note');
const Collection = require('../models/Collection');

// GET /notes
// Show all notes for the logged-in user
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      author: req.user._id,
      isDeleted: false,
    })
      .populate('collection')
      .sort({ updatedAt: -1 });

    res.render('notes/index', { notes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading notes');
  }
};

// GET /notes/new
// Show create note form
const getNewNoteForm = async (req, res) => {
  try {
    const collections = await Collection.find({
      author: req.user._id,
    }).sort({ name: 1 });

    res.render('notes/new', { collections });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading note form');
  }
};

// POST /notes
// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, collection, isPinned } = req.body;

    await Note.create({
      title,
      content,
      collection: collection || null,
      isPinned: isPinned === 'on',
      author: req.user._id,
    });

    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error creating note');
  }
};

// GET /notes/:id
// Show one note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      author: req.user._id,
      isDeleted: false,
    }).populate('collection');

    if (!note) {
      return res.status(404).render('404');
    }

    res.render('notes/show', { note });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading note');
  }
};

// GET /notes/:id/edit
// Show edit note form
const getEditNoteForm = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      author: req.user._id,
      isDeleted: false,
    });

    if (!note) {
      return res.status(404).render('404');
    }

    const collections = await Collection.find({
      author: req.user._id,
    }).sort({ name: 1 });

    res.render('notes/edit', { note, collections });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit form');
  }
};

// PUT /notes/:id
// Update a note
const updateNote = async (req, res) => {
  try {
    const { title, content, collection, isPinned, isArchived } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
        isDeleted: false,
      },
      {
        title,
        content,
        collection: collection || null,
        isPinned: isPinned === 'on',
        isArchived: isArchived === 'on',
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).render('404');
    }

    res.redirect(`/notes/${note._id}`);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error updating note');
  }
};

// DELETE /notes/:id
// Soft delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).render('404');
    }

    res.redirect('/notes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting note');
  }
};

module.exports = {
  getAllNotes,
  getNewNoteForm,
  createNote,
  getNoteById,
  getEditNoteForm,
  updateNote,
  deleteNote
}