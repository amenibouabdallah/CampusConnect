const express = require('express');
const router = express.Router();
const {getUserByEmail, changePasswordOrEmail} = require('../controllers/admin')
router.post('/get-email', getUserByEmail);
router.post('/change-pass-or-email', changePasswordOrEmail);
module.exports = router;
