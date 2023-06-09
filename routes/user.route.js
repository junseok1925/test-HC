const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');

const userController = new UserController();

router.get('/emailExists/:email', userController.emailExists);
router.get('/nicknameExists/:nickname', userController.nicknameExists);
router.post('/signup', userController.signup);
router.delete('/withdrawal', authMiddleware, userController.withdrawal);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// 이메일 인증
router.post('/sendAuthMail', userController.sendAuthMail);
router.post('/verifyMail', userController.verifyMail);

module.exports = router;
