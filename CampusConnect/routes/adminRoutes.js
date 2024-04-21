const express = require('express');
const router = express.Router();
const {getUserByEmail, changePasswordOrEmail, getUsers, handleConfirmAction, getDocuments, handleConfirmActionDocs} = require('../controllers/admin')
router.post('/get-email', getUserByEmail);
router.post('/change-pass-or-email', changePasswordOrEmail);
router.post('/get-users',getUsers);
router.post('/handle-confirm-action', handleConfirmAction);
router.post('/get-docs', getDocuments)
router.post('/handle-confirm-action-docs', handleConfirmActionDocs)
module.exports = router;
