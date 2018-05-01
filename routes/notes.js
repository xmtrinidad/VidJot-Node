const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');
const notes_controller = require('../controllers/notesController');


// Note Index Page
router.get('/', notes_controller.get_all_notes);

// Add Note Form
router.get('/add', notes_controller.get_note_form);

// Edit Note Form
router.get('/edit/:id', notes_controller.get_edit_note_form);

// Process Form
router.post('/', notes_controller.post_new_note);

// Edit form process
router.put('/:id', notes_controller.put_note_edit);

// Delete Note
router.delete('/:id', notes_controller.delete_note);

module.exports = router;