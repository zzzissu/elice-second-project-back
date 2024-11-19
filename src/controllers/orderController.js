import OrderService from '../services/orderService.js';

const OrderController = {
    // 주문 생성
    createOrder: async (req, res) => {
        const { productId } = req.body; // 상품 ID를 요청 본문에서 가져옴
        const buyerId = req.user._id; // 로그인된 사용자 ID (buyerId)

        try {
            // 주문 생성
            const order = await OrderService.createOrder(productId, buyerId);

            res.status(201).json({
                message: '주문이 성공적으로 생성되었습니다.',
                orderId: order._id, // 주문 고유번호
                productId: order.productId, // 상품 고유번호
                buyerId: order.buyerId, // 구매자 정보
                sellerId: order.sellerId, // 판매자 정보
                soldOut: order.soldOut, // 결제 상태
                createdAt: order.createdAt, // 결제일
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // 주문 조회
    getOrderDetails: async (req, res) => {
        const { orderId } = req.params; // 주문 ID를 URL 파라미터에서 가져옴

        try {
            // 주문 상세 조회
            const order = await OrderService.getOrderDetails(orderId);

            res.status(200).json({
                orderId: order._id, // 주문 고유번호
                productId: {
                    id: order.productId._id, // 상품 ID
                    name: order.productId.name, // 상품명
                    image: order.productId.image, // 상품 이미지
                    price: order.productId.price, // 상품 가격
                },
                buyerId: {
                    id: order.buyerId._id, // 구매자 ID
                    name: order.buyerId.name, // 구매자 이름
                    phone: order.buyerId.phone, // 구매자 전화번호
                    address: `${order.buyerId.basicAdd}, ${order.buyerId.detailAdd}`, // 구매자 주소
                },
                sellerId: order.sellerId, // 판매자 ID
                soldOut: order.soldOut, // 결제 상태
                createdAt: order.createdAt, // 결제일
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

export default OrderController;
