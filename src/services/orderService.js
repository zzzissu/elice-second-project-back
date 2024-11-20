import Order from '../models/order.js';
import Product from '../models/product.js';
import { NotFoundError } from '../class/errorClass.js';

const OrderService = {
    // 주문 생성
    createOrder: async (productId, buyerId) => {
        const product = await Product.findById(productId).populate('sellerId');
        if (!product) {
            throw new NotFoundError('해당 상품이 존재하지 않습니다.');
        }

        const sellerId = product.sellerId; // 상품의 판매자 ID

        const newOrder = new Order({
            productId,
            buyerId,
            sellerId: product.sellerId._id,
        });

        await newOrder.save();
        const populatedOrder = await Order.findById(newOrder._id)
            .populate('productId', 'name image price')
            .populate('buyerId', 'name phone postalCode basicAdd detailAdd');
        return populatedOrder;
    },

    // 로그인된 사용자가 구매한 모든 주문 조회
    getOrdersByBuyerId: async (buyerId) => {
        const orders = await Order.find({ buyerId })
            .populate('productId', 'name image price') // 상품 정보
            .populate('buyerId', 'name phone basicAdd detailAdd') // 구매자 정보
            .populate('sellerId', 'name email'); // 판매자 정보

        if (orders.length === 0) {
            throw new NotFoundError('구매한 주문이 없습니다.');
        }

        return orders; // 주문 목록 반환
    },
};

export default OrderService;
