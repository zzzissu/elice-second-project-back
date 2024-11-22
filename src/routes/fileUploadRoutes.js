import express from 'express';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js'; // 미들웨어 임포트
import fileController from '../controllers/fileController.js'; // 파일 업로드 후 처리할 컨트롤러 임포트

const router = express.Router();

// 프로필 이미지 업로드 라우터
router.post(
    '/profile',
    fileUploadMiddleware.uploadProfileImage.single('profile'), // 파일 업로드 미들웨어 (클라이언트의 input name="profile"에 맞춰서)
    fileController.profileFile // 파일 업로드 완료 후 컨트롤러 처리
);

// 상품 이미지 업로드 라우터
router.post(
    '/product',
    fileUploadMiddleware.uploadProductImage.single('product'), // 파일 업로드 미들웨어 (클라이언트의 input name="product"에 맞춰서)
    fileController.productFile // 파일 업로드 완료 후 컨트롤러 처리
);

export default router;
