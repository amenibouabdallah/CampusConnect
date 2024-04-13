const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const fileRoutes =require('./routes/fileRoutes');


const app = express();

const PORT = 3002;
const MONGODB_URI = 'mongodb://localhost:27017';


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  
  app.use(cors()); // Enable CORS
  app.use(bodyParser.json()); // Parse JSON request bodies
  app.use(express.json({ limit: '100mb' })); // Increased JSON payload limit
  app.use(express.urlencoded({ extended: true, limit: '100mb' })); // Parse URL-encoded bodies

  app.use(express.json());
  app.use('/api/files', fileRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });