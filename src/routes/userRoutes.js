import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//유저 목록 조회
router.get('/', userController.userList);

// 마이페이지 조회
router.get('/my', userController.getProfile);

// 마이페이지 수정
router.put('/my', userController.updateProfile);

// 회원 탈퇴
router.delete('/', userController.deleteUser);

export default router;
