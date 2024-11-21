import mongoose from 'mongoose';

// 주문 생성
const orderSchema = new mongoose.Schema({
    receiverName: { type: String, required: true },
    receiverPhone: {type: String, required: true},          // 받는사람 전화번호
    postalCode: { type: String, required: true },           // 우편번호
    basicAdd: { type: String, required: true },             // 기본 주소
    detailAdd: { type: String, required: false },           // 상세 주소
    request: { type: String, default: null },               // 요청 사항
    items: [
        {
            productId: { type: String, required: true },    // 상품 ID
            productName: { type: String, required: true },  // 상품명
            productImage: { type: String, required: true }, // 상품 이미지 URL
            productPrice: { type: Number, required: true }, // 상품 가격
        }
    ],
    paymentMethod: { type: String, required: true },        // 결제 수단

    totalPrice: { type: Number, required: true },           // 총 결제 금액
}, {
    timestamps: true
});

export default orderSchema;
