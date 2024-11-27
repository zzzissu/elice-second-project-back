import { approvePayment } from "../services/paymentService.js";

export const handlePaymentApproval = async (req, res) => {
  
  const { paymentKey, orderId, amount } = req.body;
  console.log("Payment approval request received:", { paymentKey, orderId, amount });
  
  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: paymentKey, orderId, or amount",
    });
  }
  try {
    const paymentResult = await approvePayment({ paymentKey, orderId, amount });
    res.status(200).json({ success: true, data: paymentResult });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
