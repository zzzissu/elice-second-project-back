import express from 'express';
import fileController from '../controllers/fileController.js';

const router = express.Router();

// 프로필 이미지 프리사인드 URL 생성
router.post('/profile', fileController.generateProfilePresignedUrl);

// 상품 이미지 프리사인드 URL 생성
router.post('/product', fileController.generateProductPresignedUrl);

export default router;
