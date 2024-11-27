import Product from '../models/product.js';
import orderSchema from '../schema/orderSchema.js';
// 결제 완료 후 상품의 soldOut 상태 업데이트 미들웨어
const updateProductSoldOut = async (order) => {
    orderSchema.post('save', async function (doc) {
        try {
            // 주문이 저장된 후 호출됨
            const product = await Product.findById(doc.productId);

            // 상품이 존재하고 아직 판매 완료가 아닌 경우
            if (product && !product.soldOut) {
                await Product.findByIdAndUpdate(doc.productId, { soldOut: true });
                console.log(`Product ${product.name} marked as sold out`);
            }
        } catch (error) {
            console.error('Error updating product soldOut status:', error);
        }
    });
};

export default updateProductSoldOut;
