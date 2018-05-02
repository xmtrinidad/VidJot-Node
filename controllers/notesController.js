const Note = require('../models/note');


exports.get_all_notes = (req, res) => {
  Note.find({ user: req.user.id })
    .sort({ date: 'desc' })
    .then(notes => {
      res.render('notes/index', { notes: notes });
    });
};

exports.get_note_form = (req, res) => {
  res.render('notes/add');
};

exports.get_edit_note_form = (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/notes');
      } else {
        res.render('notes/edit', { note: note });
      }
    });
};

exports.post_new_note = (req, res) => {
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
      note: req.body.note,
      user: req.user.id
    }
    new Note(newUser)
      .save()
      .then(note => {
        req.flash('success_msg', 'Note added');
        res.redirect('/notes');
      });
  }
};

exports.put_note_edit = (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      note.title = req.body.title;
      note.note = req.body.note;
      note.save()
        .then(note => {
          res.redirect('/notes');
        });
    });
};

exports.delete_note = (req, res) => {
  Note.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Note removed');
      res.redirect('/notes');
    });
};