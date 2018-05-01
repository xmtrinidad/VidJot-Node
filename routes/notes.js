const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');


// Note Index Page
router.get('/', (req, res) => {
  Note.find({})
    .sort({ date: 'desc' })
    .then(notes => {
      res.render('notes/index', { notes: notes });
    });
});

// Add Note Form
router.get('/add', (req, res) => {
  res.render('notes/add');
});

// Edit Note Form
router.get('/edit/:id', (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      res.render('notes/edit', { note: note });
    });

});


// Process Form
router.post('/', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.note) {
    errors.push({ text: 'Please add note content' });
  }

  if (errors.length > 0) {
    res.render('notes/add',
      {
        errors: errors,
        title: req.body.title,
        note: req.body.note
      });
  } else {
    const newUser = {
      title: req.body.title,
      note: req.body.note
    }
    new Note(newUser)
      .save()
      .then(note => {
        res.redirect('/notes');
      });
  }
});

// Edit form process
router.put('/:id', (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      note.title = req.body.title;
      note.note = req.body.note;
      note.save()
        .then(note => {
          res.redirect('/notes');
        })
    })
});

// Delete Note
router.delete('/:id', (req, res) => {
  Note.remove({ _id: req.params.id })
    .then(() => {
      res.redirect('/notes');
    });
});

module.exports = router;