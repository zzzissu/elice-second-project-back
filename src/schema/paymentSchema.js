import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentKey: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "failed"], default: "pending" },
    paymentMethod: { type: String },
    transactionId: { type: String },
    approvedAt: {type: Date },
    failedReason: { type: String },
  },
  {
    timestamps: true,
  }
);

export default paymentSchema;
