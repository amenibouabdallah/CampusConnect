const express = require('express');
const userC = require('../controllers/authController.js')
const { signUp, signIn, forgotPassword, confirmCode, confirmCodeForgot, newPassword, completeProfile, showAllUsers} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/confirm-code', confirmCode);
router.post('/confirm-code-forgot', confirmCodeForgot);
router.post('/new-password', newPassword);
router.post('/complete-profile', upload.single('profileImage'), completeProfile);
router.get('/showUsers',showAllUsers)
router.put('/updateuser/:id',userC.updateUserById)
router.delete('/deleteuser/:id',userC.deleteUserById)
/*router.get('user/:userId',showUser)*/

module.exports = router;
