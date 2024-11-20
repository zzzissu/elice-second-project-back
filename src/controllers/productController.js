import OrderService from '../services/orderService.js';
import asyncHandler from '../middleware/asyncHandler.js'; // asyncHandler를 가져옵니다.

const OrderController = {
    // 주문 생성
    createOrder: asyncHandler(async (req, res) => {
        const { productId } = req.body;
        const buyerId = req.user._id; // 로그인된 사용자 ID (buyerId)

        const order = await OrderService.createOrder(productId, buyerId);

        res.status(201).json({
            message: '주문이 성공적으로 생성되었습니다.',
            orderId: order._id,
            product: {
                id: order.productId._id,
                name: order.productId.name,
                image: order.productId.image,
                price: order.productId.price,
            },
            buyerId: {
                id: order.buyerId._id,
                name: order.buyerId.name,
                phone: order.buyerId.phone,
                address: `${order.buyerId.postalCode}, ${order.buyerId.basicAdd}, ${order.buyerId.detailAdd}`,
            },
            createdAt: order.createdAt,
        });
    }),

    // 로그인된 사용자가 구매한 모든 주문 조회
    getAllOrdersByBuyer: asyncHandler(async (req, res) => {
        const buyerId = req.user._id; // 로그인된 사용자 ID (buyerId)

        const orders = await OrderService.getOrdersByBuyerId(buyerId);

        res.status(200).json({
            message: '구매한 주문 목록을 조회했습니다.',
            orders: orders.map((order) => ({
                orderId: order._id,
                productId: {
                    id: order.productId._id,
                    name: order.productId.name,
                    image: order.productId.image,
                    price: order.productId.price,
                },
                buyerId: {
                    id: order.buyerId._id,
                    name: order.buyerId.name,
                    phone: order.buyerId.phone,
                    address: `${order.buyerId.basicAdd}, ${order.buyerId.detailAdd}`,
                },
                sellerId: order.sellerId,
                soldOut: order.soldOut,
                createdAt: order.createdAt,
            })),
        });
    }),
};

export default OrderController;
