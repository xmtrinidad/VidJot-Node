const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notesController');
const { ensureAuthenticated } = require('../helpers/auth');


// Note Index Page
router.get('/', ensureAuthenticated, notes_controller.get_all_notes);

// Add Note Form
router.get('/add', ensureAuthenticated, notes_controller.get_note_form);

// Edit Note Form
router.get('/edit/:id', ensureAuthenticated, notes_controller.get_edit_note_form);

// Process Form
router.post('/', ensureAuthenticated, notes_controller.post_new_note);

// Edit form process
router.put('/:id', ensureAuthenticated, notes_controller.put_note_edit);

// Delete Note
router.delete('/:id', ensureAuthenticated, notes_controller.delete_note);

module.exports = router;