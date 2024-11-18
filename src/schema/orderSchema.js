import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }, // 결제된 상품 고유번호
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, // 구매자 고유번호
    state: {
        type: Boolean,
        required: true,
        default: false,
    }, // 결제 상태
    payedAt: {
        type: Date,
        default: null,
    }, // 결제 완료 시간
});

export default orderSchema;
