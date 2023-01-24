const router = require('express').Router();
const fs = require('fs');

// Helper method for generating unique ids
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route 
router.post('/notes', (req, res) => {
    console.log('req.body: ', req.body)

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
            console.log('newNote: ', newNote);
            readAndAppend(newNote, './db/db.json');
            res.json('Note added successfully!');
        } else {
            res.status(400).json('Error in adding note');
        }
    }
});

// router.delete('/notes/:id`', (req, res) => {
//     readFromFile('./db/db.json').then((data) => {
//         let notes = JSON.parse(data);
//         notes = notes.filter(note => note.note_id !== req.params.id);
//         console.log(notes)
//         fs.writeFile('./db/db.json', JSON.stringify(notes));
//         res.json('Note deleted successfully!');
//     });
// });

module.exports = router;