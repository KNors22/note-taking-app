const express = require('express');
const router = express.Router();

const collectionController = require('../controllers/collectionController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, collectionController.getAllCollections);
router.get('/new', ensureAuthenticated, collectionController.getNewCollectionForm);
router.post('/', ensureAuthenticated, collectionController.createCollection);
router.put('/:id/notes', ensureAuthenticated, collectionController.addNotesToCollection);
router.get('/:id', ensureAuthenticated, collectionController.getCollectionById);
router.get('/:id/edit', ensureAuthenticated, collectionController.getEditCollectionForm);
router.put('/:id', ensureAuthenticated, collectionController.updateCollection);
router.delete('/:id', ensureAuthenticated, collectionController.deleteCollection);

module.exports = router;
