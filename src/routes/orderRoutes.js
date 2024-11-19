import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', authenticate, orderController.getOrderDetails);

router.post('/', authenticate, orderController.createOrder);

export default router;
