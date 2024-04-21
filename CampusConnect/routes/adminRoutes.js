const express = require('express');
const router = express.Router();
const {getUserByEmail, changePasswordOrEmail, getUsers} = require('../controllers/admin')
router.post('/get-email', getUserByEmail);
router.post('/change-pass-or-email', changePasswordOrEmail);
router.post('/get-users',getUsers);
module.exports = router;
