import Order from '../models/order.js';

const orderService = {

    // 결제 생성
    createOrder: async (orderData) => {
        const {
            name,
            phone,
            postalCode,
            address,
            detailAddress,
            requestMessage,
            items,
            totalAmount,
          } = orderData;
        
        // items 배열을 처리
        const processedItems =items.map((item) => ({
            categoryName: item.categoryName,
            description: item.description || "", // 선택적으로 존재하지 않을 수 있음
            image: item.image,
            name: item.name,
            price: item.price,
            sellerId: item.sellerId,
        }));
        
        
        // 주문 생성 로직 예시
        const newOrder = new Order({
            name,
            phone,
            postalCode,
            address,
            detailAddress,
            requestMessage,
            items: processedItems,
            totalAmount,
        });
    
        return await newOrder.save();
    },
    
};

export default orderService;
