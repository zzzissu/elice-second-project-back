// orderMiddleware.js
import Product from '../models/product.js'; // 상품 모델 불러오기

// 결제 완료 후 상품의 soldOut 상태 업데이트 미들웨어
const updateProductSoldOut = async (order) => {
    if (order.soldOut) {
        try {
            await Product.findByIdAndUpdate(order.productId, { soldOut: true });
            console.log(`상품 ${order.productId}의 soldOut 상태가 true로 업데이트되었습니다.`);
        } catch (error) {
            console.error('상품 업데이트 실패:', error);
        }
    }
};

export default updateProductSoldOut;
