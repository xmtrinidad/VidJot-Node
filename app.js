const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Routes
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');


const app = express();


// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express JSON Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override middleware
app.use(methodOverride('_method'));

//Routes Middleware
app.use('/notes', notesRoutes);
app.use('/', indexRoutes);




const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));