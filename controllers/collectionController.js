const Collection = require("../models/collectionModel");
const Note = require("../models/noteModel");

// GET /collections
// Show all collections for logged-in user
const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find({
            author: req.user._id,
        }).sort({ name: 1 });

        res.render("collections/index", { collections });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading collections");
    }
};

// GET /collections/new
// Show create collection form
const getNewCollectionForm = (req, res) => {
    res.render("collections/new");
};

// POST /collections
// Create collection
const createCollection = async (req, res) => {
    try {
        const { name, description } = req.body;

        await Collection.create({
            name,
            description,
            author: req.user._id,
        });

        res.redirect("/collections");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error creating collection");
    }
};

// GET /collections/:id
// Show one collection and its notes
const getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findOne({
            _id: req.params.id,
            author: req.user._id,
        });

        if (!collection) {
            return res.status(404).render("404");
        }

        const notes = await Note.find({
            collection: collection._id,
            author: req.user._id,
            isDeleted: false,
        }).sort({ updatedAt: -1 });

        res.render("collections/show", { collection, notes });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading collection");
    }
};

// GET /collections/:id/edit
// Show edit collection form
const getEditCollectionForm = async (req, res) => {
    try {
        const collection = await Collection.findOne({
            _id: req.params.id,
            author: req.user._id,
        });

        if (!collection) {
            return res.status(404).render("404");
        }

        res.render("collections/edit", { collection });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading edit form");
    }
};

// PUT /collections/:id
// Update collection
const updateCollection = async (req, res) => {
    try {
        const { name, description } = req.body;

        const collection = await Collection.findOneAndUpdate(
            {
                _id: req.params.id,
                author: req.user._id,
            },
            {
                name,
                description,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!collection) {
            return res.status(404).render("404");
        }

        res.redirect(`/collections/${collection._id}`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error updating collection");
    }
};

// DELETE /collections/:id
// Delete collection but keep notes
const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({
            _id: req.params.id,
            author: req.user._id,
        });

        if (!collection) {
            return res.status(404).render("404");
        }

        // Remove this collection from notes, but do not delete the notes
        await Note.updateMany(
            {
                collection: collection._id,
                author: req.user._id,
            },
            {
                collection: null,
            },
        );

        res.redirect("/collections");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting collection");
    }
};

module.exports = {
    getAllCollections,
    getNewCollectionForm,
    createCollection,
    getCollectionById,
    getEditCollectionForm,
    updateCollection,
    deleteCollection,
};
