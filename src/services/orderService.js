import Order from '../models/order.js';
import Product from '../models/product.js';
import User from '../models/user.js';

const OrderService = {
    // 주문 생성
    createOrder: async (productId, buyerId) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('해당 상품이 존재하지 않습니다.');
            }

            const sellerId = product.sellerId; // 상품의 판매자 ID

            const newOrder = new Order({
                productId,
                buyerId,
                sellerId,
            });

            await newOrder.save();
            return newOrder;
        } catch (error) {
            throw new Error(`주문 생성 실패: ${error.message}`);
        }
    },

    // 로그인된 사용자가 구매한 모든 주문 조회
    getOrdersByBuyerId: async (buyerId) => {
        try {
            // 로그인된 사용자가 구매한 모든 주문을 조회
            const orders = await Order.find({ buyerId })
                .populate('productId', 'name image price') // 상품 정보
                .populate('buyerId', 'name phone basicAdd detailAdd') // 구매자 정보
                .populate('sellerId', 'name email'); // 판매자 정보

            if (orders.length === 0) {
                throw new Error('구매한 주문이 없습니다.');
            }

            return orders; // 주문 목록 반환
        } catch (error) {
            throw new Error(`주문 조회 실패: ${error.message}`);
        }
    },
};

export default OrderService;
