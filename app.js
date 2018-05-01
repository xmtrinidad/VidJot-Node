const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const app = express();


// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load Note Model
require('./models/note');
const Note = mongoose.model('notes');

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express JSON Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override middleware
app.use(methodOverride('_method'))

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Note Index Page
app.get('/notes', (req, res) => {
  Note.find({})
    .sort({ date: 'desc' })
    .then(notes => {
      res.render('notes/index', { notes: notes });
    });
});

// Add Note Form
app.get('/notes/add', (req, res) => {
  res.render('notes/add');
});

// Edit Note Form
app.get('/notes/edit/:id', (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      res.render('notes/edit', { note: note });
    });

});


// Process Form
app.post('/notes', (req, res) => {
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
app.put('/notes/:id', (req, res) => {
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
app.delete('/notes/:id', (req, res) => {
  Note.remove({ _id: req.params.id })
    .then(() => {
      res.redirect('/notes');
    });
})


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));