import orderService from '../services/orderService.js';
import asyncHandler from '../utils/asyncHandler.js'; // asyncHandler를 가져옵니다.

const orderController = {
    // 결제 생성
    createOrder: asyncHandler(async (req, res, next) => {
        const orderData = req.body; // 클라이언트에서 보낸 주문 데이터
        const newOrder = await orderService.createOrder(orderData); // 서비스 호출
        res.status(201).json({ message: '주문이 성공적으로 생성되었습니다.', order: newOrder });
    }),

};

export default orderController;
