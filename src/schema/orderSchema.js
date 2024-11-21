import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    buyer: {
        name: { type: String, required: true }, // 구매자 이름
        phone: { type: String, required: true }, // 구매자 전화번호
        address: {
            postalCode: { type: String, required: true }, // 우편번호
            basicAdd: { type: String, required: true }, // 기본 주소
            detailAdd: { type: String, required: false }, // 상세 주소
        },
    },
    product: {
        name: { type: String, required: true }, // 상품명
        image: { type: String, required: true }, // 상품 이미지 URL
        price: { type: Number, required: true }, // 상품 가격
    },
    seller: {
        nickname: { type: String }, // 판매자 닉네임
    },
    request: { type: String, default: null }, // 요청사항
    createdAt: { type: Date, default: Date.now }, // 주문 생성 시간
});

export default orderSchema;
