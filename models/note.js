const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const NoteSchema = new Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('notes', NoteSchema);