const mongoose = require('mongoose');

const fileConfirmedSchema = new mongoose.Schema({
  fileName: {type: String},
  docType:{
    type: String,
      enum:  ['grades', 'announcement', 'schedule']},
  fullName:{type: String},
  selectedDate:{type: Date},
  path: {type: String},
  size: {type: Number},
  mimetype: {type :String},
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileConfirmedSchema);

module.exports = File;