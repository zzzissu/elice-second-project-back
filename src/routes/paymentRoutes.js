import express from "express";
import { handlePaymentApproval } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/approval", handlePaymentApproval);

export default router;
