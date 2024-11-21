import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// 결제 생성
router.post('/', orderController.createOrder);

// 승인 요청
// router.get('/', authenticate, orderController.getAllOrdersByBuyer);


export default router;
