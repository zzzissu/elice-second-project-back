import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // 상품 고유번호와 연결된 상품 정보
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 구매자 고유번호와 연결된 사용자 정보
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 판매자 정보
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // 결제일
    },
});

export default orderSchema;
