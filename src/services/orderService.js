import Order from '../models/order.js';

const orderService = {

    // 결제 생성
    createOrder: async (orderData) => {
        const {
            receiverName,         // 수령인 이름
            receiverPhone,        // 수령인 전화번호
            postalCode,           // 우편번호
            basicAdd,             // 기본 주소
            detailAdd,            // 상세 주소
            request,              // 요청사항
            items,                // 상품 목록 배열
            paymentMethod,        // 결제 방법
            totalPrice,           // 총 가격
        } = orderData;
    
        // items 배열을 처리
        const processedItems = items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            productPrice: item.productPrice,
        }));
    
        // 주문 생성 로직 예시
        const newOrder = new Order({
            receiverName,
            receiverPhone,
            postalCode,
            basicAdd,
            detailAdd,
            request,
            items: processedItems,
            paymentMethod,
            totalPrice,
        });
    
        return await newOrder.save();
    },
    
};

export default orderService;
