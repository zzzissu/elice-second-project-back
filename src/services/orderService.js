import Order from '../models/order.js';
import Product from '../models/product.js';
import User from '../models/user.js';

const OrderService = {
    // 주문 생성
    createOrder: async (productId, buyerId) => {
        // 상품 ID와 구매자 ID로 주문 생성
        try {
            // 상품 조회
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('해당 상품이 존재하지 않습니다.');
            }

            const sellerId = product.sellerId; // 상품의 판매자 ID

            // 새로운 주문 생성
            const newOrder = new Order({
                productId,
                buyerId,
                sellerId,
            });

            // 주문 저장
            await newOrder.save();

            return newOrder; // 생성된 주문 반환
        } catch (error) {
            throw new Error(`주문 생성 실패: ${error.message}`);
        }
    },

    // 주문 조회
    getOrderDetails: async (orderId) => {
        try {
            // 주문과 연관된 정보 가져오기 (populate 사용)
            const order = await Order.findById(orderId)
                .populate('productId', 'name image price') // 상품 정보에서 필요한 필드만 가져오기
                .populate('buyerId', 'name phone basicAdd detailAdd') // 구매자 정보에서 필요한 필드만 가져오기
                .populate('sellerId', 'name email'); // 판매자 정보

            if (!order) {
                throw new Error('해당 주문이 존재하지 않습니다.');
            }

            return order; // 조회된 주문 반환
        } catch (error) {
            throw new Error(`주문 조회 실패: ${error.message}`);
        }
    },
};

export default OrderService;
