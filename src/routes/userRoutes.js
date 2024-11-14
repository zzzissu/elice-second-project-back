const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// 회원가입
router.post('/signup', userController.signUp);

// 로그인
router.post('/signin', userController.signIn);

// 마이페이지 조회
router.get('/:userId', userController.getProfile);

// 마이페이지 수정
router.put('/update/:userId', userController.updateProfile);

// 회원 탈퇴
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
