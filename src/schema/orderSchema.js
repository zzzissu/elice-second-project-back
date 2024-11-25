import mongoose from 'mongoose';

// 주문 생성
const orderSchema = new mongoose.Schema({
    name: {type: String, required: true },
    phone: {type: String, required: true },
    postalCode: { type: String, required: true },           // 우편번호
    address: { type: String, required: true },             // 기본 주소
    detailAddress: { type: String, required: false },           // 상세 주소
    requestMessage: {type: String, required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            _id: { type: Boolean, default: false }, // 자동 생성되는 _id를 방지
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            categoryName: {type: String, required: true },
            description: {type: String, required: false },
            image: {type: String, required: true },
            name: {type: String, required: true },
            price: {type: String, required: true },
            sellerId: {type: String, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },           // 총 결제 금액
}, {
    timestamps: true
});

export default orderSchema;
