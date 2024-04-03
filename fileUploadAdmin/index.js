const express = require('express');
const mongoose = require('mongoose');
const fileRoutes =require('./routes/fileRoutes');

const app = express();

const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017';


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  
  app.use(express.json());
  app.use('/api/files', fileRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });