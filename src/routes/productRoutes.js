import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// 1. 상품 목록 조회
router.get('/', productController.getProductList);

// 2. 상품 등록
router.put('/upload', productController.uploadProduct);

// 3. 상품 수정
router.post('/post', productController.updateProduct);

// 4. 상품 삭제
router.delete('/delete', productController.deleteProduct);

export default router;
