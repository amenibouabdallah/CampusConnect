const express = require('express');
const router = express.Router();
const { getUserByEmail, changePasswordOrEmailOrFullNameOrProfilePicture } = require('../controllers/userController');
const multer = require('multer');

// Configure multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define routes for user-related operations
router.post('/get-email', getUserByEmail);
router.post('/change-name-or-email-or-pass-or-image', upload.single('profileImage'), changePasswordOrEmailOrFullNameOrProfilePicture);

module.exports = router;
