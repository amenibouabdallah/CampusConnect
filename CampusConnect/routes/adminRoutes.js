const express = require('express');
const router = express.Router();
const {getUserByEmail, changePasswordOrEmail, getUsers, handleConfirmAction} = require('../controllers/admin')
router.post('/get-email', getUserByEmail);
router.post('/change-pass-or-email', changePasswordOrEmail);
router.post('/get-users',getUsers);
router.post('/handle-confirm-action', handleConfirmAction);
module.exports = router;
