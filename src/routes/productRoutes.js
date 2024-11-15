import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// 1. 상품 목록 조회
router.get('/', productController.getProductList);

// 2. 상품 등록
router.post('/', productController.uploadProduct);

// 3. 상품 수정
router.put('/:productId', productController.updateProduct);

// 4. 상품 삭제
router.delete('/:productId', productController.deleteProduct);

export default router;
