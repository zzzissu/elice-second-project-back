import OrderService from '../services/orderService.js';
import asyncHandler from '../utils/asyncHandler.js'; // asyncHandler를 가져옵니다.

const OrderController = {
    // 결제 페이지
    createOrder: asyncHandler(async (req, res, next) => {
        const order = await OrderService.createOrder(req.body);
        res.status(201).json({ message: '주문이 성공적으로 생성되었습니다.', order });
    }),

    // 구매내역 조회
    getAllOrdersByBuyer: asyncHandler(async (req, res) => {
        const buyerId = req.user._id; // 로그인된 사용자 ID (buyerId)

        const orders = await OrderService.getOrdersByBuyerId(buyerId);

        // orders가 null 또는 undefined인 경우 빈 배열로 설정
        const safeOrders = Array.isArray(orders) ? orders : [];

        res.status(200).json({
            message: safeOrders.length > 0 ? '구매한 주문 목록을 성공적으로 조회했습니다.' : '구매한 주문이 없습니다.',
            orders: safeOrders.map((order) => ({
                orderId: order._id,
                productId: {
                    id: order.productId._id,
                    name: order.productId.name,
                    image: order.productId.image,
                    price: order.productId.price,
                },
                sellerId: order.sellerId,
                createdAt: order.createdAt,
            })),
        });
    }),
};
export default OrderController;
