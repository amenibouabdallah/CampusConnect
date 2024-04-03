const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  fileType: ['relevé', 'annonces', 'emplois'],
  path: String,
  size: Number,
  mimetype: String,
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;