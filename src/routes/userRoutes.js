import express from 'express';
import userController from '../controllers/userController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// 이메일 중복 확인 API
router.get('/email', userController.checkEmail);

// 닉네임 중복 확인 API
router.get('/nickname', userController.checkNickname);

// 비밀번호 일치 확인 API
router.post('/password', authenticate, userController.checkPassword);

//유저 목록 조회
router.get('/', userController.userList);

// 마이페이지 조회
router.get('/my', authenticate, userController.getProfile);

// 마이페이지 수정
router.put('/my', authenticate, userController.updateProfile);

// 회원 탈퇴
router.delete('/', authenticate, userController.deleteUser);

export default router;
