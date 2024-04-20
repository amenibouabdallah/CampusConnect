const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }
    try {
      const { filename, path, size, mimetype } = req.file;
      const file = new File({
        filename,
        path,
        size,
        mimetype
      });
      await file.save();
      res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};

// Controller method to display information of all files
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    // If files found, return array of file information
    return res.status(200).json(files.map(file => ({
      fileName: file.fileName,
      docType: file.docType,
      fullName: file.fullName,
      selectedDate: file.selectedDate,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: file.uploadedAt
    })));
  } catch (error) {
    console.error('Error fetching files:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


