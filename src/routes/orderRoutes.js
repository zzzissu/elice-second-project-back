import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// 결제 생성
router.post('/',authenticate, orderController.createOrder);

// 구매 내역 조회(마이페이지)
// router.get('/', authenticate, orderController.getAllOrdersByBuyer);


export default router;
