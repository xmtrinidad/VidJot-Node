const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

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

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Note Form
app.get('/notes/add', (req, res) => {
  res.render('notes/add');
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
    res.send('passed');
  }
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));