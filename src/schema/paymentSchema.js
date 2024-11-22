import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentKey: { type: String, required: true }, // 결제 키
    orderId: { type: String, required: true },   // 주문 ID
    amount: { type: Number, required: true },    // 결제 금액
    status: { type: String, required: true },    // 결제 상태 (e.g., 'SUCCESS', 'FAILED')
    createdAt: { type: Date, default: Date.now }, // 생성일
  },
  { timestamps: true }
);

export default paymentSchema;