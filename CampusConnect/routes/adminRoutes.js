const express = require('express');
const router = express.Router();
const {getUserByEmail} = require('../controllers/admin')
router.post('/get-email', getUserByEmail);

module.exports = router;
