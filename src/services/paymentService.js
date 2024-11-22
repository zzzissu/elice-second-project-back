import got from "got";
import Payment from "../models/payment.js"; // 스키마 불러오기

const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const encryptedSecretKey =
  "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

export const approvePayment = async ({ paymentKey, orderId, amount }) => {
  try {
    const response = await got.post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      json: { paymentKey, orderId, amount },
      responseType: "json",
    });

    // 결제 승인 성공 시 데이터베이스에 저장
    const newPayment = new Payment({
      paymentKey,
      orderId,
      amount,
      status: "SUCCESS",
    });
    await newPayment.save();

    return response.body;
  } catch (error) {

    console.error("Error while approving payment:", {
      message: error.message,
      response: error.response?.body, // Toss Payments API 응답 내용
      statusCode: error.response?.statusCode, // HTTP 상태 코드
    });
    // 결제 실패 시 데이터베이스에 실패 로그 저장
    const failedPayment = new Payment({
      paymentKey,
      orderId,
      amount,
      status: "FAILED",
    });
    await failedPayment.save();

    throw new Error(error.response?.body?.message || "Payment approval failed");
  }
};
