import got from "got";
import Payment from "../models/payment.js"; // 스키마 불러오기

const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const encryptedSecretKey =
  "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

export const approvePayment = async ({ paymentKey, orderId, amount }) => {
  try {
    console.log("[DEBUG] Approve payment called with:", { paymentKey, orderId, amount });

    // Toss Payments API로 요청 보내기
    const response = await got.post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      json: { paymentKey, orderId, amount },
      responseType: "json",
    });

    console.log("[DEBUG] Toss Payments API response:", response.body);

    // 결제 승인 성공 시 데이터베이스에 저장
    const newPayment = new Payment({
      paymentKey,
      orderId,
      amount,
      status: "SUCCESS",
    });
    await newPayment.save();

    console.log("[DEBUG] Payment successfully saved to database:", newPayment);

    return response.body;
  } catch (error) {
    console.error("[ERROR] Error while approving payment:");
    console.error("Message:", error.message);
    console.error("Response body:", error.response?.body);
    console.error("Status code:", error.response?.statusCode);

    // 결제 실패 시 데이터베이스에 실패 로그 저장
    const failedPayment = new Payment({
      paymentKey,
      orderId,
      amount,
      status: "FAILED",
    });
    await failedPayment.save();

    console.log("[DEBUG] Failed payment logged to database:", failedPayment);

    throw new Error(error.response?.body?.message || "Payment approval failed");
  }
};
