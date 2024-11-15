import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// 회원가입
router.post('/signup', userController.signUp);

// 로그인
router.post('/signin', userController.signIn);

export default router;
