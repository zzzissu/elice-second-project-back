import Order from '../models/order.js';
import Product from '../models/product.js';
import { NotFoundError } from '../class/errorClass.js';

const OrderService = {
    // 결제 페이지
    createOrder: async (order) => {
        const {
            buyerId,
            buyerName,
            postalCode,
            basicAdd,
            detailAdd,
            phone,
            productId,
            productName,
            productImg,
            productPrice,
            request,
        } = order;

        // 결제 페이지
        const newOrder = new Order({
            buyerId,
            buyerName,
            postalCode,
            basicAdd,
            detailAdd,
            phone,
            productId,
            productName,
            productImg,
            productPrice,
            request,
        });

        await newOrder.save();
        return { message: '상품이 성공적으로 결제되었습니다.', order: newOrder };
    },

    // 구매내역 조회
    getOrdersByBuyerId: async (buyerId) => {
        const orders = await Order.find({ 'buyer.userId': buyerId })
            .populate('product.productId', 'name image price') // 상품 정보
            .populate('seller.userId', 'nickname'); // 판매자 정보

        if (orders.length === 0) {
            return {
                orders: [],
                message: '구매한 주문이 없습니다.',
            };
        }

        return orders; // 주문 목록 반환
    },
};

export default OrderService;
