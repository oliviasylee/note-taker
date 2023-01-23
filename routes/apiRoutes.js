const router = require('express').Router();

// Helper method for generating unique ids
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route 
router.post('/api/notes', (req, res) => {
    console.log("req.body: ", req.body)

    if (!req.body) {
        res.status(400).json('Error in adding note');
    } else {
        const { title, text } = req.body;

        if (title && text) {
            const newNote = {
                title,
                text,
                note_id: uuid(),
            };

            readAndAppend(newNote, './db/db.json');
            res.json('Note added successfully!');
        } else {
            res.status(400).json('Error in adding note');
        }
    }
});

module.exports = router;