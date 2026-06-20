const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, noteController.getAllNotes);
router.get('/trash', ensureAuthenticated, noteController.getTrashNotes);
router.get('/new', ensureAuthenticated, noteController.getNewNoteForm);
router.post('/', ensureAuthenticated, noteController.createNote);
router.get('/:id', ensureAuthenticated, noteController.getNoteById);
router.get('/:id/edit', ensureAuthenticated, noteController.getEditNoteForm);
router.put('/:id', ensureAuthenticated, noteController.updateNote);
router.delete('/:id', ensureAuthenticated, noteController.deleteNote);
router.post('/:id/restore', ensureAuthenticated, noteController.restoreNote);

module.exports = router;
